import { supabase } from '@/integrations/supabase/client';
import { secureProfileService } from './secureProfileService';

export const publicProfileService = {
  async getPublicProfile(profileId: string) {
    // Check if user is authenticated to determine access level
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Authenticated users can see more profile information
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          user_type,
          title,
          profession,
          organization,
          avatar,
          bio,
          skills,
          banner,
          profile_completion_score,
          profile_visibility,
          created_at
        `)
        .eq('id', profileId)
        .eq('profile_visibility', 'public')
        .single();
      
      return { data, error };
    } else {
      // Anonymous users get minimal profile information using the secure view
      const { data, error } = await supabase
        .from('public_profiles')
        .select('*')
        .eq('id', profileId)
        .single();
      
      return { data, error };
    }
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

  // Method for getting basic profile info for search results, user lists, etc.
  // This uses the secure public_profiles view for anonymous access
  async getBasicProfile(profileId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Authenticated users can access more profile fields
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          title,
          profession,
          organization,
          avatar,
          user_type,
          profile_visibility
        `)
        .eq('id', profileId)
        .single();
      
      return { data, error };
    } else {
      // Anonymous users use the secure view
      const { data, error } = await supabase
        .from('public_profiles')
        .select('*')
        .eq('id', profileId)
        .single();
      
      return { data, error };
    }
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
  },

  // Check profile visibility status
  async getProfileVisibility(userId: string) {
    if (!userId) {
      return { data: null, error: 'User ID is required' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_visibility')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error checking profile visibility:', error);
        return { data: null, error };
      }

      return { data: data?.profile_visibility || 'private', error: null };
    } catch (err) {
      console.error('Exception in getProfileVisibility:', err);
      return { data: null, error: err };
    }
  },

  // Update profile visibility (only for own profile)
  async updateProfileVisibility(visibility: 'public' | 'private') {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'Authentication required' };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          profile_visibility: visibility,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile visibility:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      console.error('Exception in updateProfileVisibility:', err);
      return { data: null, error: err };
    }
  }
};