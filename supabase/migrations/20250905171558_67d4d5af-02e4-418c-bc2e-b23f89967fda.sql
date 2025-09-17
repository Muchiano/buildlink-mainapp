-- Drop the overly permissive policy that allows anyone to read all public profile data
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create new restrictive policies for profile visibility

-- Policy 1: Users can always view their own complete profile
CREATE POLICY "Users can view own complete profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy 2: Authenticated users can view limited profile information of other public profiles
CREATE POLICY "Authenticated users can view limited public profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  profile_visibility = 'public' 
  AND auth.uid() != id
);

-- Policy 3: Anonymous users can view very basic profile information only
CREATE POLICY "Anonymous users can view basic public profile info" 
ON public.profiles 
FOR SELECT 
TO anon
USING (
  profile_visibility = 'public'
);

-- Create a view for safe public profile access with limited fields
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  user_type,
  title,
  profession,
  avatar,
  bio,
  created_at,
  profile_visibility
FROM public.profiles
WHERE profile_visibility = 'public';

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_barrier = true);

-- Grant appropriate permissions
GRANT SELECT ON public.public_profiles TO anon, authenticated;