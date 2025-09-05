import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share, Repeat2, Bookmark, MoreHorizontal, Search, Edit3, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { postsService } from "@/services/postsService";
import { profileService } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";
import UserProfile from "@/components/UserProfile";
import CreatePostDialog from "@/components/CreatePostDialog";
import CommentsDialog from "@/components/CommentsDialog";
import RepostDialog from "@/components/RepostDialog";
import EnhancedSearchDialog from "@/components/EnhancedSearchDialog";
import ProfileEditForm from "@/components/ProfileEditForm";
import NotificationsList from "@/components/NotificationsList";
import EmptyState from "@/components/EmptyStates";
import PostCard from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

interface HomeFeedProps {
  activeFilter: string;
}

const HomeFeed = ({ activeFilter }: HomeFeedProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [postInteractions, setPostInteractions] = useState<{[key: string]: {liked: boolean, bookmarked: boolean, reposted: boolean}}>({});
  const [commentsDialog, setCommentsDialog] = useState<{isOpen: boolean, postId: string}>({isOpen: false, postId: ''});
  const [repostDialog, setRepostDialog] = useState<{isOpen: boolean, post: any}>({isOpen: false, post: null});
  const [searchDialog, setSearchDialog] = useState(false);
  const [profileEditDialog, setProfileEditDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: statsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['profileStats'],
    queryFn: profileService.getStats
  });

  const stats = [
    { label: "Professionals", value: "12,547" },
    { label: "Companies", value: "1,284" },
  ];

  useEffect(() => {
    loadPosts();
  }, [activeFilter, user]);

  useEffect(() => {
    if (user && posts.length > 0) {
      loadUserInteractions();
    }
  }, [posts, user]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      // Clear interactions when reloading posts to prevent stale state
      setPostInteractions({});
      
      const { data, error } = await postsService.getPosts(activeFilter, 'latest');
      
      if (error) {
        console.error('Error loading posts:', error);
        toast({
          title: "Error",
          description: "Failed to load posts",
          variant: "destructive"
        });
        return;
      }

      console.log('Posts loaded:', data?.length || 0);
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserInteractions = async () => {
    if (!user || posts.length === 0) return;

    const interactions: {[key: string]: {liked: boolean, bookmarked: boolean, reposted: boolean}} = {};
    
    for (const post of posts) {
      try {
        const { data } = await postsService.getUserInteractions(post.id, user.id);
        const userInteractions = data || [];
        
        interactions[post.id] = {
          liked: userInteractions.some(i => i.type === 'like'),
          bookmarked: userInteractions.some(i => i.type === 'bookmark'),
          reposted: userInteractions.some(i => i.type === 'repost')
        };
      } catch (error) {
        console.error('Error loading interactions for post', post.id, error);
      }
    }
    
    setPostInteractions(interactions);
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error, action } = await postsService.likePost(postId, user.id);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to update like",
          variant: "destructive"
        });
        return;
      }

      setPostInteractions(prev => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          liked: action === 'liked'
        }
      }));

      // Update post count in the posts array
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes_count: action === 'liked' 
                ? (post.likes_count || 0) + 1 
                : Math.max(0, (post.likes_count || 0) - 1)
            }
          : post
      ));

      toast({
        title: "Success",
        description: action === 'liked' ? "Post liked!" : "Post unliked!",
      });
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleComment = (postId: string) => {
    setCommentsDialog({isOpen: true, postId});
  };

  const handleRepost = (post: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to repost",
        variant: "destructive"
      });
      return;
    }
    setRepostDialog({isOpen: true, post});
  };

  const handleShare = async (postId: string) => {
    try {
      const { data, error } = await postsService.sharePost(postId);
      
      if (error) throw error;

      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.text,
          url: data.url
        });
      } else {
        await navigator.clipboard.writeText(data.url);
        toast({
          title: "Success",
          description: "Post URL copied to clipboard!",
        });
      }
    } catch (error) {
      console.error('Error sharing post:', error);
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive"
      });
    }
  };

  const handleUserClick = (userProfile: any) => {
    setSelectedUserId(userProfile?.id);
  };

  const handleCreatePost = () => {
    console.log('Post created, reloading posts...');
    loadPosts();
  };

  const handlePostUpdated = () => {
    console.log('Post updated, reloading posts...');
    loadPosts();
  };

  const handlePostDeleted = () => {
    console.log('Post deleted, reloading posts...');
    loadPosts();
  };

  const handleRepostComplete = () => {
    loadPosts();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Welcome to BuildLink Kenya</h2>
          <p className="text-primary-foreground/90 mb-6">
            Connect with professionals, discover opportunities, and grow your career in Kenya's construction industry.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Skeleton className="h-8 w-24 mx-auto bg-white/20" /> : statsData?.data?.professionalsCount ?? '0'}
              </div>
              <div className="text-sm text-primary-foreground/80">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {isLoadingStats ? <Skeleton className="h-8 w-24 mx-auto bg-white/20" /> : statsData?.data?.companiesCount ?? '0'}
              </div>
              <div className="text-sm text-primary-foreground/80">Companies</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to BuildLink Kenya</h2>
            <p className="text-primary-foreground/90">
              Connect with professionals, discover opportunities, and grow your career in Kenya's construction industry.
            </p>
          </div>
          {user && (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSearchDialog(true)}
                className="text-white hover:bg-white/20"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white hover:bg-white/20"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setProfileEditDialog(true)}
                className="text-white hover:bg-white/20"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="text-center">
            <div className="text-2xl font-bold">
              {isLoadingStats ? <Skeleton className="h-8 w-24 mx-auto bg-white/20" /> : statsData?.data?.professionalsCount ?? '0'}
            </div>
            <div className="text-sm text-primary-foreground/80">Professionals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {isLoadingStats ? <Skeleton className="h-8 w-24 mx-auto bg-white/20" /> : statsData?.data?.companiesCount ?? '0'}
            </div>
            <div className="text-sm text-primary-foreground/80">Companies</div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && user && (
        <div className="bg-white rounded-lg border p-6">
          <NotificationsList />
        </div>
      )}

      {/* Create Post Section */}
      {user && (
        <div className="bg-white rounded-lg border p-4">
          <CreatePostDialog onPostCreated={handleCreatePost} />
        </div>
      )}

      {/* Filter Results Info */}
      {activeFilter !== "latest" && (
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-600">
            Showing {posts.length} {activeFilter} posts
          </p>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
            />
          ))
        ) : (
          <EmptyState 
            type="posts" 
            onAction={user ? handleCreatePost : undefined}
          />
        )}
      </div>

      {/* Dialogs */}
      {selectedUserId && (
        <UserProfile 
          userId={selectedUserId} 
          onClose={() => setSelectedUserId(null)} 
        />
      )}

      <CommentsDialog
        isOpen={commentsDialog.isOpen}
        onClose={() => setCommentsDialog({isOpen: false, postId: ''})}
        postId={commentsDialog.postId}
      />

      <RepostDialog
        isOpen={repostDialog.isOpen}
        onClose={() => setRepostDialog({isOpen: false, post: null})}
        post={repostDialog.post}
        onRepost={handleRepostComplete}
      />

      <EnhancedSearchDialog
        isOpen={searchDialog}
        onClose={() => setSearchDialog(false)}
      />

      <ProfileEditForm
        isOpen={profileEditDialog}
        onClose={() => setProfileEditDialog(false)}
        onSave={() => {
          // Refresh user data if needed
          toast({
            title: 'Profile Updated',
            description: 'Your profile has been successfully updated!'
          });
        }}
      />
    </div>
  );
};

export default HomeFeed;
