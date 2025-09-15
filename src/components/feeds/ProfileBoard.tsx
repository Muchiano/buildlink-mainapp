import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import ProfileAbout from "./ProfileAbout";
import ProfileActivity from "./ProfileActivity";
import { useProfile } from "@/hooks/useProfile";
import { Card, CardContent } from "@/components/ui/card";
import ProfileCompletionIndicator from "@/components/profile/ProfileCompletionIndicator";
import { BookOpen, Users } from "lucide-react";

const ProfileBoard = () => {
  const [activeTab, setActiveTab] = useState("about");
  const {
    profile,
    userPosts,
    loading,
    uploading,
    handleProfileUpdate,
    handleAvatarChange,
    handleAvatarRemove,
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
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Profile not found
        </h3>
        <p className="text-gray-500">Unable to load profile data</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 px-2 md:px-0">
      <ProfileHeader
        profile={profile}
        uploading={uploading}
        userPostsCount={userPosts.length}
        handleAvatarChange={handleAvatarChange}
        handleAvatarRemove={handleAvatarRemove}
        handleProfileUpdate={handleProfileUpdate}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Items</p>
                <p className="text-4xl font-bold">
                  {profile.portfolio?.length || 0}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-4xl font-bold">0</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <ProfileCompletionIndicator
              score={profile?.profile_completion_score || 0}
              showDetails
            />
          </CardContent>
        </Card>
      </div>

      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        postsCount={userPosts.length}
      />
      <div className="px-2 md:px-0">
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
