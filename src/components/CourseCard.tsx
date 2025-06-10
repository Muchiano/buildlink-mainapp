
import { Clock, Users, Star, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types/database';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
  isEnrolled?: boolean;
}

const CourseCard = ({ course, onEnroll, isEnrolled = false }: CourseCardProps) => {
  const getDifficultyColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || colors.beginner;
  };

  return (
    <Card className="w-full">
      {course.image_url && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight">{course.title}</h3>
            <Badge variant="secondary" className={getDifficultyColor(course.difficulty_level)}>
              {course.difficulty_level}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground">
            by {course.instructor?.full_name}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration_hours}h</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.category}</span>
              </div>
            </div>
            
            <div className="font-semibold text-primary">
              ${course.price}
            </div>
          </div>
          
          <div className="pt-3">
            <Button 
              onClick={() => onEnroll(course)} 
              className="w-full"
              variant={isEnrolled ? "secondary" : "default"}
              disabled={isEnrolled}
            >
              {isEnrolled ? 'Enrolled' : 'Enroll Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
