import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  MapPin,
  GraduationCap,
  Star,
  ExternalLink
} from "lucide-react";

const GraduateDashboard = () => {
  const [jobApplications] = useState([
    { id: 1, company: "Tech Solutions Inc", position: "Software Developer", status: "Interview Scheduled", date: "Next Wed", salary: "$75,000" },
    { id: 2, company: "Marketing Agency Pro", position: "Digital Marketing Specialist", status: "Applied", date: "3 days ago", salary: "$55,000" },
    { id: 3, company: "Finance Corp", position: "Financial Analyst", status: "Under Review", date: "1 week ago", salary: "$65,000" }
  ]);

  const [skillGaps] = useState([
    { skill: "React Development", current: 60, target: 90, priority: "High" },
    { skill: "Data Analysis", current: 40, target: 80, priority: "Medium" },
    { skill: "Digital Marketing", current: 70, target: 85, priority: "Low" }
  ]);

  const [alumniConnections] = useState([
    { id: 1, name: "Sarah Johnson", company: "Google", position: "Senior Developer", graduationYear: "2019", industry: "Technology" },
    { id: 2, name: "Mike Chen", company: "McKinsey", position: "Business Analyst", graduationYear: "2020", industry: "Consulting" },
    { id: 3, name: "Lisa Rodriguez", company: "Goldman Sachs", position: "Investment Banker", graduationYear: "2018", industry: "Finance" }
  ]);

  const [interviewPrep] = useState([
    { id: 1, topic: "Behavioral Questions", completed: 8, total: 12, type: "Practice" },
    { id: 2, topic: "Technical Coding", completed: 15, total: 20, type: "Assessment" },
    { id: 3, topic: "System Design", completed: 3, total: 8, type: "Study Guide" }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Career Launch Center</h1>
        <p className="text-muted-foreground">Transform your education into career success. You have 2 upcoming interviews!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Applications</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">Interviews</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Alumni Network</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Career Score</p>
                <p className="text-2xl font-bold">8.4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Active Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobApplications.map((application) => (
              <div key={application.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{application.position}</h4>
                    <p className="text-sm text-muted-foreground">{application.company}</p>
                  </div>
                  <Badge variant={
                    application.status === "Interview Scheduled" ? "default" :
                    application.status === "Under Review" ? "secondary" : "outline"
                  }>
                    {application.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{application.date}</span>
                  <span className="font-medium">{application.salary}</span>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Browse Job Opportunities
            </Button>
          </CardContent>
        </Card>

        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillGaps.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <Badge variant={skill.priority === "High" ? "destructive" : skill.priority === "Medium" ? "secondary" : "outline"}>
                    {skill.priority}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Current: {skill.current}%</span>
                    <span>Target: {skill.target}%</span>
                  </div>
                  <Progress value={skill.current} className="h-2" />
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <GraduationCap className="h-4 w-4 mr-2" />
              Find Learning Resources
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alumni Network */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Alumni Connections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alumniConnections.map((alumni) => (
              <div key={alumni.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{alumni.name}</h4>
                    <p className="text-sm text-muted-foreground">{alumni.position}</p>
                    <p className="text-sm text-muted-foreground">{alumni.company}</p>
                  </div>
                  <Badge variant="outline">Class of {alumni.graduationYear}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{alumni.industry}</span>
                  <Button size="sm">Connect</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Explore Alumni Directory
            </Button>
          </CardContent>
        </Card>

        {/* Interview Preparation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Interview Prep
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interviewPrep.map((prep) => (
              <div key={prep.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{prep.topic}</h4>
                    <p className="text-sm text-muted-foreground">{prep.type}</p>
                  </div>
                  <Badge variant="secondary">{prep.completed}/{prep.total}</Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={(prep.completed / prep.total) * 100} className="h-2" />
                  <Button size="sm" variant="ghost" className="w-full">Continue</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GraduateDashboard;