
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Camera, MapPin, Hash, Send } from 'lucide-react';

const PostCreate = () => {
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePost = async () => {
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please write some content for your post.',
        variant: 'destructive'
      });
      return;
    }

    setIsPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Your post has been published!'
      });
      
      // Reset form
      setContent('');
      setLocation('');
      setTags('');
      setIsPosting(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Create a Post</h2>
              <p className="text-sm text-gray-500">Share your thoughts with the community</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Textarea
              placeholder="What's on your mind? Share your achievements, ask questions, or start a discussion..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location (optional)</span>
              </Label>
              <Input
                id="location"
                placeholder="e.g., Nairobi, Kenya"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags" className="flex items-center space-x-1">
                <Hash className="h-4 w-4" />
                <span>Tags (optional)</span>
              </Label>
              <Input
                id="tags"
                placeholder="e.g., #career #networking #tech"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Camera className="h-4 w-4" />
                <span>Add Photo</span>
              </Button>
            </div>
            
            <Button onClick={handlePost} disabled={isPosting || !content.trim()}>
              {isPosting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Keep posts professional and respectful</p>
            <p>• Share achievements, questions, or valuable insights</p>
            <p>• Use relevant tags to help others discover your content</p>
            <p>• Add your location to connect with local professionals</p>
            <p>• Avoid spam or promotional content without value</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCreate;
