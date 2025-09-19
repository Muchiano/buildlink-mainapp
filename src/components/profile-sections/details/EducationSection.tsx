
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, GraduationCap } from "lucide-react";
import EducationEditDialog from "@/components/profile-sections/EducationEditDialog";

interface EducationSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const EducationSection = ({ profile, handleProfileUpdate }: EducationSectionProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="py-4 px-4 shadow-md">
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
  );
};

export default EducationSection;
