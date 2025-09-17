import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CachedPost {
  id: string;
  content: string;
  author: any;
  created_at: string;
  likes_count: number;
  comments_count: number;
  cached_at: string;
}

export const useOfflineSync = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cachedPosts, setCachedPosts] = useState<CachedPost[]>([]);
  const [offlineActions, setOfflineActions] = useState<any[]>([]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load cached data on app start
  useEffect(() => {
    loadCachedPosts();
    loadOfflineActions();
  }, []);

  // Sync offline actions when back online
  useEffect(() => {
    if (isOnline && offlineActions.length > 0) {
      syncOfflineActions();
    }
  }, [isOnline, offlineActions]);

  const loadCachedPosts = () => {
    try {
      const cached = localStorage.getItem('cachedPosts');
      if (cached) {
        const posts = JSON.parse(cached);
        // Only keep posts from last 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const validPosts = posts.filter((post: CachedPost) => 
          new Date(post.cached_at) > oneDayAgo
        );
        setCachedPosts(validPosts);
        localStorage.setItem('cachedPosts', JSON.stringify(validPosts));
      }
    } catch (error) {
      console.error('Error loading cached posts:', error);
    }
  };

  const loadOfflineActions = () => {
    try {
      const actions = localStorage.getItem('offlineActions');
      if (actions) {
        setOfflineActions(JSON.parse(actions));
      }
    } catch (error) {
      console.error('Error loading offline actions:', error);
    }
  };

  const cachePosts = (posts: any[]) => {
    try {
      const postsToCache: CachedPost[] = posts.slice(0, 20).map(post => ({
        id: post.id,
        content: post.content,
        author: post.profiles || post.user,
        created_at: post.created_at,
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        cached_at: new Date().toISOString()
      }));

      localStorage.setItem('cachedPosts', JSON.stringify(postsToCache));
      setCachedPosts(postsToCache);
    } catch (error) {
      console.error('Error caching posts:', error);
    }
  };

  const queueOfflineAction = (action: any) => {
    if (!isOnline) {
      const newActions = [...offlineActions, {
        ...action,
        timestamp: new Date().toISOString(),
        userId: user?.id
      }];
      setOfflineActions(newActions);
      localStorage.setItem('offlineActions', JSON.stringify(newActions));
      return true; // Indicate action was queued
    }
    return false; // Indicate action should be processed normally
  };

  const syncOfflineActions = async () => {
    // This would sync queued actions when back online
    // For now, just clear them as a placeholder
    try {
      console.log('Syncing offline actions:', offlineActions);
      // TODO: Implement actual sync logic with your backend
      
      setOfflineActions([]);
      localStorage.removeItem('offlineActions');
    } catch (error) {
      console.error('Error syncing offline actions:', error);
    }
  };

  const clearCache = () => {
    localStorage.removeItem('cachedPosts');
    localStorage.removeItem('offlineActions');
    setCachedPosts([]);
    setOfflineActions([]);
  };

  return {
    isOnline,
    cachedPosts,
    offlineActions,
    cachePosts,
    queueOfflineAction,
    clearCache,
    hasCachedContent: cachedPosts.length > 0
  };
};
