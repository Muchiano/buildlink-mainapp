-- Clean up malformed skills data and normalize the format
UPDATE profiles 
SET skills = ARRAY(
  SELECT DISTINCT 
    CASE 
      WHEN skill_item::text LIKE '{"name":"%' THEN 
        (skill_item::jsonb->>'name')
      ELSE 
        skill_item::text
    END
  FROM unnest(skills) AS skill_item
  WHERE skill_item IS NOT NULL AND skill_item::text != ''
)
WHERE skills IS NOT NULL AND array_length(skills, 1) > 0;