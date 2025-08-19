import { supabase } from '@/integrations/supabase/client';

export const publicProfileService = {
  async getPublicProfile(profileId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .eq('profile_visibility', 'public')
      .single();
    
    return { data, error };
  },

  async recordProfileView(viewedProfileId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.id === viewedProfileId) return { data: null, error: null };

    const { data, error } = await supabase
      .from('profile_views')
      .insert({
        viewer_id: user.id,
        viewed_profile_id: viewedProfileId
      })
      .select()
      .single();
    
    return { data, error };
  },

  async getProfileViews(profileId: string) {
    const { data, error } = await supabase
      .from('profile_views')
      .select(`
        *,
        viewer:profiles!profile_views_viewer_id_fkey(full_name, avatar)
      `)
      .eq('viewed_profile_id', profileId)
      .order('created_at', { ascending: false })
      .limit(10);
    
    return { data, error };
  },

  async updateProfileCompletion(userId: string) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!profile) return { data: null, error: new Error('Profile not found') };

    let score = 0;
    const maxScore = 100;

    // Calculate completion score
    if (profile.full_name) score += 15;
    if (profile.avatar) score += 15;
    if (profile.bio) score += 10;
    if (profile.profession) score += 10;
    if (profile.organization) score += 10;
    if (profile.skills && profile.skills.length > 0) score += 10;
    if (profile.experiences && profile.experiences.length > 0) score += 10;
    if (profile.education && profile.education.length > 0) score += 10;
    if (profile.social_links && Object.keys(profile.social_links).length > 0) score += 10;

    const { data, error } = await supabase
      .from('profiles')
      .update({ profile_completion_score: Math.min(score, maxScore) })
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  }
};