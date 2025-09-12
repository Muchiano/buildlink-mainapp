-- Ensure 'post-media' bucket exists and is public with proper policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'post-media'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('post-media', 'post-media', true);
  END IF;
  -- Ensure it's public
  UPDATE storage.buckets SET public = true WHERE id = 'post-media';
END$$;

-- Public read access for post-media
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read post-media'
  ) THEN
    CREATE POLICY "Public can read post-media"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'post-media');
  END IF;
END $$;

-- Authenticated users can upload to their own folder (uid or user-uid)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can upload to post-media'
  ) THEN
    CREATE POLICY "Users can upload to post-media"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
      bucket_id = 'post-media' AND auth.role() = 'authenticated' AND (
        (storage.foldername(name))[1] = auth.uid()::text OR
        (storage.foldername(name))[1] = 'user-' || auth.uid()::text
      )
    );
  END IF;
END $$;

-- Authenticated users can update their own files
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can update their files in post-media'
  ) THEN
    CREATE POLICY "Users can update their files in post-media"
    ON storage.objects
    FOR UPDATE
    USING (
      bucket_id = 'post-media' AND auth.role() = 'authenticated' AND (
        (storage.foldername(name))[1] = auth.uid()::text OR
        (storage.foldername(name))[1] = 'user-' || auth.uid()::text
      )
    )
    WITH CHECK (
      bucket_id = 'post-media' AND auth.role() = 'authenticated' AND (
        (storage.foldername(name))[1] = auth.uid()::text OR
        (storage.foldername(name))[1] = 'user-' || auth.uid()::text
      )
    );
  END IF;
END $$;

-- Authenticated users can delete their own files
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Users can delete their files in post-media'
  ) THEN
    CREATE POLICY "Users can delete their files in post-media"
    ON storage.objects
    FOR DELETE
    USING (
      bucket_id = 'post-media' AND auth.role() = 'authenticated' AND (
        (storage.foldername(name))[1] = auth.uid()::text OR
        (storage.foldername(name))[1] = 'user-' || auth.uid()::text
      )
    );
  END IF;
END $$;

-- Add document_url to posts for document attachments
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS document_url TEXT;