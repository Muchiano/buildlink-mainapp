
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Clock, Users, Star, Play, BookOpen, Award } from "lucide-react";

const SkillUpFeed = () => {
  const courses = [
    {
      id: 1,
      title: "Digital Construction Management",
      provider: "Kenya Institute of Architects",
      duration: "4 weeks",
      cpd: 20,
      rating: 4.8,
      students: 234,
      price: "KSh 15,000",
      discount: "Early Bird: KSh 12,000",
      category: "Project Management",
      level: "Intermediate",
      description: "Master digital tools for modern construction project management including BIM, scheduling software, and collaboration platforms."
    },
    {
      id: 2,
      title: "Sustainable Building Design in Kenya",
      provider: "Green Building Council",
      duration: "3 weeks",
      cpd: 15,
      rating: 4.9,
      students: 189,
      price: "KSh 18,000",
      category: "Sustainability",
      level: "All Levels",
      description: "Learn to design environmentally responsible buildings using local materials and climate-appropriate techniques."
    },
    {
      id: 3,
      title: "Structural Analysis with Software",
      provider: "Engineering Institute",
      duration: "6 weeks",
      cpd: 30,
      rating: 4.7,
      students: 156,
      price: "KSh 25,000",
      category: "Engineering",
      level: "Advanced",
      description: "Comprehensive training on structural analysis software including SAP2000, ETABS, and STAAD.Pro."
    }
  ];

  const categories = [
    { name: "All Courses", count: 45, active: true },
    { name: "Architecture", count: 12, active: false },
    { name: "Engineering", count: 18, active: false },
    { name: "Project Management", count: 8, active: false },
    { name: "Sustainability", count: 7, active: false }
  ];

  const webinars = [
    {
      title: "Future of Construction in Kenya",
      date: "Tomorrow, 2:00 PM",
      speaker: "Eng. David Mutua",
      attendees: 450
    },
    {
      title: "Green Building Certification Process",
      date: "Friday, 10:00 AM",
      speaker: "Arch. Grace Wanjiku",
      attendees: 280
    }
  ];

  return (
    <div className="space-y-6">
      {/* CPD Progress */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-primary-50 to-primary-100">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-primary">Your CPD Progress</h3>
              <p className="text-sm text-gray-600">65/100 points for 2024</p>
              <div className="w-48 bg-white rounded-full h-2 mt-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-1" />
              <span className="text-xs text-gray-600">35 points to go</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={category.active ? "default" : "outline"}
            size="sm"
            className={`whitespace-nowrap ${
              category.active 
                ? "bg-primary hover:bg-primary-800" 
                : "border-gray-300 text-gray-600 hover:border-primary"
            }`}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      {/* Featured Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Featured CPD Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.provider}</p>
                      </div>
                      <Badge className="bg-primary text-white">
                        {course.cpd} CPD Points
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students} students
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {course.rating}
                      </div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-primary">{course.price}</span>
                        {course.discount && (
                          <span className="text-sm text-green-600 ml-2">{course.discount}</span>
                        )}
                      </div>
                      <Button className="bg-primary hover:bg-primary-800">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center">
            <Play className="h-5 w-5 mr-2" />
            Upcoming Free Webinars
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {webinars.map((webinar, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{webinar.title}</h4>
                  <p className="text-sm text-gray-600">{webinar.date} • {webinar.speaker}</p>
                  <p className="text-xs text-gray-500">{webinar.attendees} registered</p>
                </div>
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Recommended Learning Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-primary bg-primary-50 rounded-r-lg">
              <h4 className="font-medium text-primary">Digital Architect Track</h4>
              <p className="text-sm text-gray-600 mt-1">Master modern architectural tools and workflows</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>5 courses • 80 CPD points • 12 weeks</span>
              </div>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <h4 className="font-medium text-green-700">Sustainable Engineering Path</h4>
              <p className="text-sm text-gray-600 mt-1">Become an expert in green building technologies</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <span>4 courses • 60 CPD points • 10 weeks</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillUpFeed;
