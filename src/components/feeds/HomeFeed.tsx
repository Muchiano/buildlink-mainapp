import { useState } from "react";
import { Heart, MessageCircle, Share, Repeat2, Bookmark, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HomeFeedProps {
  activeFilter: string;
}

const HomeFeed = ({ activeFilter }: HomeFeedProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
      isLiked: false,
      isBookmarked: false,
      isFollowing: false
    },
    {
      id: 2,
      author: "Eng. James Omondi",
      role: "Civil Engineer",
      company: "BuildRight Contractors",
      time: "1 day ago",
      content: "Just broke ground on a new residential complex in Kilimani. This project aims to provide affordable housing solutions with modern amenities. We're using eco-friendly materials to minimize our environmental impact. #CivilEngineering #AffordableHousing #Sustainability",
      image: "/placeholder.svg",
      likes: 89,
      comments: 15,
      shares: 5,
      isLiked: true,
      isBookmarked: false,
      isFollowing: true
    },
    {
      id: 3,
      author: "Jane Wanjiku",
      role: "Architect",
      company: "ArchVision Studios",
      time: "3 days ago",
      content: "Delighted to announce that our design for the Innovation Hub in Konza Technopolis has been approved. This state-of-the-art facility will foster collaboration and drive technological advancements in Kenya. #Architecture #Innovation #KonzaTechnopolis",
      image: "/placeholder.svg",
      likes: 210,
      comments: 35,
      shares: 12,
      isLiked: false,
      isBookmarked: true,
      isFollowing: false
    },
    {
      id: 4,
      author: "Peter Kamau",
      role: "Quantity Surveyor",
      company: "CostWise Consultants",
      time: "5 days ago",
      content: "Sharing insights on effective cost management in construction projects. Proper budgeting and resource allocation are crucial for project success. Contact us for expert advice on quantity surveying. #QuantitySurveying #CostManagement #Construction",
      image: "/placeholder.svg",
      likes: 123,
      comments: 18,
      shares: 7,
      isLiked: false,
      isBookmarked: false,
      isFollowing: false
    },
    {
      id: 5,
      author: "Emily Achieng",
      role: "Construction Manager",
      company: "EliteBuild Solutions",
      time: "1 week ago",
      content: "Our team is making great progress on the new commercial tower in Upper Hill. Despite facing logistical challenges, we're committed to delivering this project on time and within budget. #ConstructionManagement #UpperHill #ProjectUpdate",
      image: "/placeholder.svg",
      likes: 187,
      comments: 29,
      shares: 10,
      isLiked: false,
      isBookmarked: false,
      isFollowing: false
    }
  ];

  // Filter posts based on active filter
  const filteredPosts = posts.filter(post => {
    switch (activeFilter) {
      case "news":
        return post.content.includes("news") || post.content.includes("announcement");
      case "jobs":
        return post.content.includes("hiring") || post.content.includes("opportunity") || post.content.includes("job");
      case "portfolios":
        return post.content.includes("project") || post.content.includes("design") || post.content.includes("completed");
      default:
        return true; // Show all posts for "latest"
    }
  });

  const handleLike = (postId: number) => {
    // Handle like functionality
    console.log("Liked post:", postId);
  };

  const handleBookmark = (postId: number) => {
    // Handle bookmark functionality
    console.log("Bookmarked post:", postId);
  };

  const handleFollow = (postId: number) => {
    // Handle follow functionality
    console.log("Followed user:", postId);
  };

  const handleShare = (postId: number) => {
    // Handle share functionality
    console.log("Shared post:", postId);
  };

  const handleRepost = (postId: number) => {
    // Handle repost functionality
    console.log("Reposted:", postId);
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
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg border p-6 space-y-4">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 cursor-pointer">
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
                    onClick={() => handleBookmark(post.id)}
                    className={post.isBookmarked ? "text-primary" : "text-gray-500"}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFollow(post.id)}
                    className={post.isFollowing ? "bg-primary text-white" : "text-primary border border-primary"}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    {post.isFollowing ? "Following" : "Follow"}
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
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-500 hover:text-primary">
                    <MessageCircle className="h-5 w-5" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRepost(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                  >
                    <Repeat2 className="h-5 w-5" />
                    <span>Repost</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-primary"
                >
                  <Share className="h-5 w-5" />
                  <span>{post.shares}</span>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500">No {activeFilter} posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
