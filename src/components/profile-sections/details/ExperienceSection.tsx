
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Briefcase } from "lucide-react";
import ExperienceEditDialog from "@/components/profile-sections/ExperienceEditDialog";

interface ExperienceSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const ExperienceSection = ({ profile, handleProfileUpdate }: ExperienceSectionProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="py-6 px-0">
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
  );
};

export default ExperienceSection;
