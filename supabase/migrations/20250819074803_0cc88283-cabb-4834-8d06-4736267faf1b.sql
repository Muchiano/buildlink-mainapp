-- Add notification categories and email preferences
ALTER TABLE notifications ADD COLUMN category text DEFAULT 'general';
ALTER TABLE notifications ADD COLUMN priority text DEFAULT 'normal';

-- Create notification preferences table
CREATE TABLE notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email_enabled boolean DEFAULT true,
  push_enabled boolean DEFAULT true,
  category text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on notification_preferences
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for notification_preferences
CREATE POLICY "Users can manage their notification preferences"
ON notification_preferences FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add profile enhancement fields
ALTER TABLE profiles ADD COLUMN social_links jsonb DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN verification_badges jsonb DEFAULT '[]';
ALTER TABLE profiles ADD COLUMN profile_visibility text DEFAULT 'public';
ALTER TABLE profiles ADD COLUMN profile_completion_score integer DEFAULT 0;

-- Create profile views table for tracking profile visits
CREATE TABLE profile_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  viewer_id uuid,
  viewed_profile_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on profile_views
ALTER TABLE profile_views ENABLE ROW LEVEL SECURITY;

-- Create policies for profile_views
CREATE POLICY "Users can view profile views"
ON profile_views FOR SELECT
USING (auth.uid() = viewed_profile_id OR auth.uid() = viewer_id);

CREATE POLICY "Users can create profile views"
ON profile_views FOR INSERT
WITH CHECK (auth.uid() = viewer_id OR viewer_id IS NULL);

-- Update profiles RLS to allow public viewing
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (profile_visibility = 'public' OR auth.uid() = id);

-- Create trigger for notification_preferences updated_at
CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_update();