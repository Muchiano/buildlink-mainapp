import { supabase } from '@/integrations/supabase/client';

// Posts Service
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
    const { data, error } = await supabase
      .from('posts')
      .insert({
        author_id: post.user_id,
        content: post.content,
        location: post.category,
        likes_count: 0,
        comments_count: 0,
        reposts_count: 0
      })
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

// Search Service
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

// Profile Service
export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  async updateProfile(userId: string, updates: {
    full_name?: string;
    profession?: string;
    organization?: string;
    title?: string;
    avatar?: string;
    education_level?: string;
    bio?: string;
    skills?: string[];
    languages?: any[];
    experiences?: any[];
    education?: any[];
    certifications?: any[];
    interests?: string[];
    banner?: string;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file);

    if (uploadError) {
      return { data: null, error: uploadError };
    }

    const { data: publicUrlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);

    // Update profile with new avatar URL
    const { data, error } = await this.updateProfile(userId, {
      avatar: publicUrlData.publicUrl
    });

    return { data, error };
  }
};

// Notifications Service
export const notificationsService = {
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        from_user:profiles!notifications_from_user_id_fkey(full_name, avatar)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async createNotification(notification: {
    user_id: string;
    type: string;
    content: string;
    from_user_id?: string;
    link?: string;
  }) {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();
    
    return { data, error };
  },

  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
    
    return { data, error };
  },

  async markAllAsRead(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    
    return { data, error };
  }
};

// Mentorship Service
export const mentorshipService = {
  async getMentors() {
    const { data, error } = await supabase
      .from('mentor_profiles')
      .select(`
        *,
        profiles!mentor_profiles_user_id_fkey(*),
        mentor_expertise(skill)
      `)
      .order('rating', { ascending: false });
    
    return { data, error };
  },

  async becomeMentor(mentorData: {
    user_id: string;
    bio: string;
    years_of_experience: number;
    hourly_rate?: number;
    availability?: string[];
  }) {
    const { data, error } = await supabase
      .from('mentor_profiles')
      .insert(mentorData)
      .select()
      .single();
    
    return { data, error };
  },

  async bookSession(sessionData: {
    mentor_id: string;
    mentee_id: string;
    topic: string;
    duration: string;
    message: string;
  }) {
    const { data, error } = await supabase
      .from('mentorship_requests')
      .insert(sessionData)
      .select()
      .single();
    
    return { data, error };
  }
};

// Skills/Courses Service
export const skillsService = {
  async getSkillResources(options: { type?: string; category?: string; difficulty?: string } = {}) {
    let query = supabase
      .from('skill_resources')
      .select('*');

    if (options.type && options.type !== 'all' && options.type !== 'latest') {
      const singularType = options.type.endsWith('s') ? options.type.slice(0, -1) : options.type;
      query = query.eq('type', singularType);
    }
    if (options.category) {
      query = query.eq('category', options.category);
    }
    if (options.difficulty) {
      query = query.eq('difficulty_level', options.difficulty);
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    return { data, error };
  },
};
