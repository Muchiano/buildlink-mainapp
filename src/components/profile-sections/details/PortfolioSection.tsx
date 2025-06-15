
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import PortfolioEditorDialog from "./PortfolioEditorDialog";
import PortfolioThumbnails from "./PortfolioThumbnails";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
};

interface PortfolioSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ profile, handleProfileUpdate }) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const portfolioList: PortfolioItem[] = Array.isArray(profile.portfolio) ? profile.portfolio : [];

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Portfolio</h2>
          <PortfolioEditorDialog
            open={editorOpen}
            setOpen={setEditorOpen}
            portfolioList={portfolioList}
            profileId={profile.id}
            handleProfileUpdate={handleProfileUpdate}
          />
        </div>
        {portfolioList.length === 0 ? (
          <div className="text-gray-500 italic">No portfolio items yet. Use the edit button to add.</div>
        ) : (
          <PortfolioThumbnails
            portfolioList={portfolioList}
            onMainThumbnailClick={() => setGalleryOpen(true)}
            onBrowseAllClick={() => setGalleryOpen(true)}
          />
        )}
        <PortfolioGallery
          open={galleryOpen}
          setOpen={setGalleryOpen}
          portfolio={portfolioList}
        />
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
