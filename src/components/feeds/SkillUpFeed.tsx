
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Users, BookOpen, PlayCircle } from 'lucide-react';

interface SkillUpFeedProps {
  activeFilter: string;
}

const SkillUpFeed = ({ activeFilter }: SkillUpFeedProps) => {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development with React & Node.js",
      provider: "TechAcademy Kenya",
      category: "Web Development",
      level: "Intermediate",
      duration: "12 weeks",
      price: 15000,
      rating: 4.8,
      students: 2341,
      thumbnail: "/placeholder.svg",
      description: "Master modern web development with hands-on projects and real-world applications.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      progress: 0
    },
    {
      id: 2,
      title: "Data Science with Python",
      provider: "Kenya Data Institute",
      category: "Data Science",
      level: "Beginner",
      duration: "16 weeks",
      price: 18000,
      rating: 4.9,
      students: 1876,
      thumbnail: "/placeholder.svg",
      description: "Learn data analysis, machine learning, and data visualization with Python.",
      skills: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      progress: 34
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      provider: "Marketing Pro Kenya",
      category: "Marketing",
      level: "Beginner",
      duration: "8 weeks",
      price: 12000,
      rating: 4.6,
      students: 3422,
      thumbnail: "/placeholder.svg",
      description: "Complete guide to digital marketing including SEO, social media, and analytics.",
      skills: ["SEO", "Social Media", "Google Analytics", "Content Marketing"],
      progress: 78
    },
    {
      id: 4,
      title: "Mobile App Development with Flutter",
      provider: "Mobile Dev Academy",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "10 weeks",
      price: 16000,
      rating: 4.7,
      students: 1543,
      thumbnail: "/placeholder.svg",
      description: "Build cross-platform mobile apps with Flutter and Dart programming language.",
      skills: ["Flutter", "Dart", "Firebase", "REST APIs"],
      progress: 0
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'beginner') return course.level === 'Beginner';
    if (activeFilter === 'intermediate') return course.level === 'Intermediate';
    if (activeFilter === 'advanced') return course.level === 'Advanced';
    if (activeFilter === 'free') return course.price === 0;
    if (activeFilter === 'in-progress') return course.progress > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <PlayCircle className="h-12 w-12 text-white opacity-80" />
              </div>
              <Badge className="absolute top-2 left-2" variant="secondary">
                {course.category}
              </Badge>
              <Badge 
                className="absolute top-2 right-2"
                variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}
              >
                {course.level}
              </Badge>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
              <p className="text-sm text-gray-600">by {course.provider}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{course.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {course.skills.map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  KSh {course.price.toLocaleString()}
                </div>
              </div>
              
              {course.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}
              
              <div className="flex space-x-2">
                {course.progress > 0 ? (
                  <Button className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <>
                    <Button className="flex-1">Enroll Now</Button>
                    <Button variant="outline">Preview</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillUpFeed;
