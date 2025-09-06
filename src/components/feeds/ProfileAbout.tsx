
import AboutSection from "../profile-sections/details/AboutSection";
import PortfolioSection from "../profile-sections/details/PortfolioSection";
import ExperienceSection from "../profile-sections/details/ExperienceSection";
import EducationSection from "../profile-sections/details/EducationSection";
import CertificationsSection from "../profile-sections/details/CertificationsSection";
import InterestsSection from "../profile-sections/details/InterestsSection";
import CompactSkillsSection from "../profile-sections/details/CompactSkillsSection";
import ProfileCompletionIndicator from "../profile/ProfileCompletionIndicator";
import SocialMediaLinks from "../profile/SocialMediaLinks";
import SocialLinksEditDialog from "../profile/SocialLinksEditDialog";
import VerificationBadges from "../profile/VerificationBadges";
import AccountTypeDashboard from "../AccountTypeDashboard";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface ProfileAboutProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ProfileAbout = ({ profile, handleProfileUpdate }: ProfileAboutProps) => {
  return (
    <div className="space-y-4">
      {/* Account Type Dashboard - LinkedIn style card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <AccountTypeDashboard profile={profile} />
        </CardContent>
      </Card>
      
      {/* About Section */}
      <AboutSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Experience */}
      <ExperienceSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Education */}
      <EducationSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Skills */}
      <CompactSkillsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Portfolio */}
      <PortfolioSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Certifications */}
      <CertificationsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      
      {/* Additional Info Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Verification Badges */}
          {profile.verification_badges && profile.verification_badges.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Verification Badges</h3>
              <VerificationBadges badges={profile.verification_badges} />
            </div>
          )}
          
          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Contact & Social</h3>
              <SocialLinksEditDialog
                currentLinks={profile.social_links || {}}
                onLinksUpdated={handleProfileUpdate}
                trigger={
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                }
              />
            </div>
            <SocialMediaLinks 
              links={profile.social_links || {}} 
              editable={false}
            />
          </div>
          
          {/* Interests */}
          <InterestsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAbout;
