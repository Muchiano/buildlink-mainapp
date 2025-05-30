
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

const HomeFeed = () => {
  const posts = [
    {
      id: 1,
      author: "John Kamau",
      title: "Senior Architect",
      company: "Nairobi Design Studio",
      time: "2h",
      content: "Excited to share our latest project - a sustainable housing development in Kiambu. The integration of local materials with modern design principles is creating affordable yet beautiful homes. #SustainableArchitecture #KenyaBuilds",
      image: "/placeholder.svg",
      likes: 45,
      comments: 12,
      isVerified: true
    },
    {
      id: 2,
      author: "Sarah Wanjiku",
      title: "Civil Engineer",
      company: "Infrastructure Kenya Ltd",
      time: "4h",
      content: "🚧 URGENT JOB OPENING: Looking for experienced structural engineers for a major bridge project in Mombasa. 5+ years experience required. DM for details. #JobOpening #StructuralEngineering",
      likes: 78,
      comments: 23,
      isVerified: true,
      isJobPost: true
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
      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar>
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-500 hover:bg-gray-50"
              >
                Share an update, project, or insight...
              </Button>
            </div>
          </div>
          <div className="flex space-x-4 mt-3 pt-3 border-t">
            <Button variant="ghost" size="sm" className="text-primary">
              📷 Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-primary">
              💼 Job
            </Button>
            <Button variant="ghost" size="sm" className="text-primary">
              📚 Article
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarFallback>{post.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm">{post.author}</h3>
                  {post.isVerified && (
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {post.isJobPost && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Job
                    </span>
                  )}
                  {post.isAnnouncement && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Announcement
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{post.title} at {post.company}</p>
                <p className="text-xs text-gray-500">{post.time} ago</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-gray-800 mb-3 leading-relaxed">{post.content}</p>
            {post.image && (
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex space-x-6">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary p-0">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary p-0">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary p-0">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary p-0">
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
