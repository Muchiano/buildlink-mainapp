
import { useState } from "react";
import ProfileBanner from "./ProfileBanner";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileAbout from "./ProfileAbout";
import ProfileActivity from "./ProfileActivity";
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent } from "@/components/ui/card";
import ProfileCompletionIndicator from "@/components/profile/ProfileCompletionIndicator";

const ProfileBoard = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { 
    profile, 
    userPosts, 
    loading, 
    uploading, 
    handleProfileUpdate, 
    handleAvatarChange, 
    handleAvatarRemove 
  } = useProfile();

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
      <div className="sticky top-0 z-20 bg-background pb-2">
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
      </div>
      
      {/* Profile Completion - moved above tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <ProfileCompletionIndicator score={profile?.profile_completion_score || 0} showDetails />
        </CardContent>
      </Card>
      
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
