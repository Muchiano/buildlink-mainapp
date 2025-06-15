
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Award } from "lucide-react";
import CertificationsEditDialog from "@/components/profile-sections/CertificationsEditDialog";

interface CertificationsSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const CertificationsSection = ({ profile, handleProfileUpdate }: CertificationsSectionProps) => {
  return (
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
  );
};

export default CertificationsSection;
