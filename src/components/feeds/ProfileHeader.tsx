
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
    <>
      {/* LinkedIn-style header with avatar overlapping banner */}
      <div className="relative px-6 pb-6">
        {/* Avatar positioned to overlap banner */}
        <div className="absolute -top-16 left-6">
          <div className="w-32 h-32 border-4 border-background rounded-full overflow-hidden bg-background">
            <AvatarUploader
              avatarUrl={profile.avatar || ""}
              fullName={profile.full_name}
              uploading={uploading}
              onAvatarChange={handleAvatarChange}
              onAvatarRemove={profile.avatar ? handleAvatarRemove : undefined}
            />
          </div>
        </div>

        {/* Main profile info */}
        <div className="pt-20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {profile.full_name || 'User'}
                </h1>
                <AccountTypeBadge userType={profile.user_type || 'student'} />
              </div>
              
              <p className="text-xl text-muted-foreground mb-1">
                {profile.profession || 'No profession specified'}
              </p>
              
              {profile.organization && (
                <p className="text-muted-foreground mb-3">
                  {profile.organization}
                </p>
              )}

              <UserRating 
                rating={profile.average_rating || 0}
                totalRatings={profile.total_ratings || 0}
                className="mb-3"
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

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowRatingDialog(true)}
              >
                <Star className="h-4 w-4 mr-1" />
                Rate
              </Button>
              <ProfileEditDialog 
                currentProfile={profile}
                onProfileUpdated={handleProfileUpdate}
              >
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </ProfileEditDialog>
            </div>
          </div>
        </div>
      </div>
      
      <RatingDialog
        isOpen={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        ratedUserId={profile.id}
        ratedUserName={profile.full_name}
      />
    </>
  );
};

export default ProfileHeader;
