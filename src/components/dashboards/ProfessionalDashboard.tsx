import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  MessageSquare,
  Target,
  Crown,
  Lightbulb,
  Network
} from "lucide-react";

const ProfessionalDashboard = () => {
  const [leadershipContent] = useState([
    { id: 1, title: "Leading Remote Teams in 2024", type: "Article", engagement: 245, status: "Published", date: "2 days ago" },
    { id: 2, title: "Digital Transformation Strategy", type: "Webinar", attendees: 89, status: "Scheduled", date: "Next Week" },
    { id: 3, title: "Industry Innovation Trends", type: "Podcast", plays: 156, status: "Draft", date: "In Progress" }
  ]);

  const [mentorshipStats] = useState([
    { metric: "Active Mentees", value: 8, change: "+2 this month" },
    { metric: "Sessions Completed", value: 24, change: "+6 this week" },
    { metric: "Rating", value: "4.9", change: "⭐⭐⭐⭐⭐" },
    { metric: "Impact Score", value: 92, change: "+5 points" }
  ]);

  const [advancedLearning] = useState([
    { id: 1, title: "Executive Leadership Program", provider: "Business School", progress: 65, level: "Executive", duration: "12 weeks" },
    { id: 2, title: "Advanced Data Analytics", provider: "Tech Institute", progress: 40, level: "Advanced", duration: "8 weeks" },
    { id: 3, title: "Strategic Innovation", provider: "Innovation Hub", progress: 85, level: "Master", duration: "6 weeks" }
  ]);

  const [networkingEvents] = useState([
    { id: 1, name: "Tech Leadership Summit", date: "Mar 15", attendees: 250, type: "Conference", location: "San Francisco" },
    { id: 2, name: "Industry Innovation Meetup", date: "Mar 22", attendees: 45, type: "Networking", location: "Virtual" },
    { id: 3, name: "Executive Roundtable", date: "Mar 28", attendees: 12, type: "Exclusive", location: "New York" }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Leadership Hub</h1>
        <p className="text-muted-foreground">Drive innovation and share your expertise with the professional community.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mentorshipStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <p className="text-sm font-medium">{stat.metric}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thought Leadership */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Thought Leadership
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leadershipContent.map((content) => (
              <div key={content.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{content.title}</h4>
                    <p className="text-sm text-muted-foreground">{content.type}</p>
                  </div>
                  <Badge variant={
                    content.status === "Published" ? "default" :
                    content.status === "Scheduled" ? "secondary" : "outline"
                  }>
                    {content.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{content.date}</span>
                  <div className="flex items-center gap-4">
                    {content.engagement && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {content.engagement}
                      </span>
                    )}
                    {content.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {content.attendees}
                      </span>
                    )}
                    {content.plays && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {content.plays}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Crown className="h-4 w-4 mr-2" />
              Create New Content
            </Button>
          </CardContent>
        </Card>

        {/* Advanced Learning Paths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Executive Learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {advancedLearning.map((course) => (
              <div key={course.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.provider}</p>
                  </div>
                  <Badge variant={course.level === "Executive" ? "default" : course.level === "Master" ? "secondary" : "outline"}>
                    {course.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{course.duration}</span>
                    <Button size="sm" variant="ghost">Continue</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Networking Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Industry Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {networkingEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  <Badge variant={event.type === "Exclusive" ? "default" : event.type === "Conference" ? "secondary" : "outline"}>
                    {event.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{event.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {event.attendees}
                    </span>
                    <Button size="sm">RSVP</Button>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Discover More Events
            </Button>
          </CardContent>
        </Card>

        {/* Mentorship Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Mentorship Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-primary mb-2">8</div>
              <p className="text-muted-foreground mb-4">Active Mentees</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">24</p>
                  <p className="text-muted-foreground">Sessions</p>
                </div>
                <div>
                  <p className="font-medium">4.9⭐</p>
                  <p className="text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Monthly Impact Goal</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <Button className="w-full" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              View Mentee Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;