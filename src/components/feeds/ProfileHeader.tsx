import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Users, MessageCircle, Edit, Star, Settings } from "lucide-react";
import ProfileEditDialog from "../ProfileEditDialog";
import AvatarUploader from "../profile-sections/AvatarUploader";
import UserRating from "../UserRating";
import AccountTypeBadge from "../AccountTypeBadge";
import RatingDialog from "../RatingDialog";
import ProfileSettingsDialog from "../ProfileSettingsDialog";
import { useState } from "react";

interface ProfileHeaderProps {
  profile: any;
  uploading: boolean;
  userPostsCount: number;
  handleAvatarChange: (file: File) => Promise<void>;
  handleAvatarRemove: () => Promise<void>;
  handleProfileUpdate: () => void;
}

const ProfileHeader = ({
  profile,
  uploading,
  userPostsCount,
  handleAvatarChange,
  handleAvatarRemove,
  handleProfileUpdate,
}: ProfileHeaderProps) => {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          {/* Info and Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
            <div className="relative">
              <AvatarUploader
                avatarUrl={profile.avatar || ""}
                fullName={profile.full_name}
                uploading={uploading}
                onAvatarChange={handleAvatarChange}
                onAvatarRemove={profile.avatar ? handleAvatarRemove : undefined}
              />
            </div>
            <div className="flex-1">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-foreground mb-1">
                      {profile.full_name || "User"}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <AccountTypeBadge
                        userType={profile.user_type || "student"}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-base text-muted-foreground mb-1">
                  {profile.profession || "No profession specified"}
                  {profile.organization && (
                    <span> - {profile.organization}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1 sm:flex-none">
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>

            <ProfileEditDialog
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}>
              <Button className="flex-1 sm:flex-none">
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </ProfileEditDialog>

            <ProfileSettingsDialog>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Settings className="h-4 w-4" />
              </Button>
            </ProfileSettingsDialog>
          </div>
        </div>
      </CardContent>

      <RatingDialog
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        ratedUserId={profile.id}
        ratedUserName={profile.full_name}
      />
    </Card>
  );
};

export default ProfileHeader;
