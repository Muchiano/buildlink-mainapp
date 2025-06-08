
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Edit3, MapPin, Briefcase, GraduationCap, Mail, Save, Camera } from 'lucide-react';

const ProfileBoard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    title: 'Software Developer',
    organization: 'Tech Solutions Ltd',
    location: 'Nairobi, Kenya',
    bio: 'Passionate software developer with 3+ years of experience in web development. Love building solutions that make a difference.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
    education: 'BSc Computer Science - University of Nairobi',
    email: 'john.doe@example.com'
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.'
      });
      setIsEditing(false);
    }, 1000);
  };

  const stats = {
    posts: 24,
    connections: 156,
    mentorSessions: 8,
    coursesCompleted: 3
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h1>
                <p className="text-lg text-gray-600">{profileData.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{profileData.organization}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              variant={isEditing ? 'default' : 'outline'}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">{profileData.education}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Posts</span>
                <span className="font-semibold">{stats.posts}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Connections</span>
                <span className="font-semibold">{stats.connections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Mentor Sessions</span>
                <span className="font-semibold">{stats.mentorSessions}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Courses Completed</span>
                <span className="font-semibold">{stats.coursesCompleted}</span>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={profileData.organization}
                    onChange={(e) => setProfileData({...profileData, organization: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;
