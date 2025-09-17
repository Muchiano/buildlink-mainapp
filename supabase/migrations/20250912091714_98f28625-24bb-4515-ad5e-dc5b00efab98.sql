-- Create public storage bucket for post-media if not exists
DO $$
BEGIN
  -- Create bucket if not exists
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('post-media', 'post-media', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Add document_url column to posts table if not exists
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS document_url text;

-- Public read access to files in post-media
DROP POLICY IF EXISTS "Public read for post-media" ON storage.objects;
CREATE POLICY "Public read for post-media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'post-media');

-- Allow authenticated users to upload to their own folder: user-<uid>/*
DROP POLICY IF EXISTS "Users can upload to their own post-media folder" ON storage.objects;
CREATE POLICY "Users can upload to their own post-media folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'post-media'
  AND (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);

-- Allow authenticated users to update their own files in post-media
DROP POLICY IF EXISTS "Users can update their own post-media files" ON storage.objects;
CREATE POLICY "Users can update their own post-media files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'post-media'
  AND (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
)
WITH CHECK (
  bucket_id = 'post-media'
  AND (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);

-- Allow authenticated users to delete their own files in post-media
DROP POLICY IF EXISTS "Users can delete their own post-media files" ON storage.objects;
CREATE POLICY "Users can delete their own post-media files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'post-media'
  AND (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);