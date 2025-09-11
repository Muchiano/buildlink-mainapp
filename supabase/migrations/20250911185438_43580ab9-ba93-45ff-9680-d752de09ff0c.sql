-- Add a policy to allow public profile information to be visible for posts
-- This allows basic profile info (name, avatar) to be shown in posts

-- Allow authenticated users to view basic profile info of users who have public posts
CREATE POLICY "Allow viewing basic profile info for post authors" 
ON public.profiles 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL AND 
  (
    profile_visibility = 'public' OR
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.author_id = profiles.id 
      AND posts.visibility = 'public'
    )
  )
);

-- Update the public_profiles view to include more basic info for post display
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  title,
  profession,
  organization,
  avatar,
  user_type,
  profile_visibility,
  created_at
FROM profiles
WHERE profile_visibility = 'public'
   OR EXISTS (
     SELECT 1 FROM posts 
     WHERE posts.author_id = profiles.id 
     AND posts.visibility = 'public'
   );

-- Make the public_profiles view accessible to authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;