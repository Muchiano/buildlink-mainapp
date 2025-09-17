
-- Add missing columns to profiles table for enhanced profile management
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS skills text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS experiences jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS education jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS certifications jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS banner text;
