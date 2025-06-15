
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { convertAndSanitizeSkills } from "@/lib/skillUtils";
import { Badge } from "@/components/ui/badge";

interface CompactSkillsSectionProps {
  profile: any;
}

const levelToPercent = (level: number): number => {
  // Level 1: 20%, Level 2: 40%, ..., Level 5: 100%
  return Math.max(1, Math.min(5, level)) * 20;
};

const CompactSkillsSection = ({ profile }: CompactSkillsSectionProps) => {
  const skills = convertAndSanitizeSkills(profile?.skills || []);

  if (!skills.length) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="px-6 py-4">
          <div className="text-gray-500 italic">No skills added yet.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-6 py-4">
        <h2 className="text-base font-semibold mb-3 text-gray-800">Skills</h2>
        <div className="space-y-4">
          {skills.slice(0, 6).map((skill, idx) => (
            <div key={idx} className="flex items-center space-x-3 animate-fade-in">
              <span className="w-32 text-gray-700 truncate">{skill.name}</span>
              <div className="flex-1 flex items-center">
                <Progress
                  className="h-2 bg-secondary border rounded-full"
                  value={levelToPercent(skill.level)}
                />
              </div>
              <Badge variant="outline" className="ml-2 min-w-10 text-xs text-gray-600 bg-muted">{skill.level}/5</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactSkillsSection;
