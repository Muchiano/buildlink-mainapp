-- 1. SECURITY FIX: Restrict post_interactions visibility to authenticated users only
-- Drop existing insecure SELECT policy
DROP POLICY IF EXISTS "Users can view interactions on visible posts" ON post_interactions;

-- Create new secure SELECT policy - only authenticated users can see interactions
-- and only for posts they have proper access to
CREATE POLICY "Authenticated users can view limited interactions" ON post_interactions
FOR SELECT TO authenticated
USING (
  -- Users can see their own interactions
  auth.uid() = user_id
  OR
  -- Users can see interactions on their own posts
  EXISTS (
    SELECT 1 FROM posts 
    WHERE posts.id = post_interactions.post_id 
    AND posts.author_id = auth.uid()
  )
  OR
  -- Users can see interactions on posts they have connection access to
  EXISTS (
    SELECT 1 FROM posts 
    WHERE posts.id = post_interactions.post_id 
    AND (
      (posts.visibility = 'public'::text AND auth.uid() IS NOT NULL) -- Public posts for authenticated users only
      OR
      (posts.visibility = 'connections'::text AND EXISTS (
        SELECT 1 FROM connections 
        WHERE connections.status = 'accepted'::text 
        AND (
          (connections.user_id = auth.uid() AND connections.connected_user_id = posts.author_id)
          OR 
          (connections.connected_user_id = auth.uid() AND connections.user_id = posts.author_id)
        )
      ))
    )
  )
);

-- 2. DATABASE FIX: Add missing image_url column to posts table
-- This fixes the "column posts.image_url does not exist" errors in the logs
ALTER TABLE posts ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 3. SECURITY ENHANCEMENT: Add DELETE policy for post_interactions
-- Users should be able to remove their own interactions
CREATE POLICY "Users can delete their own interactions" ON post_interactions
FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- 4. SECURITY ENHANCEMENT: Update existing INSERT policy to be more explicit about authentication
DROP POLICY IF EXISTS "Users can interact with visible posts" ON post_interactions;

CREATE POLICY "Authenticated users can create interactions" ON post_interactions
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND EXISTS (
    SELECT 1 FROM posts 
    WHERE posts.id = post_interactions.post_id 
    AND (
      posts.visibility = 'public'::text 
      OR posts.author_id = auth.uid()
      OR (
        posts.visibility = 'connections'::text 
        AND EXISTS (
          SELECT 1 FROM connections 
          WHERE connections.status = 'accepted'::text 
          AND (
            (connections.user_id = auth.uid() AND connections.connected_user_id = posts.author_id)
            OR 
            (connections.connected_user_id = auth.uid() AND connections.user_id = posts.author_id)
          )
        )
      )
    )
  )
);

-- 5. PRIVACY ENHANCEMENT: Create function to get aggregated interaction counts
-- This allows showing counts without exposing individual user interactions
CREATE OR REPLACE FUNCTION get_post_interaction_counts(post_id_param UUID)
RETURNS TABLE(
  likes_count BIGINT,
  bookmarks_count BIGINT,
  reposts_count BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COUNT(*) FILTER (WHERE type = 'like') as likes_count,
    COUNT(*) FILTER (WHERE type = 'bookmark') as bookmarks_count,
    COUNT(*) FILTER (WHERE type = 'repost') as reposts_count
  FROM post_interactions 
  WHERE post_id = post_id_param;
$$;

-- 6. USER PRIVACY FUNCTION: Check if current user has interacted with a post
-- This allows users to see their own interaction status without exposing others
CREATE OR REPLACE FUNCTION get_user_post_interactions(post_id_param UUID)
RETURNS TABLE(
  has_liked BOOLEAN,
  has_bookmarked BOOLEAN,
  has_reposted BOOLEAN
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'like') as has_liked,
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'bookmark') as has_bookmarked,
    EXISTS(SELECT 1 FROM post_interactions WHERE post_id = post_id_param AND user_id = auth.uid() AND type = 'repost') as has_reposted;
$$;