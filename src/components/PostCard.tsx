import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';
import { postsService } from '@/services/postsService';
import { useToast } from '@/hooks/use-toast';
import EditPostDialog from './EditPostDialog';

interface PostCardProps {
  post: Post;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onPostUpdated?: () => void;
  onPostDeleted?: () => void;
}

const PostCard = ({ post, isLiked = false, onLike, onComment, onPostUpdated, onPostDeleted }: PostCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLiking, setIsLiking] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = async () => {
    if (!user || isLiking) return;
    
    setIsLiking(true);
    try {
      onLike?.();
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      const { error } = await postsService.deletePost(post.id);
      
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete post',
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Post deleted successfully'
      });
      
      // Close the dialog before triggering parent reload to avoid leftover overlays
      setShowDeleteDialog(false);
      
      onPostDeleted?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-gray-100 text-gray-800',
      project: 'bg-blue-100 text-blue-800',
      career: 'bg-green-100 text-green-800',
      technical: 'bg-purple-100 text-purple-800',
      news: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const isOwnPost = user && post.author_id === user.id;

  const handleProfileClick = () => {
    // Navigate to user profile - could be implemented with router
    console.log('Navigate to profile:', post.author_id);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar 
              className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
              onClick={handleProfileClick}
            >
              <AvatarImage src={post.profiles?.avatar_url || post.user?.avatar_url} />
              <AvatarFallback>
                {(post.profiles?.full_name || post.user?.full_name)?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p 
                className="font-semibold text-sm cursor-pointer hover:text-primary transition-colors"
                onClick={handleProfileClick}
              >
                {post.profiles?.full_name || post.user?.full_name}
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{post.profiles?.profession || post.user?.profession}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getCategoryColor(post.location || 'general')}>
              {post.location || 'general'}
            </Badge>
            {isOwnPost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-muted-foreground">{post.content}</p>
          </div>
          
          {post.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image_url}
                alt="Post content"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isLiking}
                className="flex items-center space-x-2 text-muted-foreground hover:text-red-500"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{post.likes_count}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onComment}
                className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments_count}</span>
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-green-500"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      <EditPostDialog
        post={post}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onPostUpdated={onPostUpdated}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default PostCard;
