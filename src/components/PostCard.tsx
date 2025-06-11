
import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '@/types/database';
import { useAuth } from '@/contexts/AuthContext';
import { postsService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
}

const PostCard = ({ post, onLike, onComment }: PostCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    
    setIsLiking(true);
    try {
      const { action, error } = await postsService.likePost(post.id, user.id);
      
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update like status',
          variant: 'destructive'
        });
        return;
      }

      if (action === 'liked') {
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      } else {
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      }
      
      onLike?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update like status',
        variant: 'destructive'
      });
    } finally {
      setIsLiking(false);
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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user?.avatar_url} />
              <AvatarFallback>
                {post.user?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.user?.full_name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{post.user?.profession}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getCategoryColor(post.category)}>
              {post.category}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
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
                <span>{likesCount}</span>
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
    </Card>
  );
};

export default PostCard;
