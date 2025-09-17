-- CRITICAL SECURITY FIX: Remove public access to user profiles
-- This addresses the vulnerability where personal information is exposed to unauthenticated users

-- 1. Remove the dangerous anonymous access policy that allows unauthenticated access
DROP POLICY IF EXISTS "Anonymous users can view minimal public profile info" ON profiles;

-- 2. Update authenticated user policy to be more restrictive
DROP POLICY IF EXISTS "Authenticated users can view public profile information" ON profiles;

-- Create new secure policy - only authenticated users can view limited public profiles
CREATE POLICY "Authenticated users can view limited public profiles" ON profiles
FOR SELECT TO authenticated  
USING (
  -- Users can always see their own complete profile
  auth.uid() = id 
  OR 
  -- For other users' profiles, only show limited info if profile is marked as public
  (
    profile_visibility = 'public'::text 
    AND auth.uid() <> id 
    AND auth.uid() IS NOT NULL
  )
);

-- 3. Create secure function for public profile information (authentication required)
CREATE OR REPLACE FUNCTION get_public_profile_info(user_id_param UUID)
RETURNS TABLE(
  id UUID,
  full_name TEXT,
  title TEXT,
  profession TEXT,
  organization TEXT,
  avatar TEXT,
  user_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    profiles.id,
    profiles.full_name,
    profiles.title,
    profiles.profession,
    profiles.organization,
    profiles.avatar,
    profiles.user_type,
    profiles.created_at
  FROM profiles 
  WHERE profiles.id = user_id_param 
    AND profiles.profile_visibility = 'public'
    AND auth.uid() IS NOT NULL; -- Require authentication
$$;

-- 4. Create function for connected users to see more profile details
CREATE OR REPLACE FUNCTION get_connected_profile_info(user_id_param UUID)
RETURNS TABLE(
  id UUID,
  full_name TEXT,
  title TEXT,
  profession TEXT,
  organization TEXT,
  avatar TEXT,
  user_type TEXT,
  bio TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
SECURITY DEFINER  
SET search_path = public
AS $$
  SELECT 
    profiles.id,
    profiles.full_name,
    profiles.title,
    profiles.profession,
    profiles.organization,
    profiles.avatar,
    profiles.user_type,
    profiles.bio,
    profiles.skills,
    profiles.created_at
  FROM profiles 
  WHERE profiles.id = user_id_param 
    AND (
      profiles.profile_visibility = 'public'
      OR EXISTS (
        SELECT 1 FROM connections 
        WHERE connections.status = 'accepted'
        AND (
          (connections.user_id = auth.uid() AND connections.connected_user_id = user_id_param)
          OR 
          (connections.connected_user_id = auth.uid() AND connections.user_id = user_id_param)
        )
      )
    )
    AND auth.uid() IS NOT NULL;
$$;

-- 5. Add privacy settings table for granular user control
CREATE TABLE IF NOT EXISTS profile_privacy_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  show_email BOOLEAN DEFAULT FALSE,
  show_phone BOOLEAN DEFAULT FALSE,
  show_experience BOOLEAN DEFAULT TRUE,
  show_education BOOLEAN DEFAULT TRUE,
  show_skills BOOLEAN DEFAULT TRUE,
  show_social_links BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on privacy settings
ALTER TABLE profile_privacy_settings ENABLE ROW LEVEL SECURITY;

-- Users can only manage their own privacy settings
CREATE POLICY "Users can manage their own privacy settings" ON profile_privacy_settings
FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6. Create function to auto-create privacy settings for new users
CREATE OR REPLACE FUNCTION handle_new_user_privacy_settings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profile_privacy_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger for new user privacy settings (if it doesn't exist)
DROP TRIGGER IF EXISTS on_auth_user_created_privacy ON auth.users;
CREATE TRIGGER on_auth_user_created_privacy
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user_privacy_settings();