
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import PortfolioEditorDialog from "./PortfolioEditorDialog";
import PortfolioThumbnails from "./PortfolioThumbnails";
import { supabase } from "@/integrations/supabase/client";

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
  const [updating, setUpdating] = useState(false);

  // Local portfolio state for instant UI update
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setPortfolioList(Array.isArray(profile.portfolio) ? profile.portfolio : []);
  }, [profile.portfolio]);

  const canEdit = true; // Assume current user is owner (customize logic here if needed)

  // When a new portfolio item is added
  const handlePortfolioAdd = async (item: PortfolioItem) => {
    setUpdating(true);
    const newPortfolio = [...portfolioList, item];
    setPortfolioList(newPortfolio);
    await supabase
      .from("profiles")
      .update({ portfolio: newPortfolio })
      .eq("id", profile.id);
    setUpdating(false);
    handleProfileUpdate();
  };

  // When an item is removed
  const handleRemove = async (id: string) => {
    setUpdating(true);
    const newPortfolio = portfolioList.filter((item) => item.id !== id);
    setPortfolioList(newPortfolio);
    await supabase
      .from("profiles")
      .update({ portfolio: newPortfolio })
      .eq("id", profile.id);
    setUpdating(false);
    handleProfileUpdate();
  };

  if (!portfolioList) return null;

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
            onPortfolioAdd={handlePortfolioAdd}
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
          canEdit={canEdit}
          onRemove={handleRemove}
        />
        {updating && <div className="text-xs text-gray-400 mt-2">Updating...</div>}
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
