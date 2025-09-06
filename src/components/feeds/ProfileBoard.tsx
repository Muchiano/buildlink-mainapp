
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
    <div className="max-w-4xl mx-auto">
      {/* LinkedIn-style header with banner and overlapping avatar */}
      <Card className="overflow-hidden border-0 shadow-sm mb-4">
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
      </Card>

      {/* LinkedIn-style content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar - Profile completion and quick info */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Profile Strength</h3>
              <ProfileCompletionIndicator score={profile?.profile_completion_score || 0} showDetails={false} />
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-4">
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
      </div>
    </div>
  );
};

export default ProfileBoard;
