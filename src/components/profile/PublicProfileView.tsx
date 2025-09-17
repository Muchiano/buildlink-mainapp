import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, UserPlus, MapPin, Briefcase, GraduationCap, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { publicProfileService } from '@/services/publicProfileService';
import { useToast } from '@/hooks/use-toast';
import ProfileCompletionIndicator from './ProfileCompletionIndicator';
import SocialMediaLinks from './SocialMediaLinks';
import VerificationBadges from './VerificationBadges';

const PublicProfileView: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewRecorded, setViewRecorded] = useState(false);

  useEffect(() => {
    if (profileId) {
      loadProfile();
    }
  }, [profileId]);

  const loadProfile = async () => {
    if (!profileId) return;

    try {
      const { data, error } = await publicProfileService.getPublicProfile(profileId);
      
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load profile or profile is not public',
          variant: 'destructive'
        });
        return;
      }

      setProfile(data);

      // Record profile view if not own profile and not already recorded
      if (user && user.id !== profileId && !viewRecorded) {
        await publicProfileService.recordProfileView(profileId);
        setViewRecorded(true);
      }
    } catch (error) {
      console.error('Error loading public profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Profile Not Found</h3>
          <p className="text-muted-foreground">
            This profile doesn't exist or is not public.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl">
                  {profile.full_name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{profile.full_name}</h1>
                  <VerificationBadges badges={profile.verification_badges || []} />
                </div>
                
                {profile.profession && (
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{profile.profession}</span>
                    {profile.organization && (
                      <span className="ml-2">at {profile.organization}</span>
                    )}
                  </div>
                )}
                
                {profile.title && (
                  <div className="flex items-center text-muted-foreground mb-1">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{profile.title}</span>
                  </div>
                )}
                
                <ProfileCompletionIndicator score={profile.profile_completion_score || 0} />
              </div>
              
              {profile.bio && (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
              
              <SocialMediaLinks links={profile.social_links || {}} />
              
              {user && user.id !== profile.id && (
                <div className="flex gap-2">
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Section */}
      {profile.skills && profile.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Experience Section */}
      {profile.experiences && profile.experiences.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.experiences.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                {exp.description && (
                  <p className="text-sm mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Education Section */}
      {profile.education && profile.education.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.education.map((edu: any, index: number) => (
              <div key={index} className="border-l-2 border-muted pl-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </p>
                {edu.description && (
                  <p className="text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PublicProfileView;