import { useState } from "react";
import { Heart, MessageCircle, Share, Repeat2, Bookmark, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import UserProfile from "@/components/UserProfile";

interface HomeFeedProps {
  activeFilter: string;
}

const HomeFeed = ({ activeFilter }: HomeFeedProps) => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [postInteractions, setPostInteractions] = useState<{[key: number]: {liked: boolean, bookmarked: boolean, following: boolean}}>({});

  const stats = [
    { label: "Professionals", value: "12,547" },
    { label: "Companies", value: "1,284" },
  ];

  const posts = [
    {
      id: 1,
      author: "Dr. Sarah Mwangi",
      role: "Structural Engineer",
      company: "KenStruct Ltd",
      time: "2 hours ago",
      content: "Excited to share that our team has completed the structural design for the new Nairobi Metropolitan Hospital. This 15-story facility will serve over 50,000 patients annually. The design incorporates seismic-resistant features and sustainable construction practices. #StructuralEngineering #Healthcare #Kenya",
      image: "/placeholder.svg",
      likes: 156,
      comments: 23,
      shares: 8,
      type: "news",
      user: {
        name: "Dr. Sarah Mwangi",
        role: "Structural Engineer",
        company: "KenStruct Ltd",
        location: "Nairobi, Kenya",
        joinedDate: "March 2020",
        followers: 2156,
        following: 342,
        projects: 18
      }
    },
    {
      id: 2,
      author: "Eng. James Omondi",
      role: "Civil Engineer",
      company: "BuildRight Contractors",
      time: "1 day ago",
      content: "We're hiring! Looking for experienced civil engineers to join our team. Great opportunity for career growth in affordable housing projects. #Jobs #CivilEngineering #Hiring",
      image: "/placeholder.svg",
      likes: 89,
      comments: 15,
      shares: 5,
      type: "jobs",
      user: {
        name: "Eng. James Omondi",
        role: "Civil Engineer",
        company: "BuildRight Contractors",
        location: "Mombasa, Kenya",
        joinedDate: "January 2019",
        followers: 1543,
        following: 287,
        projects: 24
      }
    },
    {
      id: 3,
      author: "Jane Wanjiku",
      role: "Architect",
      company: "ArchVision Studios",
      time: "3 days ago",
      content: "Check out our latest residential project portfolio - modern sustainable homes that blend traditional Kenyan architecture with contemporary design. #Architecture #Portfolio #Sustainability",
      image: "/placeholder.svg",
      likes: 210,
      comments: 35,
      shares: 12,
      type: "portfolios",
      user: {
        name: "Jane Wanjiku",
        role: "Architect",
        company: "ArchVision Studios",
        location: "Kisumu, Kenya",
        joinedDate: "July 2018",
        followers: 3241,
        following: 456,
        projects: 31
      }
    }
  ];

  // Filter posts based on active filter
  const filteredPosts = posts.filter(post => {
    if (activeFilter === "latest") return true;
    return post.type === activeFilter;
  });

  const handleInteraction = (postId: number, type: 'like' | 'bookmark' | 'follow') => {
    setPostInteractions(prev => ({
      ...prev,
      [postId]: {
        liked: false,
        bookmarked: false,
        following: false,
        ...prev[postId],
        [type === 'follow' ? 'following' : type === 'like' ? 'liked' : 'bookmarked']: 
          !prev[postId]?.[type === 'follow' ? 'following' : type === 'like' ? 'liked' : 'bookmarked']
      }
    }));
  };

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Welcome to BuildLink Kenya</h2>
        <p className="text-primary-foreground/90 mb-6">
          Connect with professionals, discover opportunities, and grow your career in Kenya's construction industry.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-primary-foreground/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Results Info */}
      {activeFilter !== "latest" && (
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-600">
            Showing {filteredPosts.length} {activeFilter} posts
          </p>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const interactions = {
              liked: false,
              bookmarked: false,
              following: false,
              ...postInteractions[post.id]
            };
            
            return (
              <div key={post.id} className="bg-white rounded-lg border p-6 space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div 
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => handleUserClick(post.user)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 hover:text-primary">{post.author}</h3>
                      <p className="text-sm text-gray-600">{post.role} at {post.company}</p>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInteraction(post.id, 'bookmark')}
                      className={interactions.bookmarked ? "text-primary" : "text-gray-500"}
                    >
                      <Bookmark className={`h-4 w-4 ${interactions.bookmarked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant={interactions.following ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInteraction(post.id, 'follow')}
                      className={interactions.following ? "bg-primary text-white" : "text-primary border border-primary"}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      {interactions.following ? "Following" : "Follow"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <p className="text-gray-800">{post.content}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInteraction(post.id, 'like')}
                      className={`flex items-center space-x-2 ${interactions.liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                    >
                      <Heart className={`h-5 w-5 ${interactions.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes + (interactions.liked ? 1 : 0)}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-500 hover:text-primary">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                    >
                      <Repeat2 className="h-5 w-5" />
                      <span>Repost</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-500 hover:text-primary"
                  >
                    <Share className="h-5 w-5" />
                    <span>{post.shares}</span>
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500">No {activeFilter} posts found.</p>
          </div>
        )}
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfile 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
};

export default HomeFeed;
