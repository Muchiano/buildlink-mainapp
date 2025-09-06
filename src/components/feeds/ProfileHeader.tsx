
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
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
          {/* Info and Avatar */}
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
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
                        {profile.full_name || 'User'}
                      </h1>
                      <div className="flex items-center gap-2 mt-1">
                        <AccountTypeBadge userType={profile.user_type || 'student'} />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-1">
                    {profile.profession || 'No profession specified'}
                  </p>
                  <p className="text-muted-foreground mb-3">
                    {profile.organization || 'No organization specified'}
                  </p>

                  <UserRating 
                    rating={profile.average_rating || 0}
                    totalRatings={profile.total_ratings || 0}
                    className="py-2"
                  />

                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Kenya
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {userPostsCount} posts
                    </div>
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
              <Button 
                variant="outline"
                onClick={() => setShowRatingDialog(true)}
              >
                <Star className="h-4 w-4 mr-1" />
                Rate
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
