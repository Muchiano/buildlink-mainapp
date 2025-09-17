import { supabase } from '@/integrations/supabase/client';

export interface UserRating {
  id: string;
  rater_id: string;
  rated_user_id: string;
  project_id?: string;
  rating: number;
  review_text?: string;
  work_quality_rating?: number;
  communication_rating?: number;
  timeliness_rating?: number;
  professionalism_rating?: number;
  created_at: string;
  updated_at: string;
}

export interface RatingStats {
  average_rating: number;
  total_ratings: number;
  rating_breakdown: {
    [key: number]: number;
  };
}

export const ratingsService = {
  // Create a new rating
  async createRating(rating: Omit<UserRating, 'id' | 'rater_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('user_ratings')
      .insert(rating)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get ratings for a specific user
  async getUserRatings(userId: string) {
    const { data, error } = await supabase
      .from('user_ratings')
      .select(`
        *,
        rater:profiles!user_ratings_rater_id_fkey(
          id,
          full_name,
          avatar,
          user_type
        )
      `)
      .eq('rated_user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get rating statistics for a user
  async getUserRatingStats(userId: string): Promise<RatingStats> {
    const { data, error } = await supabase
      .from('user_ratings')
      .select('rating')
      .eq('rated_user_id', userId);

    if (error) throw error;

    if (!data || data.length === 0) {
      return {
        average_rating: 0,
        total_ratings: 0,
        rating_breakdown: {}
      };
    }

    const ratings = data.map(r => r.rating);
    const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    
    const breakdown: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach(rating => {
      breakdown[rating] = (breakdown[rating] || 0) + 1;
    });

    return {
      average_rating: Number(average.toFixed(2)),
      total_ratings: ratings.length,
      rating_breakdown: breakdown
    };
  },

  // Update an existing rating
  async updateRating(ratingId: string, updates: Partial<UserRating>) {
    const { data, error } = await supabase
      .from('user_ratings')
      .update(updates)
      .eq('id', ratingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Check if user can rate another user
  async canRateUser(ratedUserId: string, projectId?: string) {
    const { data: existingRating } = await supabase
      .from('user_ratings')
      .select('id')
      .eq('rated_user_id', ratedUserId)
      .eq('project_id', projectId || null)
      .maybeSingle();

    return !existingRating;
  },

  // Get average rating breakdown by category
  async getCategoryRatings(userId: string) {
    const { data, error } = await supabase
      .from('user_ratings')
      .select('work_quality_rating, communication_rating, timeliness_rating, professionalism_rating')
      .eq('rated_user_id', userId)
      .not('work_quality_rating', 'is', null);

    if (error) throw error;

    if (!data || data.length === 0) {
      return {
        work_quality: 0,
        communication: 0,
        timeliness: 0,
        professionalism: 0
      };
    }

    const averages = {
      work_quality: 0,
      communication: 0,
      timeliness: 0,
      professionalism: 0
    };

    data.forEach(rating => {
      if (rating.work_quality_rating) averages.work_quality += rating.work_quality_rating;
      if (rating.communication_rating) averages.communication += rating.communication_rating;
      if (rating.timeliness_rating) averages.timeliness += rating.timeliness_rating;
      if (rating.professionalism_rating) averages.professionalism += rating.professionalism_rating;
    });

    const count = data.length;
    return {
      work_quality: Number((averages.work_quality / count).toFixed(2)),
      communication: Number((averages.communication / count).toFixed(2)),
      timeliness: Number((averages.timeliness / count).toFixed(2)),
      professionalism: Number((averages.professionalism / count).toFixed(2))
    };
  }
};