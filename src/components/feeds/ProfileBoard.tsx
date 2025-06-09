
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Building2, Calendar, Users, Award, Camera, Edit, Plus, MessageCircle, Phone, Mail, Heart, MessageSquare, Share2, Repeat2, Globe, Linkedin } from "lucide-react";
import { useState } from "react";

const ProfileBoard = () => {
  const [activeTab, setActiveTab] = useState("about");

  const userProfile = {
    name: "John Kamau",
    role: "Senior Civil Engineer",
    company: "BuildTech Solutions",
    location: "Nairobi, Kenya",
    joinedDate: "January 2020",
    connections: 1234,
    about: "Experienced Civil Engineer with over 8 years in construction project management. Passionate about sustainable building practices and innovative construction technologies. I specialize in large-scale infrastructure projects and have led teams in delivering complex construction solutions across East Africa.",
    contactInfo: {
      email: "john.kamau@buildtech.co.ke",
      phone: "+254 712 345 678",
      website: "www.johnkamau.dev",
      linkedin: "linkedin.com/in/johnkamau"
    },
    skills: [
      "Project Management",
      "Structural Engineering", 
      "BIM Technology",
      "Sustainable Construction",
      "AutoCAD",
      "Revit",
      "STAAD Pro",
      "Construction Planning"
    ],
    education: [
      {
        institution: "University of Nairobi",
        degree: "Bachelor of Civil Engineering",
        year: "2014-2018",
        description: "First Class Honours"
      },
      {
        institution: "Kenya Institute of Management",
        degree: "Project Management Certificate",
        year: "2020",
        description: "Advanced Project Management and Leadership"
      }
    ],
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
    activity: [
      {
        id: 1,
        type: "post",
        content: "Just completed the seismic analysis for the new Nairobi Metropolitan Hospital. Excited to see this project come to life!",
        timestamp: "2 hours ago",
        likes: 45,
        comments: 12,
        shares: 8
      },
      {
        id: 2,
        type: "article",
        content: "Published an article on 'Sustainable Building Practices in Urban Development'",
        timestamp: "1 day ago",
        likes: 78,
        comments: 23,
        shares: 15
      },
      {
        id: 3,
        type: "achievement",
        content: "Earned certification in Advanced BIM Technologies",
        timestamp: "3 days ago",
        likes: 92,
        comments: 18,
        shares: 5
      }
    ]
  };

  const renderActivityItem = (item: any) => {
    const getActivityIcon = () => {
      switch (item.type) {
        case "post":
          return <Edit className="h-4 w-4" />;
        case "article":
          return <MessageSquare className="h-4 w-4" />;
        case "achievement":
          return <Award className="h-4 w-4" />;
        default:
          return <Edit className="h-4 w-4" />;
      }
    };

    return (
      <div key={item.id} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            {getActivityIcon()}
          </div>
          <div className="flex-1">
            <p className="text-gray-800 mb-2">{item.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{item.timestamp}</span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{item.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>{item.shares}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Lean Profile Banner */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary/80 relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
          >
            <Camera className="h-4 w-4 mr-1" />
            Edit Cover
          </Button>
        </div>
      </Card>

      {/* Profile Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">JK</AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute -bottom-1 -right-1 rounded-full h-6 w-6 p-0"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h1>
                <p className="text-lg text-gray-700 mb-1">{userProfile.role}</p>
                <p className="text-gray-600 mb-3">{userProfile.company}</p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
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
            
            {/* Contact Button */}
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "about"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "activity"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "contact"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Contact Info
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === "about" && (
        <div className="space-y-6">
          {/* About Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">About</h2>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{userProfile.about}</p>
            </CardContent>
          </Card>

          {/* Skills & Specialization Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Skills & Specialization</h2>
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

          {/* Education & Training Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Education & Training</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-6">
                {userProfile.education.map((edu, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    </div>
                  </div>
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
        </div>
      )}

      {activeTab === "activity" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <span className="text-sm text-gray-500">Public content history</span>
            </div>
            <div className="space-y-4">
              {userProfile.activity.map(renderActivityItem)}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "contact" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{userProfile.contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{userProfile.contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{userProfile.contactInfo.website}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">{userProfile.contactInfo.linkedin}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileBoard;
