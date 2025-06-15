
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import SkillsEditDialog from "@/components/profile-sections/SkillsEditDialog";
import { convertAndSanitizeSkills, getLevelText } from "@/lib/skillUtils";

interface SkillsSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const SkillsSection = ({ profile, handleProfileUpdate }: SkillsSectionProps) => {
  const renderSkillsContent = () => {
    if (!profile.skills || profile.skills.length === 0) {
      return (
        <div className="text-gray-500 italic py-4">
          No skills added yet. Click edit to showcase your expertise and specializations.
        </div>
      );
    }

    const sanitizedSkills = convertAndSanitizeSkills(profile.skills);

    return (
      <div className="space-y-4">
        {sanitizedSkills.map((skill, index) => {
          return (
            <div key={index} className="flex items-center justify-between space-x-4 animate-fade-in">
              <span className="text-gray-900 font-medium flex-1 truncate">{skill.name}</span>
              <div className="flex items-center space-x-1.5" title={`${skill.level}/5 - ${getLevelText(skill.level)}`}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full ${
                      level <= skill.level ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
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
  );
};

export default SkillsSection;
