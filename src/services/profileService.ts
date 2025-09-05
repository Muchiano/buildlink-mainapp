import { supabase } from '@/integrations/supabase/client';

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
    social_links?: Record<string, string>;
    verification_badges?: any[];
    profile_visibility?: string;
    profile_completion_score?: number;
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
  },

  async getStats() {
    // Only query basic profile info for stats, not sensitive data
    const { count: professionalsCount, error: professionalsError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('profile_visibility', 'public');

    const { data: companies, error: companiesError } = await supabase
      .from('profiles')
      .select('organization')
      .eq('profile_visibility', 'public')
      .not('organization', 'is', null);

    if (professionalsError || companiesError) {
        return { data: null, error: professionalsError || companiesError };
    }

    const uniqueCompanies = new Set(companies.map(p => p.organization).filter(Boolean));
    const companiesCount = uniqueCompanies.size;
    
    return { data: { professionalsCount, companiesCount }, error: null };
  }
};
