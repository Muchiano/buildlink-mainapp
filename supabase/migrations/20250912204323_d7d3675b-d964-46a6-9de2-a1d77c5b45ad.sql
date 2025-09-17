-- Add document_name field to posts table to store original PDF filename
ALTER TABLE public.posts 
ADD COLUMN document_name TEXT;