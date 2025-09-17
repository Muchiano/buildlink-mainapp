import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { publicProfileService } from '@/services/publicProfileService';

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const [completionScore, setCompletionScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateCompletion = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await publicProfileService.updateProfileCompletion(user.id);
      if (error) throw error;
      
      if (data) {
        setCompletionScore(data.profile_completion_score || 0);
      }
    } catch (error) {
      console.error('Error updating profile completion:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      updateCompletion();
    }
  }, [user]);

  return {
    completionScore,
    updateCompletion,
    loading
  };
};