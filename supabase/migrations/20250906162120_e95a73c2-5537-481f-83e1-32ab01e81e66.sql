-- Create rating system tables

-- User ratings table for tracking ratings between users
CREATE TABLE public.user_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rater_id UUID NOT NULL,
  rated_user_id UUID NOT NULL,
  project_id UUID NULL, -- Optional reference to specific project/collaboration
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  work_quality_rating INTEGER CHECK (work_quality_rating >= 1 AND work_quality_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  timeliness_rating INTEGER CHECK (timeliness_rating >= 1 AND timeliness_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(rater_id, rated_user_id, project_id)
);

-- Enable RLS
ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for user ratings
CREATE POLICY "Users can view ratings for public profiles" 
ON public.user_ratings 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = user_ratings.rated_user_id 
    AND profiles.profile_visibility = 'public'
  )
);

CREATE POLICY "Users can create ratings for completed collaborations" 
ON public.user_ratings 
FOR INSERT 
WITH CHECK (auth.uid() = rater_id);

CREATE POLICY "Users can update their own ratings" 
ON public.user_ratings 
FOR UPDATE 
USING (auth.uid() = rater_id);

-- Create function to update user average ratings
CREATE OR REPLACE FUNCTION public.update_user_average_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE profiles 
  SET 
    average_rating = (
      SELECT AVG(rating)::numeric(3,2) 
      FROM user_ratings 
      WHERE rated_user_id = COALESCE(NEW.rated_user_id, OLD.rated_user_id)
    ),
    total_ratings = (
      SELECT COUNT(*) 
      FROM user_ratings 
      WHERE rated_user_id = COALESCE(NEW.rated_user_id, OLD.rated_user_id)
    )
  WHERE id = COALESCE(NEW.rated_user_id, OLD.rated_user_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create trigger for updating user ratings
CREATE TRIGGER update_user_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_average_rating();

-- Add rating columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS average_rating NUMERIC(3,2) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS account_tier TEXT DEFAULT 'basic',
ADD COLUMN IF NOT EXISTS verification_level TEXT DEFAULT 'unverified',
ADD COLUMN IF NOT EXISTS premium_features JSONB DEFAULT '[]'::jsonb;

-- Create account type specific features table
CREATE TABLE public.account_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_type TEXT NOT NULL,
  feature_name TEXT NOT NULL,
  description TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default features for each account type
INSERT INTO public.account_features (user_type, feature_name, description, is_premium) VALUES
-- Student features
('student', 'free_events', 'Free/discounted access to events & resources', false),
('student', 'internship_applications', 'Apply for internships/mentorship programs directly', false),
('student', 'student_community', 'Access to student-only community boards', false),
('student', 'basic_analytics', 'Analytics on profile views & project engagement', false),

-- Graduate features
('graduate', 'entry_level_listings', 'Access to entry-level job listings', false),
('graduate', 'skill_endorsements', 'Skill endorsement badges from peers and mentors', false),
('graduate', 'extra_portfolio_slots', 'Additional portfolio slots to showcase work', true),
('graduate', 'enhanced_analytics', 'Enhanced analytics on profile and project engagement', false),

-- Professional features
('professional', 'verified_badge', 'Verified professional status badge', false),
('professional', 'publish_articles', 'Publish articles/resources to platform hub', false),
('professional', 'exclusive_tenders', 'Access to exclusive tenders and collaborations', false),
('professional', 'advanced_analytics', 'Advanced analytics on profile views & engagement', false),

-- Company features
('company', 'premium_visibility', 'Premium visibility for projects on homepage', true),
('company', 'host_events', 'Host events, calls for collaboration, tenders', false),
('company', 'talent_acquisition', 'Access to talent pool and posting capabilities', false),
('company', 'team_integration', 'Link staff accounts to firm profile', false);

-- Enable RLS on account features
ALTER TABLE public.account_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view account features" 
ON public.account_features 
FOR SELECT 
USING (true);

-- Create user achievements table for badges and endorsements
CREATE TABLE public.user_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_type TEXT NOT NULL, -- 'skill_endorsement', 'project_completion', 'rating_milestone', etc.
  achievement_name TEXT NOT NULL,
  achievement_description TEXT,
  badge_icon TEXT,
  awarded_by UUID, -- User who awarded the achievement (for endorsements)
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own achievements" 
ON public.user_achievements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public achievements" 
ON public.user_achievements 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = user_achievements.user_id 
    AND profiles.profile_visibility = 'public'
  )
);

CREATE POLICY "Users can award achievements to others" 
ON public.user_achievements 
FOR INSERT 
WITH CHECK (auth.uid() = awarded_by);