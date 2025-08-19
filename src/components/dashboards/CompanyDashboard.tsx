import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  BarChart3,
  Eye,
  UserPlus,
  Star,
  Zap,
  MessageSquare
} from "lucide-react";

const CompanyDashboard = () => {
  const [talentMetrics] = useState([
    { metric: "Active Job Posts", value: 12, change: "+3 this week", icon: UserPlus },
    { metric: "Applications", value: 156, change: "+24 today", icon: Users },
    { metric: "Profile Views", value: 2847, change: "+15% this month", icon: Eye },
    { metric: "Company Rating", value: "4.6", change: "⭐⭐⭐⭐⭐", icon: Star }
  ]);

  const [activeRecruitment] = useState([
    { id: 1, position: "Senior Software Engineer", applicants: 45, status: "Active", posted: "3 days ago", priority: "High" },
    { id: 2, position: "Product Manager", applicants: 28, status: "Active", posted: "1 week ago", priority: "Medium" },
    { id: 3, position: "UX Designer", applicants: 32, status: "Review", posted: "5 days ago", priority: "High" },
    { id: 4, position: "Data Analyst", applicants: 19, status: "Active", posted: "2 days ago", priority: "Low" }
  ]);

  const [employeeDevelopment] = useState([
    { id: 1, program: "Leadership Development", enrolled: 24, completion: 75, duration: "12 weeks" },
    { id: 2, program: "Technical Skills Bootcamp", enrolled: 18, completion: 60, duration: "8 weeks" },
    { id: 3, program: "Digital Marketing Certification", enrolled: 12, completion: 90, duration: "6 weeks" }
  ]);

  const [companyBranding] = useState([
    { metric: "Brand Visibility", value: 85, target: 90 },
    { metric: "Employee Advocacy", value: 78, target: 85 },
    { metric: "Industry Recognition", value: 92, target: 95 }
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Talent Acquisition Hub</h1>
        <p className="text-muted-foreground">Build your team, develop talent, and grow your company's presence in the professional community.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {talentMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <metric.icon className="h-5 w-5 text-primary" />
                <div className="w-full">
                  <p className="text-sm font-medium">{metric.metric}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Recruitment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Active Recruitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeRecruitment.map((job) => (
              <div key={job.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{job.position}</h4>
                    <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={job.priority === "High" ? "destructive" : job.priority === "Medium" ? "secondary" : "outline"}>
                      {job.priority}
                    </Badge>
                    <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                      {job.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </CardContent>
        </Card>

        {/* Employee Development */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Employee Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employeeDevelopment.map((program) => (
              <div key={program.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{program.program}</h4>
                    <p className="text-sm text-muted-foreground">{program.duration}</p>
                  </div>
                  <Badge variant="outline">{program.enrolled} enrolled</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{program.completion}%</span>
                  </div>
                  <Progress value={program.completion} className="h-2" />
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Create Training Program
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Brand Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {companyBranding.map((brand, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{brand.metric}</span>
                  <span className="text-sm text-muted-foreground">{brand.value}% / {brand.target}%</span>
                </div>
                <Progress value={brand.value} className="h-2" />
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Button className="w-full" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Brand Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recruitment Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Total Applications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">23</p>
                  <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">8</p>
                  <p className="text-sm text-muted-foreground">Offers Extended</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-500">5</p>
                  <p className="text-sm text-muted-foreground">New Hires</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Hiring Success Rate</span>
                <span>68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <Button className="w-full" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Management Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">127</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">15</p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">94%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">2.1</p>
              <p className="text-sm text-muted-foreground">Avg. Tenure (years)</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button className="flex-1" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Employee Feedback
            </Button>
            <Button className="flex-1" variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Performance Reviews
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;