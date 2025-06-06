
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Building2, Calendar, Users, Award, Camera, Edit, Plus } from "lucide-react";

const ProfileBoard = () => {
  const userProfile = {
    name: "John Kamau",
    role: "Senior Civil Engineer",
    company: "BuildTech Solutions",
    location: "Nairobi, Kenya",
    joinedDate: "January 2020",
    followers: 2847,
    following: 456,
    connections: 1234,
    about: "Experienced Civil Engineer with over 8 years in construction project management. Passionate about sustainable building practices and innovative construction technologies.",
    skills: ["Project Management", "AutoCAD", "Structural Analysis", "BIM", "Construction Management", "Sustainability"],
    experience: [
      {
        title: "Senior Civil Engineer",
        company: "BuildTech Solutions",
        duration: "2022 - Present",
        description: "Leading major infrastructure projects across Kenya"
      },
      {
        title: "Civil Engineer",
        company: "KenStruct Ltd",
        duration: "2020 - 2022",
        description: "Structural design and project coordination"
      }
    ],
    projects: [
      {
        title: "Nairobi Metropolitan Hospital",
        description: "15-story medical facility with seismic-resistant design",
        image: "/placeholder.svg"
      },
      {
        title: "Affordable Housing Complex",
        description: "200-unit residential development in Kilimani",
        image: "/placeholder.svg"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-primary to-primary/80 relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4 mr-1" />
              Edit Cover
            </Button>
          </div>
          
          {/* Profile Info */}
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative">
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">JK</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Basic Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                  <p className="text-lg text-gray-700">{userProfile.role}</p>
                  <p className="text-gray-600">{userProfile.company}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {userProfile.connections} connections
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Section
                </Button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{userProfile.followers}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{userProfile.following}</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{userProfile.connections}</div>
                <div className="text-sm text-gray-500">Connections</div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* About Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-700">{userProfile.about}</p>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {userProfile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {userProfile.experience.map((exp, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Featured Projects</h2>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-900 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBoard;
