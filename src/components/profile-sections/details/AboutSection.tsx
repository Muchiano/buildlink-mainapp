
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AboutEditDialog from "@/components/profile-sections/AboutEditDialog";

interface AboutSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const AboutSection = ({ profile, handleProfileUpdate }: AboutSectionProps) => {
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

  return (
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
  );
};

export default AboutSection;
