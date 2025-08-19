import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock,
  GraduationCap,
  Star
} from "lucide-react";

const StudentDashboard = () => {
  const [activeAssignments] = useState([
    { id: 1, title: "Data Structures Assignment", due: "2 days", progress: 75, course: "CS 201" },
    { id: 2, title: "Marketing Case Study", due: "5 days", progress: 30, course: "MKT 301" },
    { id: 3, title: "Statistics Problem Set", due: "1 week", progress: 0, course: "STAT 101" }
  ]);

  const [studyGroups] = useState([
    { id: 1, name: "Algorithm Study Group", members: 8, nextMeeting: "Tomorrow 3PM", subject: "Computer Science" },
    { id: 2, name: "Financial Accounting", members: 12, nextMeeting: "Wed 2PM", subject: "Business" },
    { id: 3, name: "Organic Chemistry", members: 6, nextMeeting: "Fri 4PM", subject: "Chemistry" }
  ]);

  const [recommendedCourses] = useState([
    { id: 1, title: "Advanced JavaScript", provider: "TechEd", rating: 4.8, duration: "6 weeks", level: "Intermediate" },
    { id: 2, title: "Digital Marketing Fundamentals", provider: "MarketingPro", rating: 4.6, duration: "4 weeks", level: "Beginner" },
    { id: 3, title: "Data Analysis with Python", provider: "DataLab", rating: 4.9, duration: "8 weeks", level: "Intermediate" }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, Student!</h1>
        <p className="text-muted-foreground">Ready to continue your learning journey? You have 3 assignments due this week.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Active Courses</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">Study Groups</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Assignments Due</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Overall Progress</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAssignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <Badge variant={assignment.progress === 0 ? "destructive" : assignment.progress < 50 ? "secondary" : "default"}>
                    <Clock className="h-3 w-3 mr-1" />
                    {assignment.due}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              My Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{group.name}</h4>
                    <p className="text-sm text-muted-foreground">{group.subject}</p>
                  </div>
                  <Badge variant="outline">{group.members} members</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Next: {group.nextMeeting}</p>
                  <Button size="sm" variant="ghost">Join</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Find Study Groups
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.provider}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                    <Button size="sm">Enroll</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;