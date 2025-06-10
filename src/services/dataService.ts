
import { supabase } from '@/integrations/supabase/client';
import { User, Post, Comment, Like, Mentor, MentorshipSession, Course, Enrollment } from '@/types/database';

// Posts
export const postsService = {
  async getPosts(category?: string, sortBy: string = 'latest') {
    let query = supabase
      .from('posts')
      .select(`
        *,
        user:profiles(*)
      `);
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    
    if (sortBy === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (sortBy === 'popular') {
      query = query.order('likes_count', { ascending: false });
    }
    
    const { data, error } = await query;
    return { data: data as Post[], error };
  },

  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'comments_count'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();
    return { data, error };
  },

  async likePost(postId: string, userId: string) {
    const { data, error } = await supabase
      .from('likes')
      .insert({ post_id: postId, user_id: userId })
      .select()
      .single();
    return { data, error };
  },

  async unlikePost(postId: string, userId: string) {
    const { data, error } = await supabase
      .from('likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
    return { data, error };
  },

  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:profiles(*)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    return { data: data as Comment[], error };
  },

  async addComment(comment: Omit<Comment, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select()
      .single();
    return { data, error };
  }
};

// Mentors
export const mentorsService = {
  async getMentors(specialization?: string) {
    let query = supabase
      .from('mentors')
      .select(`
        *,
        user:profiles(*)
      `)
      .eq('is_active', true);
    
    if (specialization) {
      query = query.contains('specializations', [specialization]);
    }
    
    const { data, error } = await query.order('rating', { ascending: false });
    return { data: data as Mentor[], error };
  },

  async becomeMentor(mentorData: Omit<Mentor, 'id' | 'created_at' | 'rating' | 'total_sessions'>) {
    const { data, error } = await supabase
      .from('mentors')
      .insert({
        ...mentorData,
        rating: 0,
        total_sessions: 0
      })
      .select()
      .single();
    return { data, error };
  },

  async bookSession(sessionData: Omit<MentorshipSession, 'id' | 'created_at' | 'status'>) {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .insert({
        ...sessionData,
        status: 'pending'
      })
      .select()
      .single();
    return { data, error };
  },

  async getUserSessions(userId: string) {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .select(`
        *,
        mentor:mentors(*, user:profiles(*)),
        mentee:profiles(*)
      `)
      .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`)
      .order('scheduled_at', { ascending: true });
    return { data, error };
  }
};

// Courses
export const coursesService = {
  async getCourses(category?: string, difficulty?: string) {
    let query = supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles(*)
      `)
      .eq('is_published', true);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (difficulty) {
      query = query.eq('difficulty_level', difficulty);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    return { data: data as Course[], error };
  },

  async enrollInCourse(courseId: string, userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        course_id: courseId,
        user_id: userId,
        progress: 0
      })
      .select()
      .single();
    return { data, error };
  },

  async getUserEnrollments(userId: string) {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*, instructor:profiles(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

// Users/Profiles
export const usersService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data: data as User, error };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  }
};
