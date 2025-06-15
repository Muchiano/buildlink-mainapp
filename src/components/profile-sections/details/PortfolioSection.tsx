
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import PortfolioEditorDialog from "./PortfolioEditorDialog";
import PortfolioThumbnails from "./PortfolioThumbnails";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, BadgePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
  thumbnailUrl?: string;
};

interface PortfolioSectionProps {
  profile: any;
  handleProfileUpdate: () => void;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  profile,
  handleProfileUpdate,
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
      variant: "default",
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
      variant: "default",
    });
  };

  if (!portfolioList) return null;

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-4 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Portfolio
            <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500 font-semibold">
              {portfolioList.length} {portfolioList.length === 1 ? 'project' : 'projects'}
            </span>
          </h2>
          {canEdit && (
            <div>
              <Button
                variant="default"
                size="sm"
                className="gap-2 shadow hover-scale"
                onClick={() => setEditorOpen(true)}
                disabled={updating}
                aria-label="Add to Portfolio"
              >
                <BadgePlus className="h-4 w-4" />
                Add New Project
              </Button>
            </div>
          )}
        </div>
        {portfolioList.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center bg-muted rounded-lg">
            <p className="text-gray-500 italic text-lg mb-2">No portfolio items yet</p>
            <p className="text-gray-400 mb-4 text-sm">Showcase your work, websites, or downloadable files here!</p>
            <Button
              variant="default"
              size="lg"
              className="gap-2 w-full max-w-xs shadow hover-scale"
              onClick={() => setEditorOpen(true)}
              disabled={updating}
              aria-label="Add to Portfolio"
            >
              <Plus className="h-5 w-5" />
              Add your first project
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
        <PortfolioEditorDialog
          open={editorOpen}
          setOpen={setEditorOpen}
          portfolioList={portfolioList}
          profileId={profile.id}
          handleProfileUpdate={handleProfileUpdate}
          onPortfolioAdd={handlePortfolioAdd}
          asIconButton={false}
          disabled={updating}
        />
        {updating && (
          <div className="fixed inset-0 bg-black/20 z-40 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white p-4 rounded-lg shadow-lg animate-fade-in">
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving changes...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioSection;
