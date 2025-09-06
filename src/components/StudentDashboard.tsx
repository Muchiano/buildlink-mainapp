import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users, Award, TrendingUp, Eye } from 'lucide-react';
import AccountTypeFeatures from './AccountTypeFeatures';

interface StudentDashboardProps {
  profile: any;
}

const StudentDashboard = ({ profile }: StudentDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-blue-900">Welcome, {profile.full_name}!</CardTitle>
          </div>
          <CardDescription className="text-blue-700">
            🎓 Emerging talent on the path to success. Build your network, showcase your work, and discover opportunities.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Items</p>
                <p className="text-2xl font-bold">{profile.portfolio?.length || 0}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Build Your Portfolio
            </CardTitle>
            <CardDescription>
              Showcase your student projects, competitions, and concept designs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Add Portfolio Item</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Find Mentors
            </CardTitle>
            <CardDescription>
              Connect with experienced professionals for guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Browse Mentors</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Internship Opportunities
            </CardTitle>
            <CardDescription>
              Apply for internships directly through the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Internships</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Skills Development
            </CardTitle>
            <CardDescription>
              Access free/discounted events and learning resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Explore Resources</Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Features */}
      <AccountTypeFeatures userType="student" />

      {/* Profile Completion */}
      {profile.profile_completion_score < 100 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">Complete Your Profile</CardTitle>
            <CardDescription className="text-orange-700">
              A complete profile gets more visibility from potential mentors and employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>{profile.profile_completion_score || 0}%</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profile.profile_completion_score || 0}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentDashboard;