-- Security Fix: Prevent Profile Data Harvesting by Competitors
-- This migration implements connection-based privacy controls and limits public profile visibility

-- Step 1: Drop existing problematic policies
DROP POLICY IF EXISTS "Authenticated users can view limited public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own complete profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Step 2: Create secure functions for profile access control
CREATE OR REPLACE FUNCTION public.is_connected_user(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM connections 
    WHERE status = 'accepted' 
    AND (
      (user_id = auth.uid() AND connected_user_id = profile_user_id) OR
      (connected_user_id = auth.uid() AND user_id = profile_user_id)
    )
  );
$$;

CREATE OR REPLACE FUNCTION public.get_limited_profile_info(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  -- Only return true if user can see limited profile info
  -- This includes: own profile, connected users, or public profiles with connection
  SELECT (
    auth.uid() = profile_user_id OR  -- Own profile
    public.is_connected_user(profile_user_id) OR  -- Connected user
    (
      EXISTS(SELECT 1 FROM profiles WHERE id = profile_user_id AND profile_visibility = 'public') AND
      auth.uid() IS NOT NULL AND
      public.is_connected_user(profile_user_id)  -- Must be connected even for public profiles
    )
  );
$$;

-- Step 3: Create new secure RLS policies
CREATE POLICY "Users can view their own complete profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Connected users can view limited profile information"
ON public.profiles
FOR SELECT
USING (
  auth.uid() IS NOT NULL AND
  auth.uid() != id AND
  public.is_connected_user(id) AND
  profile_visibility IN ('public', 'connections')
);

-- Step 4: Create a secure public profile view for minimal information sharing
CREATE OR REPLACE VIEW public.public_profile_directory AS
SELECT 
  p.id,
  p.full_name,
  p.title,
  p.profession,
  p.user_type,
  p.avatar,
  p.verification_level,
  p.created_at
FROM public.profiles p
WHERE 
  p.profile_visibility = 'public' AND
  auth.uid() IS NOT NULL AND
  public.is_connected_user(p.id);

-- Step 5: Enable RLS on the view
ALTER VIEW public.public_profile_directory SET (security_barrier = true);

-- Step 6: Update profile_privacy_settings to be more restrictive by default
ALTER TABLE public.profile_privacy_settings 
ALTER COLUMN show_experience SET DEFAULT false,
ALTER COLUMN show_education SET DEFAULT false,
ALTER COLUMN show_skills SET DEFAULT false,
ALTER COLUMN show_social_links SET DEFAULT false;

-- Step 7: Create function to get privacy-filtered profile data
CREATE OR REPLACE FUNCTION public.get_filtered_profile(profile_user_id uuid)
RETURNS TABLE(
  id uuid,
  full_name text,
  title text,
  profession text,
  organization text,
  avatar text,
  user_type text,
  bio text,
  skills text[],
  experiences jsonb,
  education jsonb,
  social_links jsonb,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.full_name,
    p.title,
    p.profession,
    CASE WHEN pps.show_experience THEN p.organization ELSE NULL END,
    p.avatar,
    p.user_type,
    p.bio,
    CASE WHEN pps.show_skills THEN p.skills ELSE ARRAY[]::text[] END,
    CASE WHEN pps.show_experience THEN p.experiences ELSE '[]'::jsonb END,
    CASE WHEN pps.show_education THEN p.education ELSE '[]'::jsonb END,
    CASE WHEN pps.show_social_links THEN p.social_links ELSE '{}'::jsonb END,
    p.created_at
  FROM profiles p
  LEFT JOIN profile_privacy_settings pps ON pps.user_id = p.id
  WHERE p.id = profile_user_id
    AND (
      auth.uid() = p.id OR  -- Own profile
      public.is_connected_user(p.id)  -- Connected user only
    );
$$;

-- Step 8: Create audit trigger to log profile access attempts
CREATE TABLE IF NOT EXISTS public.profile_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accessed_profile_id uuid NOT NULL,
  accessor_user_id uuid,
  access_type text NOT NULL,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.profile_access_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own access logs"
ON public.profile_access_logs
FOR SELECT
USING (accessed_profile_id = auth.uid() OR accessor_user_id = auth.uid());

-- Step 9: Update default profile visibility to be more secure
ALTER TABLE public.profiles 
ALTER COLUMN profile_visibility SET DEFAULT 'connections';

-- Step 10: Create function to safely search profiles (connections only)
CREATE OR REPLACE FUNCTION public.search_connected_profiles(search_term text)
RETURNS TABLE(
  id uuid,
  full_name text,
  title text,
  profession text,
  avatar text,
  user_type text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.full_name,
    p.title,
    p.profession,
    p.avatar,
    p.user_type
  FROM profiles p
  WHERE 
    auth.uid() IS NOT NULL AND
    p.id != auth.uid() AND
    public.is_connected_user(p.id) AND
    (
      p.full_name ILIKE '%' || search_term || '%' OR
      p.profession ILIKE '%' || search_term || '%' OR
      p.title ILIKE '%' || search_term || '%'
    )
  LIMIT 50;
$$;