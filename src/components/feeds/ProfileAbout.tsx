
import AboutSection from "../profile-sections/details/AboutSection";
import ExperienceSection from "../profile-sections/details/ExperienceSection";
import EducationSection from "../profile-sections/details/EducationSection";
import CertificationsSection from "../profile-sections/details/CertificationsSection";
import InterestsSection from "../profile-sections/details/InterestsSection";
import CompactSkillsSection from "../profile-sections/details/CompactSkillsSection";

interface ProfileAboutProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ProfileAbout = ({ profile, handleProfileUpdate }: ProfileAboutProps) => {
  return (
    <div className="space-y-6">
      <CompactSkillsSection profile={profile} />
      <AboutSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <ExperienceSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <EducationSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <CertificationsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <InterestsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
    </div>
  );
};

export default ProfileAbout;
