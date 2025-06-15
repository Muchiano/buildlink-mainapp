
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share, Repeat2, User } from 'lucide-react';
import { searchService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const [postsResult, profilesResult] = await Promise.all([
        searchService.searchPosts(query),
        searchService.searchProfiles(query)
      ]);

      if (postsResult.error) throw postsResult.error;
      if (profilesResult.error) throw profilesResult.error;

      setPosts(postsResult.data || []);
      setProfiles(profilesResult.data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Error',
        description: 'Failed to search. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Search Results for "{query}"</h3>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
          <TabsTrigger value="people">People ({profiles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.profiles?.avatar} />
                      <AvatarFallback>
                        {post.profiles?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{post.profiles?.full_name}</h4>
                      <p className="text-sm text-gray-600">{post.profiles?.profession}</p>
                    </div>
                    {post.location && (
                      <Badge variant="secondary">{post.location}</Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes_count || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments_count || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Repeat2 className="h-4 w-4" />
                      <span>{post.reposts_count || 0}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts found for "{query}"</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="people" className="space-y-4">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <Card key={profile.id} className="p-4">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>
                        {profile.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{profile.full_name}</h4>
                      <p className="text-sm text-gray-600">{profile.profession}</p>
                      {profile.organization && (
                        <p className="text-xs text-gray-500">{profile.organization}</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No people found for "{query}"</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
