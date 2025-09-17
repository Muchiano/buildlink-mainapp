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

  // SECURITY UPDATE: Use secure RPC function for profile search
  async searchProfiles(query: string) {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'Authentication required to search profiles' };
    }

    // Use the secure RPC function that respects connection-based access controls
    const { data, error } = await supabase
      .rpc('search_connected_profiles', { search_term: query });
    
    return { data, error };
  },

  // Secure search function for connected profiles using RPC
  async searchConnectedProfiles(query: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'Authentication required' };
    }

    // Use the secure RPC function that properly handles connection checks
    const { data, error } = await supabase
      .rpc('search_connected_profiles', { search_term: query });
    
    return { data, error };
  }
};
