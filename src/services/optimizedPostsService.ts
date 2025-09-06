import { supabase } from '@/integrations/supabase/client';

export interface PostsQuery {
  category?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
  fields?: string[];
}

export interface PaginatedResult<T> {
  data: T[] | null;
  error: any;
  hasMore: boolean;
  nextOffset: number;
}

export const optimizedPostsService = {
  // Optimized posts fetch with pagination and minimal data
  async getPostsPaginated(options: PostsQuery = {}): Promise<PaginatedResult<any>> {
    const {
      category,
      sortBy = 'latest',
      limit = 10,
      offset = 0,
      fields = ['minimal'] // 'minimal' | 'full' | 'preview'
    } = options;

    // Define field selections based on use case
    const fieldSelections = {
      minimal: `
        id, content, created_at, author_id, likes_count, comments_count, reposts_count, location,
        profiles!posts_author_id_fkey(id, full_name, avatar, profession)
      `,
      preview: `
        id, content, created_at, author_id, likes_count, comments_count, reposts_count, location, image_url,
        profiles!posts_author_id_fkey(id, full_name, avatar, profession, organization)
      `,
      full: `
        *,
        profiles!posts_author_id_fkey(*),
        likes_count, comments_count, reposts_count
      `
    };

    let query = supabase
      .from('posts')
      .select(fieldSelections[fields[0] as keyof typeof fieldSelections] || fieldSelections.minimal)
      .range(offset, offset + limit - 1);
    
    // Apply category filter
    if (category && category !== 'all' && category !== 'latest') {
      const categoryMap: { [key: string]: string } = {
        'news': 'general',
        'jobs': 'career', 
        'portfolios': 'project'
      };
      const dbCategory = categoryMap[category] || category;
      query = query.ilike('content', `%${dbCategory}%`);
    }
    
    // Apply sorting
    if (sortBy === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (sortBy === 'popular') {
      query = query.order('likes_count', { ascending: false });
    }
    
    const { data, error, count } = await query;
    
    const hasMore = data ? data.length === limit : false;
    const nextOffset = offset + limit;
    
    return { 
      data, 
      error, 
      hasMore,
      nextOffset
    };
  },

  // Prefetch post data on hover
  async prefetchPost(postId: string) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_author_id_fkey(*),
          likes_count, comments_count, reposts_count
        `)
        .eq('id', postId)
        .single();
      
      if (!error) {
        // Cache in browser memory for quick access
        const cacheKey = `post_${postId}`;
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
      
      return { data, error };
    } catch (error) {
      console.error('Prefetch error:', error);
      return { data: null, error };
    }
  },

  // Get cached post data
  getCachedPost(postId: string) {
    try {
      const cacheKey = `post_${postId}`;
      const cached = sessionStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  // Get optimized image URL for data saver mode
  getOptimizedImageUrl(originalUrl: string, options: { width?: number; quality?: number; format?: string } = {}) {
    if (!originalUrl) return '';
    
    const { width = 400, quality = 70, format = 'webp' } = options;
    
    // If using Supabase storage, add transformation parameters
    if (originalUrl.includes('supabase')) {
      const url = new URL(originalUrl);
      url.searchParams.set('width', width.toString());
      url.searchParams.set('quality', quality.toString());
      if (format) url.searchParams.set('format', format);
      return url.toString();
    }
    
    return originalUrl;
  },

  // Get lightweight post interactions
  async getPostInteractionsOptimized(postIds: string[], userId: string) {
    if (!userId || postIds.length === 0) return { data: {}, error: null };
    
    const { data, error } = await supabase
      .from('post_interactions')
      .select('post_id, type')
      .eq('user_id', userId)
      .in('post_id', postIds);
    
    // Convert to lookup object for O(1) access
    const interactions: { [postId: string]: { liked: boolean; bookmarked: boolean; reposted: boolean } } = {};
    
    postIds.forEach(postId => {
      interactions[postId] = { liked: false, bookmarked: false, reposted: false };
    });
    
    data?.forEach(interaction => {
      if (interactions[interaction.post_id]) {
        if (interaction.type === 'like') interactions[interaction.post_id].liked = true;
        if (interaction.type === 'bookmark') interactions[interaction.post_id].bookmarked = true;
        if (interaction.type === 'repost') interactions[interaction.post_id].reposted = true;
      }
    });
    
    return { data: interactions, error };
  }
};