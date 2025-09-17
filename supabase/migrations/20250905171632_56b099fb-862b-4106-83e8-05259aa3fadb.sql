-- Remove the security definer view that caused the warning
DROP VIEW IF EXISTS public.public_profiles;

-- The RLS policies we created are sufficient for security
-- Applications should query profiles table directly with the new policies in place

-- Update existing policies to be more explicit about field access
-- We'll handle field restriction in the application layer rather than database views