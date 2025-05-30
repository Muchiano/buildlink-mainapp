
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Heart, MessageSquare, Share2, Bookmark, MapPin, Clock, Building2, Users, Briefcase, Award } from "lucide-react";

const HomeFeed = () => {
  const stats = [
    { number: "1,247", label: "Active Jobs", icon: Briefcase },
    { number: "3,892", label: "Professionals", icon: Users },
    { number: "156", label: "Mentors", icon: Award },
    { number: "89", label: "Projects", icon: Building2 }
  ];

  const posts = [
    {
      id: 1,
      author: "Sameer Group",
      title: "Construction Company",
      company: "Verified Employer",
      time: "2 hours ago",
      content: "Senior Structural Engineer - High-rise Projects",
      location: "Nairobi, Kenya",
      description: "Join our team to work on iconic skyscrapers in Nairobi. Experience with concrete design and high-rise construction required. Competitive salary and benefits package.",
      likes: 45,
      comments: 12,
      isVerified: true,
      isJobPost: true,
      jobType: "Job Opening"
    },
    {
      id: 2,
      author: "John Kamau",
      title: "Senior Architect",
      company: "Nairobi Design Studio",
      time: "4h",
      content: "Excited to share our latest project - a sustainable housing development in Kiambu. The integration of local materials with modern design principles is creating affordable yet beautiful homes. #SustainableArchitecture #KenyaBuilds",
      image: "/placeholder.svg",
      likes: 78,
      comments: 23,
      isVerified: true
    },
    {
      id: 3,
      author: "BuildLink Kenya",
      title: "Official",
      company: "Platform Updates",
      time: "6h",
      content: "📢 NEW CPD COURSE ALERT: 'Digital Construction Management' now available. Earn 20 CPD points. Early bird pricing ends this Friday! #CPD #ProfessionalDevelopment",
      likes: 156,
      comments: 34,
      isVerified: true,
      isAnnouncement: true
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome to BuildLink Kenya</h2>
        <p className="text-primary-100 mb-6">Connecting Kenya's built environment professionals</p>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex justify-center mb-2">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-sm text-primary-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm border-0">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-white text-lg font-semibold">You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-500 hover:bg-gray-50 h-12 rounded-full border-gray-300"
              >
                Start a post, share an update...
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 flex items-center space-x-2">
              <span>📷</span>
              <span className="hidden sm:inline">Media</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 flex items-center space-x-2">
              <span>💼</span>
              <span className="hidden sm:inline">Job</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 flex items-center space-x-2">
              <span>📝</span>
              <span className="hidden sm:inline">Write article</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 flex items-center space-x-2">
              <span>🎉</span>
              <span className="hidden sm:inline">Celebrate</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="shadow-sm border-0 hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-white font-semibold text-lg">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-base hover:text-primary cursor-pointer">{post.author}</h3>
                  {post.isVerified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {post.isJobPost && (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.jobType}
                    </span>
                  )}
                  {post.isAnnouncement && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Announcement
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{post.title} • {post.company}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.time}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {post.isJobPost ? (
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900 hover:text-primary cursor-pointer">{post.content}</h4>
                {post.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{post.location}</span>
                  </div>
                )}
                {post.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{post.description}</p>
                )}
                <div className="pt-2">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                    Easy Apply
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-800 mb-3 leading-relaxed">{post.content}</p>
                {post.image && (
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-400">Project Image Placeholder</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
              <div className="flex space-x-6">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary hover:bg-primary/10 p-2 h-auto">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{post.likes}</span>
                  </div>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary hover:bg-primary/10 p-2 h-auto">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary hover:bg-primary/10 p-2 h-auto">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary hover:bg-primary/10 p-2 h-auto">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomeFeed;
