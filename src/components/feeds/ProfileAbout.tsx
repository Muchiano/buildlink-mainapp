
import AboutSection from "../profile-sections/details/AboutSection";
import SkillsSection from "../profile-sections/details/SkillsSection";
import ExperienceSection from "../profile-sections/details/ExperienceSection";
import EducationSection from "../profile-sections/details/EducationSection";
import CertificationsSection from "../profile-sections/details/CertificationsSection";
import InterestsSection from "../profile-sections/details/InterestsSection";

interface ProfileAboutProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ProfileAbout = ({ profile, handleProfileUpdate }: ProfileAboutProps) => {
  return (
    <div className="space-y-6">
      <AboutSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <SkillsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <ExperienceSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <EducationSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <CertificationsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
      <InterestsSection profile={profile} handleProfileUpdate={handleProfileUpdate} />
    </div>
  );
};

export default ProfileAbout;
