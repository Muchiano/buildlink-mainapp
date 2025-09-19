
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { convertAndSanitizeSkills } from "@/lib/skillUtils";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import SkillsEditDialog from "@/components/profile-sections/SkillsEditDialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface CompactSkillsSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const levelToPercent = (level: number): number => {
  // Level 1: 20%, Level 2: 40%, ..., Level 5: 100%
  return Math.max(1, Math.min(5, level)) * 20;
};

const CompactSkillsSection = ({
  profile,
  handleProfileUpdate,
}: CompactSkillsSectionProps) => {
  const skills = convertAndSanitizeSkills(profile?.skills || []);

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="py-4 px-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Skills</h2>
          <SkillsEditDialog
            currentProfile={profile}
            onProfileUpdated={handleProfileUpdate}
          >
            <Button
              variant="ghost"
              size="sm"
              className="px-2"
              aria-label="Edit skills"
              type="button"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </SkillsEditDialog>
        </div>
        <div className="space-y-3">
          {skills.length === 0 ? (
            <div className="text-gray-500 italic">No skills added yet.</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactSkillsSection;

