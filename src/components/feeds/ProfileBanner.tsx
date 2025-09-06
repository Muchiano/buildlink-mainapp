
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import BannerEditDialog from "../profile-sections/BannerEditDialog";
import { Camera } from "lucide-react";

interface ProfileBannerProps {
  profile: any;
  onProfileUpdated: () => void;
}

const ProfileBanner = ({ profile, onProfileUpdated }: ProfileBannerProps) => (
  <div className="h-48 relative">
    {/* Banner image (if exists; fallback to gradient) */}
    {profile.banner ? (
      <img
        src={profile.banner}
        alt="Profile Banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    ) : (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/80" />
    )}
    
    {/* Overlay for darkening and edit button */}
    <div className="absolute inset-0 bg-black/15" />
    
    <BannerEditDialog 
      currentProfile={profile}
      onProfileUpdated={onProfileUpdated}
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white z-10"
      >
        <Camera className="h-4 w-4 mr-1" />
        Edit Cover
      </Button>
    </BannerEditDialog>
  </div>
);

export default ProfileBanner;
