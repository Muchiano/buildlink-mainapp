import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Briefcase, Award, TrendingUp, Eye, Star } from 'lucide-react';
import AccountTypeFeatures from './AccountTypeFeatures';

interface GraduateDashboardProps {
  profile: any;
}

const GraduateDashboard = ({ profile }: GraduateDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-green-600" />
            <CardTitle className="text-green-900">Welcome, {profile.full_name}!</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            🧑‍🎓 Fresh graduate ready to make your mark. Showcase your work and find your first opportunities.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Eye className="w-8 h-8 text-green-500" />
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
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skill Endorsements</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Portfolio Showcase
            </CardTitle>
            <CardDescription>
              Display your final year projects, early work experience, and freelance gigs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Enhance Portfolio</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Entry-Level Opportunities
            </CardTitle>
            <CardDescription>
              Find trainee roles and entry-level positions requiring little experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Browse Jobs</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Get Skill Endorsements
            </CardTitle>
            <CardDescription>
              Build credibility with endorsements from peers and mentors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Request Endorsements</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Continuous Learning
            </CardTitle>
            <CardDescription>
              Explore graduate competitions and CPD events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Find Events</Button>
          </CardContent>
        </Card>
      </div>

      {/* Premium Features */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Unlock Premium Features
          </CardTitle>
          <CardDescription className="text-blue-700">
            Get extra portfolio slots and advanced analytics to stand out
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Premium</Badge>
              <span className="text-sm">Additional portfolio slots to showcase more work</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Analytics</Badge>
              <span className="text-sm">Enhanced engagement metrics on your profile</span>
            </div>
            <Button className="mt-4">Upgrade to Premium</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Features */}
      <AccountTypeFeatures userType="graduate" />
    </div>
  );
};

export default GraduateDashboard;