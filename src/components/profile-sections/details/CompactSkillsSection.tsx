
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
  const [open, setOpen] = React.useState(false);

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Skills</h2>
          <SkillsEditDialog
            currentProfile={profile}
            onProfileUpdated={() => {
              setOpen(false);
              handleProfileUpdate?.();
            }}
            open={open}
            onOpenChange={setOpen}
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
        <div className="space-y-4">
          {skills.length === 0 ? (
            <div className="text-gray-500 italic">No skills added yet.</div>
          ) : (
            skills.slice(0, 6).map((skill, idx) => (
              <div key={idx} className="flex items-center space-x-3 animate-fade-in">
                <span className="w-32 text-gray-700 truncate">{skill.name}</span>
                <div className="flex-1 flex items-center">
                  <Progress
                    className="h-2 bg-secondary border rounded-full"
                    value={levelToPercent(skill.level)}
                  />
                </div>
                <Badge variant="outline" className="ml-2 min-w-10 text-xs text-gray-600 bg-muted">
                  {skill.level}/5
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactSkillsSection;

