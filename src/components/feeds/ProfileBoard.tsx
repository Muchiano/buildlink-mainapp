
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Edit, Download, Eye, MapPin, Calendar, Award, Users, TrendingUp } from "lucide-react";

const ProfileBoard = () => {
  const profileData = {
    name: "Your Name",
    title: "Senior Architect",
    company: "Your Company",
    location: "Nairobi, Kenya",
    joinDate: "January 2020",
    profileViews: 1247,
    connections: 850,
    posts: 45
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
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
          <Download className="h-5 w-5" />
          <span className="text-xs">Download CV</span>
        </Button>
        <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
          <Eye className="h-5 w-5" />
          <span className="text-xs">Preview Portfolio</span>
        </Button>
        <Button variant="outline" className="p-4 h-auto flex-col space-y-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">Analytics</span>
        </Button>
      </div>

      {/* About Section */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            Passionate architect with over 8 years of experience designing sustainable and innovative buildings across Kenya. 
            Specialized in commercial and residential projects with a focus on environmentally conscious design and 
            community impact. Committed to mentoring young professionals and advancing the built environment sector in Kenya.
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
  );
};

export default ProfileBoard;
