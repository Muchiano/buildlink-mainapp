
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import InterestsEditDialog from "@/components/profile-sections/InterestsEditDialog";

interface InterestsSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const InterestsSection = ({ profile, handleProfileUpdate }: InterestsSectionProps) => {
  return (
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
  );
};

export default InterestsSection;
