
import { supabase } from '@/integrations/supabase/client';

// Posts Service
export const postsService = {
  async getPosts(category?: string, sortBy: string = 'latest') {
    let query = supabase
      .from('posts')
      .select(`
        *,
        profiles!posts_author_id_fkey(*)
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
      query = query.order('created_at', { ascending: false }); // Fallback to latest for now
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
        location: post.category
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
        profiles!posts_author_id_fkey(*)
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
  async getCourses(category?: string, difficulty?: string) {
    const { data, error } = await supabase
      .from('skill_resources')
      .select('*')
      .eq('type', 'course')
      .order('created_at', { ascending: false });
    
    return { data, error };
  }
};
