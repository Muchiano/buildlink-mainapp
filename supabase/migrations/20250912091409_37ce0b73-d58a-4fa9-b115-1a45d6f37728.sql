-- Create public storage bucket for post/media if not exists
insert into storage.buckets (id, name, public)
values ('post-media', 'post-media', true)
on conflict (id) do nothing;

-- Public read access to files in post-media
create policy if not exists "Public read for post-media"
on storage.objects
for select
using (bucket_id = 'post-media');

-- Allow authenticated users to upload to their own folder: user-<uid>/*
create policy if not exists "Users can upload to their own post-media folder"
on storage.objects
for insert
with check (
  bucket_id = 'post-media'
  and (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);

-- Allow authenticated users to update their own files in post-media
create policy if not exists "Users can update their own post-media files"
on storage.objects
for update
using (
  bucket_id = 'post-media'
  and (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
)
with check (
  bucket_id = 'post-media'
  and (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);

-- Allow authenticated users to delete their own files in post-media
create policy if not exists "Users can delete their own post-media files"
on storage.objects
for delete
using (
  bucket_id = 'post-media'
  and (storage.foldername(name))[1] = ('user-' || auth.uid()::text)
);

-- Ensure posts table has document_url column
alter table public.posts
add column if not exists document_url text;
