
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import PortfolioEditorDialog from "./PortfolioEditorDialog";
import PortfolioThumbnails from "./PortfolioThumbnails";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  profile,
  handleProfileUpdate
}) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setPortfolioList(Array.isArray(profile.portfolio) ? profile.portfolio : []);
  }, [profile.portfolio]);

  const canEdit = true;

  // Add (with UI feedback)
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
    toast({
      title: "Portfolio updated",
      description: "Your new project was added.",
      variant: "default"
    });
  };

  // Remove (with UI feedback)
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
    toast({
      title: "Removed",
      description: "The project has been removed.",
      variant: "default"
    });
  };

  if (!portfolioList) return null;

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">
            Portfolio
          </h2>
          {canEdit && (
            <PortfolioEditorDialog
              open={editorOpen}
              setOpen={setEditorOpen}
              portfolioList={portfolioList}
              profileId={profile.id}
              handleProfileUpdate={handleProfileUpdate}
              onPortfolioAdd={handlePortfolioAdd}
              asIconButton={!updating}
              disabled={updating}
            />
          )}
        </div>
        {portfolioList.length === 0 ? (
          <div className="text-center py-10 flex flex-col items-center">
            <p className="text-gray-500 italic mb-4">No portfolio items yet.</p>
            <Button
              variant="default"
              size="sm"
              className="gap-1"
              onClick={() => setEditorOpen(true)}
              disabled={updating}
            >
              <Plus className="w-4 h-4" />
              Add to Portfolio
            </Button>
          </div>
        ) : (
          <div>
            <PortfolioThumbnails
              portfolioList={portfolioList}
              onMainThumbnailClick={() => setGalleryOpen(true)}
              onBrowseAllClick={() => setGalleryOpen(true)}
              updating={updating}
            />
          </div>
        )}
        <PortfolioGallery
          open={galleryOpen}
          setOpen={setGalleryOpen}
          portfolio={portfolioList}
          canEdit={canEdit}
          onRemove={updating ? undefined : handleRemove}
          updating={updating}
        />
        {updating && (
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving changes...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
