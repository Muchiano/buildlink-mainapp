
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Building2, Calendar, Users, Award, Camera, Edit, Plus, MessageCircle, Phone, Mail, Heart, MessageSquare, Share2, Globe, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService, postsService } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";
import ProfileEditDialog from "../ProfileEditDialog";

const ProfileBoard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Load profile data
      const { data: profileData, error: profileError } = await profileService.getProfile(user.id);
      if (profileError) throw profileError;
      
      setProfile(profileData);

      // Load user posts for activity tab
      const { data: postsData, error: postsError } = await postsService.getPosts();
      if (postsError) throw postsError;
      
      // Filter posts by current user
      const filteredPosts = postsData?.filter(post => post.author_id === user.id) || [];
      setUserPosts(filteredPosts);
      
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    loadUserData();
    toast({
      title: 'Success',
      description: 'Profile updated successfully!'
    });
  };

  const renderActivityItem = (post: any) => {
    return (
      <div key={post.id} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Edit className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes_count || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments_count || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share2 className="h-4 w-4" />
                  <span>{post.reposts_count || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Profile not found</h3>
        <p className="text-gray-500">Unable to load profile data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Banner */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary/80 relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
          >
            <Camera className="h-4 w-4 mr-1" />
            Edit Cover
          </Button>
        </div>
      </Card>

      {/* Profile Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-xl">
                    {profile.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <ProfileEditDialog 
                  currentProfile={profile}
                  onProfileUpdated={handleProfileUpdate}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute -bottom-1 -right-1 rounded-full h-6 w-6 p-0"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </ProfileEditDialog>
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {profile.full_name || 'User'}
                </h1>
                <p className="text-lg text-gray-700 mb-1">
                  {profile.profession || 'No profession specified'}
                </p>
                <p className="text-gray-600 mb-3">
                  {profile.organization || 'No organization specified'}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Kenya
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {userPosts.length} posts
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
              <ProfileEditDialog 
                currentProfile={profile}
                onProfileUpdated={handleProfileUpdate}
              >
                <Button>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </ProfileEditDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("about")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "about"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "activity"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Activity ({userPosts.length})
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === "about" && (
        <div className="space-y-6">
          {/* About Section */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">About</h2>
                <ProfileEditDialog 
                  currentProfile={profile}
                  onProfileUpdated={handleProfileUpdate}
                >
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </ProfileEditDialog>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {profile.profession && profile.organization 
                  ? `${profile.profession} at ${profile.organization}` 
                  : profile.profession || 'No professional information available yet. Click edit to add your details.'}
              </p>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Professional Information</h2>
                <ProfileEditDialog 
                  currentProfile={profile}
                  onProfileUpdated={handleProfileUpdate}
                >
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </ProfileEditDialog>
              </div>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {profile.title || 'Job Title'}
                    </h3>
                    <p className="text-gray-600">
                      {profile.organization || 'No organization specified'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {profile.profession || 'No profession specified'}
                    </p>
                  </div>
                </div>
                
                {profile.education_level && (
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">Education</h3>
                      <p className="text-gray-600">{profile.education_level}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "activity" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <span className="text-sm text-gray-500">{userPosts.length} posts</span>
            </div>
            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.map(renderActivityItem)}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts yet</h3>
                <p className="text-gray-500">
                  Start sharing your thoughts and experiences with the community
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileBoard;
