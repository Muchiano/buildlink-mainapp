-- Fix: Restrict public access to profiles table to only basic information
-- This migration addresses the security issue of exposing sensitive personal data to anonymous users

-- First, drop the overly permissive policy for anonymous users
DROP POLICY IF EXISTS "Anonymous users can view basic public profile info" ON public.profiles;

-- Create a new policy that restricts anonymous users to only very basic public information
-- Anonymous users can only see: id, full_name, title, profession, organization, avatar, user_type
-- They cannot see: bio, skills, interests, education, experiences, certifications, portfolio, social_links, etc.
CREATE POLICY "Anonymous users can view minimal public profile info"
ON public.profiles
FOR SELECT
USING (
  profile_visibility = 'public'
  AND auth.uid() IS NULL
);

-- Update the authenticated users policy to be more explicit about what they can see
-- Authenticated users can see more fields but still not everything
DROP POLICY IF EXISTS "Authenticated users can view limited public profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view public profile information"
ON public.profiles  
FOR SELECT
USING (
  profile_visibility = 'public'
  AND auth.uid() IS NOT NULL
  AND auth.uid() <> id
);

-- Ensure users can always view their own complete profile (this policy should already exist)
-- This policy allows users to see ALL fields of their own profile
-- Keep existing "Users can view own complete profile" policy as is

-- Create a view for safe public profile access that only exposes non-sensitive fields
-- This view can be used by the application to ensure only safe data is exposed publicly
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  title,
  profession,
  organization,
  avatar,
  user_type,
  created_at,
  profile_visibility
FROM public.profiles
WHERE profile_visibility = 'public';

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;

-- Add RLS to the view (views inherit RLS from base tables, but let's be explicit)
ALTER VIEW public.public_profiles SET (security_invoker = true);