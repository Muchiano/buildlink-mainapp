
-- Allow authenticated users to upload objects to the 'portfolio' bucket
create policy "Allow inserts for authenticated users" on storage.objects
  for insert to public
  with check (
    bucket_id = 'portfolio' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users full access to files they uploaded in 'portfolio'
create policy "Allow all access to own uploaded files" on storage.objects
  for all to public
  using (
    bucket_id = 'portfolio'
    AND (auth.role() = 'authenticated')
  );
