import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Building2, Calendar, Users, Award, Camera, Edit, Plus, MessageCircle, Phone, Mail, Heart, MessageSquare, Share2, Globe, Linkedin, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService, postsService } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";
import ProfileEditDialog from "../ProfileEditDialog";
import BannerEditDialog from "../profile-sections/BannerEditDialog";
import AboutEditDialog from "../profile-sections/AboutEditDialog";
import SkillsEditDialog from "../profile-sections/SkillsEditDialog";
import ExperienceEditDialog from "../profile-sections/ExperienceEditDialog";
import EducationEditDialog from "../profile-sections/EducationEditDialog";
import CertificationsEditDialog from "../profile-sections/CertificationsEditDialog";
import InterestsEditDialog from "../profile-sections/InterestsEditDialog";
import AvatarUploader from "../profile-sections/AvatarUploader";
import ProfileBanner from "./ProfileBanner";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileAbout from "./ProfileAbout";
import ProfileActivity from "./ProfileActivity";

const ProfileBoard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [uploading, setUploading] = useState(false);

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

  // Avatar update logic (moved from ProfileEditForm, now handled here)
  const handleAvatarChange = async (croppedFile: File) => {
    if (!user) return;
    setUploading(true);
    try {
      const { data, error } = await profileService.uploadAvatar(user.id, croppedFile);
      if (error) throw error;
      if (data) {
        setProfile(prev => ({ ...prev, avatar: data.avatar || "" }));
        toast({
          title: "Success",
          description: "Avatar uploaded successfully!",
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Avatar remove logic
  const handleAvatarRemove = async () => {
    if (!user) return;
    setUploading(true);
    try {
      // Remove avatar by setting it to empty string in backend
      const updatedProfile = { ...profile, avatar: "" };
      const { error } = await profileService.updateProfile(user.id, updatedProfile);
      if (error) throw error;
      setProfile(updatedProfile);
      toast({
        title: "Photo removed",
        description: "Your profile photo has been removed.",
      });
    } catch (error) {
      console.error("Error removing avatar:", error);
      toast({
        title: "Error",
        description: "Failed to remove profile photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
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

  const renderAboutContent = () => {
    if (!profile.bio) {
      return (
        <div className="text-gray-500 italic">
          No professional summary available yet. Click edit to add your story and let others know about your journey, expertise, and career aspirations.
        </div>
      );
    }

    const characterLimit = 220;
    const shouldTruncate = profile.bio.length > characterLimit;
    const displayText = isAboutExpanded || !shouldTruncate 
      ? profile.bio 
      : profile.bio.substring(0, characterLimit) + '...';

    return (
      <div className="space-y-3">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
          {displayText}
        </div>
        {shouldTruncate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
          >
            {isAboutExpanded ? 'Show less' : 'Read more'}
          </Button>
        )}
      </div>
    );
  };

  const renderSkillsContent = () => {
    if (!profile.skills || profile.skills.length === 0) {
      return (
        <div className="text-gray-500 italic py-4">
          No skills added yet. Click edit to showcase your expertise and specializations.
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {profile.skills.map((skill: any, index: number) => {
          // Handle both string skills (legacy) and object skills (new format)
          const skillName = typeof skill === 'string' ? skill : skill.name;
          const skillLevel = typeof skill === 'string' ? 3 : (skill.level || 3);
          
          const getProgressWidth = (level: number) => {
            return `${(level / 5) * 100}%`;
          };

          return (
            <div key={index} className="space-y-2">
              <span className="text-gray-900 font-medium">{skillName}</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300 bg-primary"
                  style={{ width: getProgressWidth(skillLevel) }}
                />
              </div>
            </div>
          );
        })}
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
      <ProfileBanner 
        profile={profile} 
        onProfileUpdated={handleProfileUpdate}
      />
      <ProfileHeader 
        profile={profile}
        uploading={uploading}
        userPostsCount={userPosts.length}
        handleAvatarChange={handleAvatarChange}
        handleAvatarRemove={handleAvatarRemove}
        handleProfileUpdate={handleProfileUpdate}
      />
      <ProfileTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        postsCount={userPosts.length}
      />
      {activeTab === "about" ? (
        <ProfileAbout 
          profile={profile}
          handleProfileUpdate={handleProfileUpdate}
        />
      ) : (
        <ProfileActivity userPosts={userPosts} />
      )}
    </div>
  );
};

export default ProfileBoard;
