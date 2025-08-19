import { supabase } from '@/integrations/supabase/client';

export const notificationPreferencesService = {
  async getPreferences(userId: string) {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId);
    
    return { data, error };
  },

  async updatePreference(userId: string, category: string, emailEnabled: boolean, pushEnabled: boolean) {
    const { data, error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        category,
        email_enabled: emailEnabled,
        push_enabled: pushEnabled,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id, category'
      })
      .select()
      .single();
    
    return { data, error };
  },

  async getDefaultPreferences() {
    return {
      general: { email_enabled: true, push_enabled: true },
      posts: { email_enabled: true, push_enabled: true },
      connections: { email_enabled: true, push_enabled: true },
      mentorship: { email_enabled: true, push_enabled: true },
      system: { email_enabled: false, push_enabled: true }
    };
  }
};