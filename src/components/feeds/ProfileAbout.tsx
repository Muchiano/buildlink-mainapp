
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

interface ProfileAboutProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ProfileAbout = ({ profile, handleProfileUpdate }: ProfileAboutProps) => {
  return (
    <div className="space-y-6">
      {/* Social Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Social Links</h3>
          <SocialLinksEditDialog
            currentLinks={profile.social_links || {}}
            onLinksUpdated={handleProfileUpdate}
            trigger={
              <button className="text-sm text-muted-foreground hover:text-foreground">
                Edit
              </button>
            }
          />
        </div>
        <SocialMediaLinks 
          links={profile.social_links || {}} 
          editable={false}
        />
      </div>
      
      {/* Verification Badges */}
      {profile.verification_badges && profile.verification_badges.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Verification Badges</h3>
          <VerificationBadges badges={profile.verification_badges} />
        </div>
      )}
      
      <AboutSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <PortfolioSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <ExperienceSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <EducationSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <CompactSkillsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <CertificationsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <InterestsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
    </div>
  );
};

export default ProfileAbout;
