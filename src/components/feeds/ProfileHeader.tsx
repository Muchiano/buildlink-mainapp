
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Users, MessageCircle, Edit, Star } from "lucide-react";
import ProfileEditDialog from "../ProfileEditDialog";
import AvatarUploader from "../profile-sections/AvatarUploader";
import UserRating from "../UserRating";
import AccountTypeBadge from "../AccountTypeBadge";
import RatingDialog from "../RatingDialog";
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
    <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
          {/* Info and Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <AvatarUploader
                  avatarUrl={profile.avatar || ""}
                  fullName={profile.full_name}
                  uploading={uploading}
                  onAvatarChange={handleAvatarChange}
                  onAvatarRemove={profile.avatar ? handleAvatarRemove : undefined}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                    <div className="flex-1">
                      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1 break-words">
                        {profile.full_name || 'User'}
                      </h1>
                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <AccountTypeBadge userType={profile.user_type || 'student'} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-base md:text-lg text-muted-foreground mb-1 break-words">
                    {profile.profession || 'No profession specified'}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mb-3 break-words">
                    {profile.organization || 'No organization specified'}
                  </p>

                  <UserRating 
                    rating={profile.average_rating || 0}
                    totalRatings={profile.total_ratings || 0}
                    className="py-2 justify-center sm:justify-start"
                  />

                  <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Kenya</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{userPostsCount} posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="hidden xs:inline">Message</span>
              </Button>
              <Button 
                variant="outline"
                className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
                size="sm"
                onClick={() => setShowRatingDialog(true)}
              >
                <Star className="h-4 w-4 mr-1" />
                <span className="hidden xs:inline">Rate</span>
              </Button>
              <ProfileEditDialog 
                currentProfile={profile}
                onProfileUpdated={handleProfileUpdate}
              >
                <Button 
                  className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Edit</span>
                </Button>
              </ProfileEditDialog>
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
