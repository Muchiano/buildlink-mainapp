import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, FileText, Award, TrendingUp, Eye, Shield, BookOpen } from 'lucide-react';
import AccountTypeFeatures from './AccountTypeFeatures';

interface ProfessionalDashboardProps {
  profile: any;
}

const ProfessionalDashboard = ({ profile }: ProfessionalDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            <CardTitle className="text-indigo-900">Welcome, {profile.full_name}!</CardTitle>
          </div>
          <CardDescription className="text-indigo-700">
            🏗️ Experienced professional driving the industry forward. Share expertise, find collaborations, and lead innovation.
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
              <Eye className="w-8 h-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published Articles</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Professional Rating</p>
                <p className="text-2xl font-bold">{profile.average_rating?.toFixed(1) || "N/A"}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collaborations</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification Status */}
      {profile.verification_level === 'unverified' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Get Verified
            </CardTitle>
            <CardDescription className="text-orange-700">
              Verify your professional credentials to build trust and credibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Verify Professional Status</Button>
          </CardContent>
        </Card>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Publish Thought Leadership
            </CardTitle>
            <CardDescription>
              Share articles and resources directly to the platform hub
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Write Article</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Exclusive Tenders
            </CardTitle>
            <CardDescription>
              Access high-level tenders and collaboration opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Browse Tenders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Professional Portfolio
            </CardTitle>
            <CardDescription>
              Showcase real projects, collaborations, and publications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Update Portfolio</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Network & Collaborate
            </CardTitle>
            <CardDescription>
              Connect with peers, clients, and other professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Find Collaborators</Button>
          </CardContent>
        </Card>
      </div>

      {/* Professional Features */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader>
          <CardTitle className="text-emerald-900 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Professional Benefits
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Exclusive features for verified professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Verified</Badge>
              <span className="text-sm">Professional verification badge for credibility</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Analytics</Badge>
              <span className="text-sm">Advanced insights on profile and project engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Publishing</Badge>
              <span className="text-sm">Direct publishing access to platform resource hub</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Features */}
      <AccountTypeFeatures userType="professional" />
    </div>
  );
};

export default ProfessionalDashboard;