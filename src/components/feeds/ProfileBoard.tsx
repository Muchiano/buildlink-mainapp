
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
      <div className="space-y-4 md:space-y-6 animate-pulse">
        {/* Banner Skeleton */}
        <div className="w-full h-32 sm:h-40 md:h-48 bg-muted rounded-lg"></div>
        
        {/* Header Skeleton */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 bg-muted rounded"></div>
              <div className="h-10 w-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>

        {/* Completion Indicator Skeleton */}
        <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex space-x-4">
          <div className="h-10 w-20 bg-muted rounded"></div>
          <div className="h-10 w-24 bg-muted rounded"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
              <div className="h-6 bg-muted rounded w-1/4 mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
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
    <div className="space-y-4 md:space-y-6 animate-fade-in">
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
      
      {/* Profile Completion - moved above tabs */}
      <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-md">
        <CardContent className="p-4 md:p-6">
          <ProfileCompletionIndicator score={profile?.profile_completion_score || 0} showDetails />
        </CardContent>
      </Card>
      
      <ProfileTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        postsCount={userPosts.length}
      />
      
      <div className="transition-all duration-300">
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
  );
};

export default ProfileBoard;
