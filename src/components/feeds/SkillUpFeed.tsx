
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Play, Clock, Users, Award, BookOpen, Download, Star } from "lucide-react";

interface SkillUpFeedProps {
  activeFilter: string;
}

const SkillUpFeed = ({ activeFilter }: SkillUpFeedProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  const handleEnroll = (courseId: number) => {
    setEnrolledCourses(prev => [...prev, courseId]);
    // Here you would typically make an API call to enroll the user
    console.log(`Enrolled in course ${courseId}`);
  };

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
      modules: ["BIM Integration", "Project Scheduling", "Digital Documentation", "Risk Management"],
      type: "courses"
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
      modules: ["Green Building Standards", "Energy Efficiency", "Material Selection", "Environmental Impact"],
      type: "courses"
    }
  ];

  const webinars = [
    {
      id: 3,
      title: "Future of Construction Technology in Kenya",
      date: "Dec 15, 2024",
      time: "2:00 PM EAT",
      speaker: "Dr. Jane Muthoni",
      organization: "Kenya Building Research Centre",
      attendees: 234,
      type: "webinars"
    },
    {
      id: 4,
      title: "Compliance and Building Codes Update",
      date: "Dec 18, 2024",
      time: "10:00 AM EAT",
      speaker: "Eng. Samuel Kiprotich",
      organization: "National Construction Authority",
      attendees: 456,
      type: "webinars"
    }
  ];

  const articles = [
    {
      id: 5,
      title: "Modern Construction Techniques in East Africa",
      author: "Prof. Mary Kimani",
      readTime: "8 min read",
      category: "Technology",
      type: "articles"
    },
    {
      id: 6,
      title: "Sustainable Building Materials: A Kenyan Perspective",
      author: "Dr. Peter Wachira",
      readTime: "12 min read",
      category: "Sustainability",
      type: "articles"
    }
  ];

  const certifications = [
    {
      id: 7,
      title: "LEED Green Associate Certification",
      provider: "Green Building Council",
      duration: "3 months",
      price: "KSh 25,000",
      type: "certifications"
    },
    {
      id: 8,
      title: "Project Management Professional (PMP)",
      provider: "Project Management Institute",
      duration: "6 months",
      price: "KSh 45,000",
      type: "certifications"
    }
  ];

  // Filter content based on active filter
  const getFilteredContent = () => {
    switch (activeFilter) {
      case "courses":
        return courses;
      case "webinars":
        return webinars;
      case "articles":
        return articles;
      case "certifications":
        return certifications;
      default:
        return [...courses, ...webinars, ...articles, ...certifications];
    }
  };

  const filteredContent = getFilteredContent();

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

      {/* Content based on filter */}
      <div className="space-y-4">
        {activeFilter === "courses" || activeFilter === "latest" ? (
          courses.map((course) => (
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
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary-800"
                          onClick={() => handleEnroll(course.id)}
                          disabled={enrolledCourses.includes(course.id)}
                        >
                          {enrolledCourses.includes(course.id) ? "Enrolled" : "Enroll Now"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : null}

        {(activeFilter === "webinars" || activeFilter === "latest") && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Webinars</h2>
            <div className="space-y-3">
              {webinars.map((webinar) => (
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
        )}

        {(activeFilter === "articles" || activeFilter === "latest") && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Featured Articles</h2>
            <div className="space-y-3">
              {articles.map((article) => (
                <Card key={article.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-800 mb-2">{article.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>by {article.author}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{article.category}</Badge>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(activeFilter === "certifications" || activeFilter === "latest") && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Professional Certifications</h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <Card key={cert.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">{cert.title}</h3>
                        <p className="text-sm text-gray-600">{cert.provider}</p>
                        <p className="text-xs text-gray-500">Duration: {cert.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary mb-2">{cert.price}</div>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verified Professional Bodies - Moved to bottom */}
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
    </div>
  );
};

export default SkillUpFeed;
