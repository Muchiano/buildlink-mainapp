
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit } from "lucide-react";
import SkillsEditDialog from "@/components/profile-sections/SkillsEditDialog";

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

    return (
      <div className="space-y-4">
        {profile.skills.map((skill: any, index: number) => {
          let skillName = typeof skill === 'string' ? skill : skill.name;
          let skillLevel = typeof skill === 'string' ? 3 : (skill.level || 3);
          
          if (typeof skillName === 'string' && skillName.startsWith('{')) {
            try {
              const parsedName = JSON.parse(skillName);
              if (parsedName && typeof parsedName === 'object' && parsedName.name) {
                skillName = parsedName.name;
                skillLevel = parsedName.level || skillLevel;
              }
            } catch (e) {
              // Not a valid JSON, do nothing
            }
          }
          
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
