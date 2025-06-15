import { supabase } from '@/integrations/supabase/client';

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
  },

  async getStats() {
    const { count: mentorsCount, error: mentorsError } = await supabase
      .from('mentor_profiles')
      .select('*', { count: 'exact', head: true });
    
    const { count: menteesMatchedCount, error: menteesError } = await supabase
      .from('mentorship_sessions')
      .select('*', { count: 'exact', head: true });

    if (mentorsError || menteesError) {
      return { data: null, error: mentorsError || menteesError };
    }
    
    return { data: { mentorsCount, menteesMatchedCount }, error: null };
  }
};
