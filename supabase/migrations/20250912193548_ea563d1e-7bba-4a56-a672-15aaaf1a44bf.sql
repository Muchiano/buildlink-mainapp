-- Drop the security definer views that bypass RLS policies
DROP VIEW IF EXISTS public.public_profiles;
DROP VIEW IF EXISTS public.public_profile_directory;