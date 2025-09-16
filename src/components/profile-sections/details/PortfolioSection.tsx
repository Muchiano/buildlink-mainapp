import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioGallery from "./PortfolioGallery";
import PortfolioEditorDialog from "./PortfolioEditorDialog";
import PortfolioThumbnails from "./PortfolioThumbnails";
import PortfolioThumbnail from "./PortfolioThumbnail";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Loader2,
  BadgePlus,
  Trash2,
  FolderOpen,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MoveRight } from "lucide-react";


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
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    setPortfolioList(Array.isArray(profile.portfolio) ? profile.portfolio : []);
  }, [profile.portfolio]);

  const canEdit = true;

  const handlePortfolioAdd = async (item: PortfolioItem) => {
    // Check PDF limit
    const currentPdfCount = portfolioList.filter(
      (p) => p.type === "pdf"
    ).length;
    if (item.type === "pdf" && currentPdfCount >= 5) {
      toast({
        title: "PDF Limit Reached",
        description: "You can only upload up to 5 PDF files in your portfolio.",
        variant: "destructive",
      });
      return;
    }

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
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">Portfolio</h3>
            <span className="text-sm text-muted-foreground">
              ({portfolioList.length})
            </span>
          </div>
          {canEdit && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setEditorOpen(true)}
              disabled={updating}>
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          )}
        </div>
        {portfolioList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              No projects yet
            </h4>
            <p className="text-muted-foreground mb-6">
              Showcase your work and achievements
            </p>
            {canEdit && (
              <Button
                variant="outline"
                onClick={() => setEditorOpen(true)}
                disabled={updating}>
                <Plus className="h-4 w-4 mr-2" />
                Add your first project
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Enhanced Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioList.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg border border-border transition-all duration-200 cursor-pointer overflow-hidden"
                  onClick={() => {
                    setActiveGalleryIndex(index);
                    setGalleryOpen(true);
                  }}>
                    
                  <div className="p-4">
                    <h4 className="font-semibold py-4">
                      {item.name}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs text-muted-foreground capitalize px-2 py-1 rounded ${
                          item.type === "pdf"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                        {item.type === "pdf" ? "PDF" : item.type}
                      </span>
                      <MoveRight className="h-4 w-4" />
                      {/* {canEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(item.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-all p-1"
                          disabled={updating}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PDF Count Indicator */}
            {portfolioList.filter((item) => item.type === "pdf").length > 0 && (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-red-50 px-3 py-1 rounded-full">
                  <FileText className="h-4 w-4" />
                  {portfolioList.filter((item) => item.type === "pdf").length}/5
                  PDF documents uploaded
                </div>
              </div>
            )}
          </div>
        )}
        <PortfolioGallery
          open={galleryOpen}
          setOpen={setGalleryOpen}
          portfolio={portfolioList}
          activeIndex={activeGalleryIndex}
          setActiveIndex={setActiveGalleryIndex}
          canEdit={canEdit}
          onRemove={handleRemove}
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
