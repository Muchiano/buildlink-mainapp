-- Fix critical security vulnerability: Comments table public access
-- Remove the public read policy and implement proper access controls

-- Drop the existing public read policy
DROP POLICY IF EXISTS "Anyone can view comments" ON public.comments;

-- Create a secure policy that respects post visibility and authentication
CREATE POLICY "Authenticated users can view comments on accessible posts" 
ON public.comments 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM posts 
    WHERE posts.id = comments.post_id 
    AND (
      -- Public posts: anyone authenticated can see comments
      posts.visibility = 'public' 
      OR 
      -- Own posts: can always see comments on your posts
      posts.author_id = auth.uid() 
      OR 
      -- Connection-only posts: only connected users can see comments
      (
        posts.visibility = 'connections' 
        AND EXISTS (
          SELECT 1 FROM connections 
          WHERE connections.status = 'accepted' 
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