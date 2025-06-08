
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';

interface HomeFeedProps {
  activeFilter: string;
}

const HomeFeed = ({ activeFilter }: HomeFeedProps) => {
  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg",
        userType: "Professional"
      },
      content: "Just landed my dream job at a tech startup! Thanks to all the mentorship and networking opportunities on BuildLink KE. The journey wasn't easy, but the community here made all the difference.",
      location: "Nairobi, Kenya",
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: "2 hours ago",
      images: []
    },
    {
      id: 2,
      author: {
        name: "Sarah Kimani",
        avatar: "/placeholder.svg", 
        userType: "Graduate"
      },
      content: "Excited to share that I'll be starting my Master's in Data Science next month! Looking for study buddies and anyone with experience in machine learning. #DataScience #Education",
      location: "Mombasa, Kenya",
      likes: 18,
      comments: 12,
      shares: 5,
      timestamp: "4 hours ago",
      images: []
    },
    {
      id: 3,
      author: {
        name: "TechCorp Kenya",
        avatar: "/placeholder.svg",
        userType: "Company" 
      },
      content: "We're hiring! Looking for passionate software developers to join our team. We offer competitive salaries, flexible working arrangements, and amazing growth opportunities. Check our careers page for more details.",
      location: "Nairobi, Kenya",
      likes: 45,
      comments: 23,
      shares: 18,
      timestamp: "6 hours ago",
      images: []
    }
  ];

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'latest') return true;
    if (activeFilter === 'trending') return post.likes > 20;
    if (activeFilter === 'following') return post.author.userType === 'Professional';
    return true;
  });

  return (
    <div className="space-y-6">
      {filteredPosts.map(post => (
        <Card key={post.id} className="w-full">
          <CardHeader>
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{post.author.userType}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>
                {post.location && (
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{post.location}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800 mb-4">{post.content}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm">{post.shares}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomeFeed;
