-- Phase 1: Fix Critical Data Exposure Issues

-- 1. Update reposts RLS to respect connection-based access
DROP POLICY IF EXISTS "Anyone can view reposts" ON reposts;

CREATE POLICY "Users can view reposts from accessible posts"
ON reposts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM posts 
    WHERE posts.id = reposts.post_id 
    AND (
      posts.visibility = 'public' 
      OR posts.author_id = auth.uid()
      OR (
        posts.visibility = 'connections' 
        AND EXISTS (
          SELECT 1 FROM connections 
          WHERE connections.status = 'accepted' 
          AND (
            (connections.user_id = auth.uid() AND connections.connected_user_id = posts.author_id)
            OR (connections.connected_user_id = auth.uid() AND connections.user_id = posts.author_id)
          )
        )
      )
    )
  )
);

-- 2. Add RLS policies for user_roles table to prevent unauthorized role assignments
DROP POLICY IF EXISTS "Users can view their roles" ON user_roles;

-- Users can only view their own roles
CREATE POLICY "Users can view their own roles"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can insert/update/delete roles using secure function
CREATE POLICY "Admins can manage user roles"
ON user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Create secure function for admin validation
CREATE OR REPLACE FUNCTION public.is_admin(user_id_param uuid DEFAULT NULL)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = COALESCE(user_id_param, auth.uid())
    AND role = 'admin'
  );
$$;

-- 4. Add validation trigger for file uploads to enforce size limits
CREATE OR REPLACE FUNCTION public.validate_file_upload()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate file size (50MB limit)
  IF (NEW.metadata->>'size')::bigint > 52428800 THEN
    RAISE EXCEPTION 'File size exceeds 50MB limit';
  END IF;
  
  -- Validate file type for security
  IF NEW.metadata->>'mimetype' IN (
    'application/x-msdownload',
    'application/x-executable',
    'application/x-sharedlib'
  ) THEN
    RAISE EXCEPTION 'File type not allowed for security reasons';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply validation trigger to storage.objects
DROP TRIGGER IF EXISTS validate_file_upload_trigger ON storage.objects;
CREATE TRIGGER validate_file_upload_trigger
  BEFORE INSERT ON storage.objects
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_file_upload();