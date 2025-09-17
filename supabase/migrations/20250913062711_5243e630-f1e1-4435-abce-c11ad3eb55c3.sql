-- Fix remaining database functions with missing search_path
-- These are the remaining functions that still need security hardening

-- Fix update_user_average_rating trigger function
CREATE OR REPLACE FUNCTION public.update_user_average_rating()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
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
$function$;

-- Fix handle_post_update trigger function
CREATE OR REPLACE FUNCTION public.handle_post_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix handle_skill_resource_update trigger function
CREATE OR REPLACE FUNCTION public.handle_skill_resource_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix handle_profile_update trigger function
CREATE OR REPLACE FUNCTION public.handle_profile_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix update_post_likes_count trigger function
CREATE OR REPLACE FUNCTION public.update_post_likes_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.type = 'like' THEN
      UPDATE posts 
      SET likes_count = likes_count + 1
      WHERE id = NEW.post_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.type = 'like' THEN
      UPDATE posts 
      SET likes_count = GREATEST(0, likes_count - 1)
      WHERE id = OLD.post_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- Fix update_post_reposts_count trigger function
CREATE OR REPLACE FUNCTION public.update_post_reposts_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET reposts_count = reposts_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET reposts_count = GREATEST(0, reposts_count - 1)
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- Fix update_resource_rating trigger function
CREATE OR REPLACE FUNCTION public.update_resource_rating()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE skill_resources 
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2) 
      FROM resource_reviews 
      WHERE resource_id = COALESCE(NEW.resource_id, OLD.resource_id)
    ),
    reviews_count = (
      SELECT COUNT(*) 
      FROM resource_reviews 
      WHERE resource_id = COALESCE(NEW.resource_id, OLD.resource_id)
    )
  WHERE id = COALESCE(NEW.resource_id, OLD.resource_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Fix update_mentor_rating trigger function
CREATE OR REPLACE FUNCTION public.update_mentor_rating()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE mentor_profiles 
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2) 
      FROM mentor_reviews 
      WHERE mentor_id = NEW.mentor_id
    ),
    reviews_count = (
      SELECT COUNT(*) 
      FROM mentor_reviews 
      WHERE mentor_id = NEW.mentor_id
    )
  WHERE user_id = NEW.mentor_id;
  
  RETURN NEW;
END;
$function$;

-- Fix update_post_comments_count trigger function
CREATE OR REPLACE FUNCTION public.update_post_comments_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET comments_count = comments_count + 1,
        updated_at = now()
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET comments_count = GREATEST(0, comments_count - 1),
        updated_at = now()
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;