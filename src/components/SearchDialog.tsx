
import { useState, useEffect } from 'react';
import { Search, X, User, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { searchService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface SearchDialogProps {
  children: React.ReactNode;
}

const SearchDialog = ({ children }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (query.length > 2) {
      performSearch();
    } else {
      setPosts([]);
      setProfiles([]);
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      
      const [postsResult, profilesResult] = await Promise.all([
        searchService.searchPosts(query),
        searchService.searchProfiles(query)
      ]);

      if (postsResult.error) {
        console.error('Error searching posts:', postsResult.error);
      } else {
        setPosts(postsResult.data || []);
      }

      if (profilesResult.error) {
        console.error('Error searching profiles:', profilesResult.error);
      } else {
        setProfiles(profilesResult.data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to perform search",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setQuery('');
    setPosts([]);
    setProfiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search BuildLink
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search posts, people, companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {loading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Profiles Results */}
            {profiles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  People ({profiles.length})
                </h3>
                <div className="space-y-2">
                  {profiles.slice(0, 3).map((profile) => (
                    <div
                      key={profile.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={handleClose}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback>
                          {profile.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {profile.full_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {profile.profession} {profile.organization && `at ${profile.organization}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {posts.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Posts ({posts.length})
                </h3>
                <div className="space-y-2">
                  {posts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={handleClose}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.profiles?.avatar} />
                          <AvatarFallback>
                            {post.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 mb-1">
                            {post.profiles?.full_name} • {new Date(post.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-900 line-clamp-2">
                            {post.content}
                          </p>
                          {post.location && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {post.location}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 2 && !loading && posts.length === 0 && profiles.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try searching for posts, people, or companies
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
