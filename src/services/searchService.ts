import { supabase } from '@/integrations/supabase/client';

export const searchService = {
  async searchPosts(query: string) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_fkey(*),
        likes_count,
        comments_count,
        reposts_count
      `)
      .ilike('content', `%${query}%`)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async searchProfiles(query: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`full_name.ilike.%${query}%,profession.ilike.%${query}%,organization.ilike.%${query}%`)
      .limit(10);
    
    return { data, error };
  }
};
