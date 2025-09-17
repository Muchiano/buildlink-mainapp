-- Critical Security Fixes: Database Functions and Account Features Access
-- Phase 1: Fix search path vulnerabilities in all database functions

-- 1. Fix is_connected_user function
CREATE OR REPLACE FUNCTION public.is_connected_user(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM connections 
    WHERE status = 'accepted' 
    AND (
      (user_id = auth.uid() AND connected_user_id = profile_user_id) OR
      (connected_user_id = auth.uid() AND user_id = profile_user_id)
    )
  );
$function$;

-- 2. Fix get_post_interaction_counts function
CREATE OR REPLACE FUNCTION public.get_post_interaction_counts(post_id_param uuid)
 RETURNS TABLE(likes_count bigint, bookmarks_count bigint, reposts_count bigint)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT 
    COUNT(*) FILTER (WHERE type = 'like') as likes_count,
    COUNT(*) FILTER (WHERE type = 'bookmark') as bookmarks_count,
    COUNT(*) FILTER (WHERE type = 'repost') as reposts_count
  FROM post_interactions 
  WHERE post_id = post_id_param;
$function$;

-- 3. Fix get_user_post_interactions function
CREATE OR REPLACE FUNCTION public.get_user_post_interactions(post_id_param uuid)
 RETURNS TABLE(has_liked boolean, has_bookmarked boolean, has_reposted boolean)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT 
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'like') as has_liked,
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'bookmark') as has_bookmarked,
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'repost') as has_reposted;
$function$;

-- 4. Fix get_limited_profile_info function
CREATE OR REPLACE FUNCTION public.get_limited_profile_info(profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT (
    auth.uid() = profile_user_id OR  -- Own profile
    public.is_connected_user(profile_user_id) OR  -- Connected user
    (
      EXISTS(SELECT 1 FROM profiles WHERE id = profile_user_id AND profile_visibility = 'public') AND
      auth.uid() IS NOT NULL AND
      public.is_connected_user(profile_user_id)  -- Must be connected even for public profiles
    )
  );
$function$;

-- 5. Fix get_filtered_profile function
CREATE OR REPLACE FUNCTION public.get_filtered_profile(profile_user_id uuid)
 RETURNS TABLE(id uuid, full_name text, title text, profession text, organization text, avatar text, user_type text, bio text, skills text[], experiences jsonb, education jsonb, social_links jsonb, created_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- 6. Fix search_connected_profiles function
CREATE OR REPLACE FUNCTION public.search_connected_profiles(search_term text)
 RETURNS TABLE(id uuid, full_name text, title text, profession text, avatar text, user_type text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- 7. Fix get_public_profile_info function
CREATE OR REPLACE FUNCTION public.get_public_profile_info(user_id_param uuid)
 RETURNS TABLE(id uuid, full_name text, title text, profession text, organization text, avatar text, user_type text, created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- 8. Fix get_connected_profile_info function
CREATE OR REPLACE FUNCTION public.get_connected_profile_info(user_id_param uuid)
 RETURNS TABLE(id uuid, full_name text, title text, profession text, organization text, avatar text, user_type text, bio text, skills text[], created_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
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
$function$;

-- 9. Fix create_notification function
CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_content text, p_from_user_id uuid DEFAULT NULL::uuid, p_link text DEFAULT NULL::text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
DECLARE
  v_notification_id uuid;
BEGIN
  INSERT INTO notifications (user_id, type, content, from_user_id, link)
  VALUES (p_user_id, p_type, p_content, p_from_user_id, p_link)
  RETURNING id INTO v_notification_id;
  
  RETURN v_notification_id;
END;
$function$;

-- 10. Fix has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;

-- 11. Fix handle_new_user_privacy_settings function
CREATE OR REPLACE FUNCTION public.handle_new_user_privacy_settings()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO profile_privacy_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- 12. Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, user_type)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(new.raw_user_meta_data->>'user_type', 'student')
  );
  RETURN new;
END;
$function$;

-- Phase 2: Fix account_features table security
-- Drop the existing public read policy and create authenticated-only access
DROP POLICY IF EXISTS "Anyone can view account features" ON public.account_features;

-- Create secure policy requiring authentication
CREATE POLICY "Authenticated users can view account features" 
ON public.account_features 
FOR SELECT 
TO authenticated
USING (true);