import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { skillsService } from "@/services/dataService";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Play, Clock, Users, Award, BookOpen, Download, Star } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface SkillUpFeedProps {
  activeFilter: string;
}

const SkillUpFeed = ({ activeFilter }: SkillUpFeedProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const { data: resourcesData, isLoading, error } = useQuery({
    queryKey: ['skillResources'],
    queryFn: () => skillsService.getSkillResources(),
  });

  const handleEnroll = (courseId: string) => {
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

  const allResources = resourcesData?.data || [];

  const courses = allResources.filter(r => r.type === 'course');
  const webinars = allResources.filter(r => r.type === 'webinar');
  const articles = allResources.filter(r => r.type === 'article');
  const certifications = allResources.filter(r => r.type === 'certification');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500 text-center">Could not load resources. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

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
        {(activeFilter === "courses" || activeFilter === "latest") && courses.length > 0 ? (
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
                      </div>
                      <Badge variant="outline" className={`text-xs capitalize ${
                        course.difficulty_level === 'beginner' ? 'border-green-300 text-green-700' :
                        course.difficulty_level === 'intermediate' ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }`}>
                        {course.difficulty_level}
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
                        {course.reviews_count || 0} CPD Points
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {course.reviews_count || 0} students
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(course.syllabus || []).slice(0, 3).map((module: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                      {(course.syllabus || []).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{(course.syllabus || []).length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{course.price ? `KSh ${course.price}`: 'Free'}</span>
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

        {(activeFilter === "webinars" || activeFilter === "latest") && webinars.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Webinars</h2>
            <div className="space-y-3">
              {webinars.map((webinar) => (
                <Card key={webinar.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1">{webinar.title}</h3>
                        <p className="text-sm text-gray-600">{webinar.provider}</p>
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

        {(activeFilter === "articles" || activeFilter === "latest") && articles.length > 0 && (
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

        {(activeFilter === "certifications" || activeFilter === "latest") && certifications.length > 0 && (
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
                        <div className="text-lg font-bold text-primary mb-2">{cert.price ? `KSh ${cert.price}`: 'Free'}</div>
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
