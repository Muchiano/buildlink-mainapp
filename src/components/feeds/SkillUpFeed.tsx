
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Play, Clock, Users, Award, BookOpen, Download, Star } from "lucide-react";

const SkillUpFeed = () => {
  const professionalBodies = [
    { name: "Architectural Association of Kenya (AAK)", verified: true },
    { name: "Institution of Engineers of Kenya (IEK)", verified: true },
    { name: "Institute of Quantity Surveyors of Kenya (IQSK)", verified: true },
    { name: "Kenya Institute of Planners (KIP)", verified: true }
  ];

  const courses = [
    {
      id: 1,
      title: "Digital Construction Management",
      provider: "Institution of Engineers of Kenya (IEK)",
      instructor: "Eng. Michael Ochieng",
      duration: "4 weeks",
      cpdPoints: 20,
      rating: 4.8,
      students: 1247,
      price: "KSh 15,000",
      thumbnail: "/placeholder.svg",
      category: "Project Management",
      level: "Intermediate",
      description: "Learn modern digital tools and methodologies for effective construction project management.",
      modules: ["BIM Integration", "Project Scheduling", "Digital Documentation", "Risk Management"]
    },
    {
      id: 2,
      title: "Sustainable Architecture Principles",
      provider: "Architectural Association of Kenya (AAK)",
      instructor: "Arch. Grace Wanjiru",
      duration: "6 weeks",
      cpdPoints: 30,
      rating: 4.9,
      students: 892,
      price: "KSh 18,000",
      thumbnail: "/placeholder.svg",
      category: "Design",
      level: "Advanced",
      description: "Master sustainable design principles and green building certifications for modern architecture.",
      modules: ["Green Building Standards", "Energy Efficiency", "Material Selection", "Environmental Impact"]
    },
    {
      id: 3,
      title: "Quantity Surveying in the Digital Age",
      provider: "Institute of Quantity Surveyors of Kenya (IQSK)",
      instructor: "QS. Peter Kimani",
      duration: "3 weeks",
      cpdPoints: 15,
      rating: 4.7,
      students: 654,
      price: "KSh 12,000",
      thumbnail: "/placeholder.svg",
      category: "Cost Management",
      level: "Beginner",
      description: "Modern cost estimation and management techniques using digital tools and software.",
      modules: ["Digital Cost Estimation", "Building Information Modeling", "Risk Analysis", "Contract Management"]
    }
  ];

  const upcomingWebinars = [
    {
      id: 1,
      title: "Future of Construction Technology in Kenya",
      date: "Dec 15, 2024",
      time: "2:00 PM EAT",
      speaker: "Dr. Jane Muthoni",
      organization: "Kenya Building Research Centre",
      attendees: 234
    },
    {
      id: 2,
      title: "Compliance and Building Codes Update",
      date: "Dec 18, 2024",
      time: "10:00 AM EAT",
      speaker: "Eng. Samuel Kiprotich",
      organization: "National Construction Authority",
      attendees: 456
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Advance Your Career</h2>
        <p className="text-primary-100 mb-4">Certified Professional Development from trusted industry bodies</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-2" />
            <div className="text-lg font-bold">50+</div>
            <div className="text-xs">Courses Available</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <Award className="h-6 w-6 mx-auto mb-2" />
            <div className="text-lg font-bold">500+</div>
            <div className="text-xs">CPD Points Earned</div>
          </div>
        </div>
      </div>

      {/* Verified Professional Bodies */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Verified Professional Bodies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {professionalBodies.map((body, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{body.name}</span>
                {body.verified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Featured CPD Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.provider}</p>
                        <p className="text-xs text-gray-500">by {course.instructor}</p>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        course.level === 'Beginner' ? 'border-green-300 text-green-700' :
                        course.level === 'Intermediate' ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }`}>
                        {course.level}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        {course.cpdPoints} CPD Points
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {course.students} students
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.modules.slice(0, 3).map((module, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                      {course.modules.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.modules.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{course.price}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Syllabus
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary-800">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Webinars</h2>
        <div className="space-y-3">
          {upcomingWebinars.map((webinar) => (
            <Card key={webinar.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{webinar.title}</h3>
                    <p className="text-sm text-gray-600">{webinar.speaker} • {webinar.organization}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{webinar.date}</span>
                      <span>{webinar.time}</span>
                      <span>{webinar.attendees} registered</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Register Free
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Resources */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary">Quick Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-sm">Study Materials</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span className="text-sm">Certifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillUpFeed;
