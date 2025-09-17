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

  // SECURITY UPDATE: Now requires authentication to search profiles
  async searchProfiles(query: string) {
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'Authentication required to search profiles' };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, profession, organization, avatar, user_type, title')
      .or(`full_name.ilike.%${query}%,profession.ilike.%${query}%,organization.ilike.%${query}%,title.ilike.%${query}%`)
      .eq('profile_visibility', 'public') // Only search public profiles
      .limit(10);
    
    return { data, error };
  },

  // New secure search function for connected profiles
  async searchConnectedProfiles(query: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { data: [], error: 'Authentication required' };
    }

    // Search among user's connections
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id, full_name, profession, organization, avatar, user_type, title, bio,
        connections!connections_connected_user_id_fkey!inner(status)
      `)
      .or(`full_name.ilike.%${query}%,profession.ilike.%${query}%,organization.ilike.%${query}%,title.ilike.%${query}%`)
      .eq('connections.status', 'accepted')
      .eq('connections.user_id', user.id)
      .limit(10);
    
    return { data, error };
  }
};
