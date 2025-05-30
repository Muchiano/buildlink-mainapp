
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Edit, Eye, MapPin, Calendar, Award, Users, TrendingUp, Phone, Mail, Share2, MessageSquare, Heart, Bookmark } from "lucide-react";
import { useState } from "react";

const ProfileBoard = () => {
  const [activeTab, setActiveTab] = useState("about");
  
  const profileData = {
    name: "Your Name",
    title: "Senior Architect",
    company: "Your Company",
    location: "Nairobi, Kenya",
    joinDate: "January 2020",
    profileViews: 1247,
    connections: 850,
    posts: 45,
    email: "yourname@email.com",
    phone: "+254 700 000 000"
  };

  const projects = [
    {
      id: 1,
      name: "Westlands Commercial Complex",
      role: "Lead Architect",
      duration: "2023 - 2024",
      description: "30-story mixed-use development with sustainable design features",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Affordable Housing Initiative",
      role: "Design Consultant",
      duration: "2022 - 2023",
      description: "500-unit affordable housing project in Kiambu",
      image: "/placeholder.svg"
    }
  ];

  const skills = [
    { name: "AutoCAD", level: 95 },
    { name: "Revit", level: 88 },
    { name: "Project Management", level: 82 },
    { name: "Sustainable Design", level: 90 },
    { name: "BIM", level: 85 }
  ];

  const achievements = [
    { title: "KIAD Excellence Award", year: "2023", description: "Best Commercial Building Design" },
    { title: "Green Building Certification", year: "2022", description: "LEED Accredited Professional" },
    { title: "Project Leadership", year: "2021", description: "Successfully managed 15+ projects" }
  ];

  const activityPosts = [
    {
      id: 1,
      type: "post",
      content: "Excited to share our latest sustainable housing project in Kiambu...",
      date: "2 days ago",
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: 2,
      type: "article",
      content: "The Future of Green Building in Kenya: A Comprehensive Guide",
      date: "1 week ago",
      likes: 128,
      comments: 34,
      shares: 22
    },
    {
      id: 3,
      type: "project",
      content: "Completed the Westlands Commercial Complex - 30 floors of innovation",
      date: "2 weeks ago",
      likes: 89,
      comments: 18,
      shares: 15
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-white text-2xl">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
              <p className="text-lg text-gray-600">{profileData.title}</p>
              <p className="text-sm text-gray-500">{profileData.company}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {profileData.location}
                <Calendar className="h-4 w-4 ml-4 mr-1" />
                Joined {profileData.joinDate}
              </div>
              <div className="flex space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{profileData.connections}</div>
                  <div className="text-xs text-gray-600">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{profileData.profileViews}</div>
                  <div className="text-xs text-gray-600">Profile Views</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{profileData.posts}</div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Modal would be triggered by Contact button */}
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
          <Eye className="h-5 w-5" />
          <span className="text-xs">Preview Portfolio</span>
        </Button>
        <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">Analytics</span>
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === "about" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("about")}
          className="flex-1"
        >
          About
        </Button>
        <Button
          variant={activeTab === "activity" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("activity")}
          className="flex-1"
        >
          Activity
        </Button>
      </div>

      {/* About Section */}
      {activeTab === "about" && (
        <div className="space-y-6">
          {/* About Description */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Passionate architect with over 8 years of experience designing sustainable and innovative buildings across Kenya. 
                Specialized in commercial and residential projects with a focus on environmentally conscious design and 
                community impact. Committed to mentoring young professionals and advancing the built environment sector in Kenya.
              </p>
              <p className="text-gray-700 leading-relaxed">
                My expertise spans from conceptual design to project completion, with particular strength in BIM implementation, 
                sustainable materials selection, and stakeholder coordination. I believe in creating spaces that not only serve 
                their functional purpose but also contribute positively to the community and environment.
              </p>
              <Button variant="ghost" className="mt-3 p-0 text-primary">
                Edit about section
              </Button>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 p-0 text-primary">
                + Add skill
              </Button>
            </CardContent>
          </Card>

          {/* Featured Projects */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Project</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{project.name}</h4>
                        <p className="text-sm text-primary">{project.role}</p>
                        <p className="text-xs text-gray-500 mb-2">{project.duration}</p>
                        <p className="text-sm text-gray-700">{project.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 p-0 text-primary">
                + Add project
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Achievements & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <span className="text-xs text-gray-500">{achievement.year}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 p-0 text-primary">
                + Add achievement
              </Button>
            </CardContent>
          </Card>

          {/* Professional Network */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Professional Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Connect with more professionals to expand your network</p>
                <Button className="bg-primary hover:bg-primary-800">
                  Discover People
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Activity Section */}
      {activeTab === "activity" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">Public Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-white text-sm">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-800">{profileData.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {post.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                        <p className="text-xs text-gray-500 mb-2">{post.date}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="h-3 w-3" />
                            <span>{post.shares}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileBoard;
