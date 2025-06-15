import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit, Briefcase, GraduationCap, Award } from "lucide-react";
import AboutEditDialog from "../profile-sections/AboutEditDialog";
import SkillsEditDialog from "../profile-sections/SkillsEditDialog";
import ExperienceEditDialog from "../profile-sections/ExperienceEditDialog";
import EducationEditDialog from "../profile-sections/EducationEditDialog";
import CertificationsEditDialog from "../profile-sections/CertificationsEditDialog";
import InterestsEditDialog from "../profile-sections/InterestsEditDialog";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ProfileAboutProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ProfileAbout = ({ profile, handleProfileUpdate }: ProfileAboutProps) => {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const renderAboutContent = () => {
    if (!profile.bio) {
      return (
        <div className="text-gray-500 italic">
          No professional summary available yet. Click edit to add your story and let others know about your journey, expertise, and career aspirations.
        </div>
      );
    }

    const characterLimit = 220;
    const shouldTruncate = profile.bio.length > characterLimit;
    const displayText = isAboutExpanded || !shouldTruncate 
      ? profile.bio 
      : profile.bio.substring(0, characterLimit) + '...';

    return (
      <div className="space-y-3">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
          {displayText}
        </div>
        {shouldTruncate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAboutExpanded(!isAboutExpanded)}
            className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
          >
            {isAboutExpanded ? 'Show less' : 'Read more'}
          </Button>
        )}
      </div>
    );
  };

  const renderSkillsContent = () => {
    if (!profile.skills || profile.skills.length === 0) {
      return (
        <div className="text-gray-500 italic py-4">
          No skills added yet. Click edit to showcase your expertise and specializations.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {profile.skills.map((skill: any, index: number) => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          const skillLevel = typeof skill === 'string' ? 3 : (skill.level || 3);
          
          return (
            <div key={index} className="flex items-center justify-between space-x-4">
              <span className="text-gray-900 font-medium flex-1 truncate">{skillName}</span>
              <Progress value={(skillLevel / 5) * 100} className="w-1/3 h-2" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* About Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">About</h2>
            <AboutEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </AboutEditDialog>
          </div>
          <div className="prose prose-gray max-w-none">
            {renderAboutContent()}
          </div>
        </CardContent>
      </Card>
      {/* Skills & Specialization */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Skills & Specialization</h2>
              <p className="text-sm text-gray-500">Showcase your expertise and experience levels</p>
            </div>
            <SkillsEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </SkillsEditDialog>
          </div>
          {renderSkillsContent()}
        </CardContent>
      </Card>
      {/* Professional Experience */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Professional Experience</h2>
            <ExperienceEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </ExperienceEditDialog>
          </div>
          <div className="space-y-4">
            {profile.experiences?.length > 0 ? (
              profile.experiences.map((exp: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience added yet. Click edit to add your work experience.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Education & Training */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Education & Training</h2>
            <EducationEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </EducationEditDialog>
          </div>
          <div className="space-y-4">
            {profile.education?.length > 0 ? (
              profile.education.map((edu: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet. Click edit to add your educational background.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Certifications */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Certifications</h2>
            <CertificationsEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CertificationsEditDialog>
          </div>
          <div className="space-y-4">
            {profile.certifications?.length > 0 ? (
              profile.certifications.map((cert: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                    {cert.credential_id && (
                      <p className="text-xs text-gray-500">Credential ID: {cert.credential_id}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No certifications added yet. Click edit to add your certifications.</p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Interests */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Interests</h2>
            <InterestsEditDialog 
              currentProfile={profile}
              onProfileUpdated={handleProfileUpdate}
            >
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </InterestsEditDialog>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests?.length > 0 ? (
              profile.interests.map((interest: string, index: number) => (
                <Badge key={index} variant="outline">{interest}</Badge>
              ))
            ) : (
              <p className="text-gray-500">No interests added yet. Click edit to add your interests.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAbout;
