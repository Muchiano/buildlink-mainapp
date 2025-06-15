import { supabase } from '@/integrations/supabase/client';

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
