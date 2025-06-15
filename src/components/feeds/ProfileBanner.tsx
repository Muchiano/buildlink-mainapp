
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import BannerEditDialog from "../profile-sections/BannerEditDialog";
import { Camera } from "lucide-react";

interface ProfileBannerProps {
  profile: any;
  onProfileUpdated: () => void;
}

const ProfileBanner = ({ profile, onProfileUpdated }: ProfileBannerProps) => (
  <Card className="border-0 shadow-sm overflow-hidden">
    <div className="h-32 bg-gradient-to-r from-primary to-primary/80 relative">
      <BannerEditDialog 
        currentProfile={profile}
        onProfileUpdated={onProfileUpdated}
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
        >
          <Camera className="h-4 w-4 mr-1" />
          Edit Cover
        </Button>
      </BannerEditDialog>
    </div>
  </Card>
);

export default ProfileBanner;
