import { supabase } from '@/integrations/supabase/client';

export const postsService = {
  async getPosts(category?: string, sortBy: string = 'latest') {
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_fkey(*),
        likes_count,
        comments_count,
        reposts_count
      `);
    
    if (category && category !== 'all' && category !== 'latest') {
      // Map filter categories to database categories
      const categoryMap: { [key: string]: string } = {
        'news': 'general',
        'jobs': 'career',
        'portfolios': 'project'
      };
      const dbCategory = categoryMap[category] || category;
      query = query.ilike('content', `%${dbCategory}%`);
    }
    
    if (sortBy === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (sortBy === 'popular') {
      query = query.order('likes_count', { ascending: false });
    }
    
    const { data, error } = await query;
    console.log('Posts query result:', { data, error });
    return { data, error };
  },
  async createPost(post: {
    title?: string;
    content: string;
    category: string;
    image_url?: string;
    user_id: string;
  }) {
    const insertObj: any = {
      author_id: post.user_id,
      content: post.content,
      location: post.category,
      likes_count: 0,
      comments_count: 0,
      reposts_count: 0,
    };
    if (post.image_url) {
      insertObj.image_url = post.image_url;
    }
    const { data, error } = await supabase
      .from('posts')
      .insert(insertObj)
      .select()
      .single();
    console.log('Create post result:', { data, error });
    return { data, error };
  },
  async likePost(postId: string, userId: string) {
    // First check if already liked
    const { data: existingLike } = await supabase
      .from('post_interactions')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .eq('type', 'like')
      .single();

    if (existingLike) {
      // Unlike
      const { data, error } = await supabase
        .from('post_interactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId)
        .eq('type', 'like');
      return { data, error, action: 'unliked' };
    } else {
      // Like
      const { data, error } = await supabase
        .from('post_interactions')
        .insert({ post_id: postId, user_id: userId, type: 'like' })
        .select()
        .single();
      return { data, error, action: 'liked' };
    }
  },
  async getUserInteractions(postId: string, userId: string) {
    const { data, error } = await supabase
      .from('post_interactions')
      .select('type')
      .eq('post_id', postId)
      .eq('user_id', userId);
    
    return { data, error };
  },
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles!comments_author_id_fkey(*)
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },
  async createComment(commentData: {
    post_id: string;
    author_id: string;
    content: string;
    parent_id?: string;
  }) {
    const { data, error } = await supabase
      .from('comments')
      .insert(commentData)
      .select(`
        *,
        profiles!comments_author_id_fkey(*)
      `)
      .single();
    
    return { data, error };
  },
  async repostPost(postId: string, userId: string, comment?: string) {
    // Check if already reposted
    const { data: existingRepost } = await supabase
      .from('reposts')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingRepost) {
      // Remove repost
      const { data, error } = await supabase
        .from('reposts')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
      return { data, error, action: 'unreposted' };
    } else {
      // Add repost
      const { data, error } = await supabase
        .from('reposts')
        .insert({ post_id: postId, user_id: userId, comment })
        .select()
        .single();
      return { data, error, action: 'reposted' };
    }
  },
  async sharePost(postId: string) {
    // Get post data for sharing
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_fkey(*)
      `)
      .eq('id', postId)
      .single();

    if (error) return { data: null, error };

    // Create share URL
    const shareUrl = `${window.location.origin}/?post=${postId}`;
    const shareText = `Check out this post by ${post.profiles?.full_name}: ${post.content.substring(0, 100)}...`;

    return { 
      data: { 
        url: shareUrl, 
        text: shareText,
        title: `Post by ${post.profiles?.full_name}`
      }, 
      error: null 
    };
  },
  async getPostInteractions(postId: string) {
    const { data, error } = await supabase
      .from('post_interactions')
      .select('type, user_id')
      .eq('post_id', postId);
    
    return { data, error };
  }
};
