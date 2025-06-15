import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Upload, Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import PortfolioThumbnail from "./PortfolioThumbnail";
import PortfolioGallery from "./PortfolioGallery";

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

/**
 * Detect basic file type from extension
 */
function getType(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase();
  if (!ext) return "file";
  if (["jpeg","jpg","png","gif","webp"].includes(ext)) return "image";
  if (["mp4","webm","mov"].includes(ext)) return "video";
  if (["pdf"].includes(ext)) return "pdf";
  if (["doc","docx"].includes(ext)) return "doc";
  if (["ppt","pptx"].includes(ext)) return "ppt";
  if (["xls","xlsx"].includes(ext)) return "sheet";
  return "file";
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ profile, handleProfileUpdate }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [linkURL, setLinkURL] = useState("");
  const [desc, setDesc] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const fileInput = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const portfolioList: PortfolioItem[] =
    Array.isArray(profile.portfolio) ? profile.portfolio : [];

  // Grouped for main + two mini thumbnails
  const mainItem = portfolioList[0];
  const miniItems = portfolioList.slice(1, 3);
  const remainingItems = portfolioList.slice(3);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setError(null);

    const file = files[0];
    const ext = file.name.split(".").pop();
    const filename = `${profile.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    setUploading(true);
    setProgress(50); // Indicate upload started

    const { data, error: uploadError } = await supabase
      .storage
      .from("portfolio")
      .upload(filename, file, {
        upsert: false,
      });
    if (uploadError) {
      setError("Upload failed");
      setUploading(false);
      setProgress(0);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("portfolio").getPublicUrl(filename);
    const url = publicUrlData.publicUrl;
    const item: PortfolioItem = {
      id: Math.random().toString(36).substring(2),
      name: file.name,
      url,
      type: getType(file.name),
      description: desc,
    };
    // Append to portfolio, update profile
    const newPortfolio = [...portfolioList, item];
    await updatePortfolio(newPortfolio);
    setUploading(false);
    setProgress(100); // Show completion
    setOpen(false);
    setDesc("");
    handleProfileUpdate();
  };

  const handleAddLink = async () => {
    if (!linkURL) return;
    const item: PortfolioItem = {
      id: Math.random().toString(36).substring(2),
      name: linkURL,
      url: linkURL,
      type: "link",
      description: desc,
    };
    const newPortfolio = [...portfolioList, item];
    await updatePortfolio(newPortfolio);
    setOpen(false);
    setLinkURL("");
    setDesc("");
    handleProfileUpdate();
  };

  // Remove item
  const handleRemove = async (id: string) => {
    const newPortfolio = portfolioList.filter(p => p.id !== id);
    await updatePortfolio(newPortfolio);
    handleProfileUpdate();
  };

  // Save portfolio array to Supabase
  const updatePortfolio = async (newPortfolio: PortfolioItem[]) => {
    await supabase
      .from("profiles")
      .update({ portfolio: newPortfolio })
      .eq("id", profile.id);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-800">Portfolio</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add to Portfolio</DialogTitle>
                <DialogDescription>
                  Upload a file (project, design, certificate, report...) or add a public link.
                </DialogDescription>
              </DialogHeader>
              <div>
                <label className="block font-medium mb-2">Attach file</label>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,video/*"
                  ref={fileInput}
                  disabled={uploading}
                  className="block"
                  onChange={handleFileUpload}
                />
                {progress > 0 && progress < 99 && <Progress value={progress} className="mt-2" />}
                <div className="text-xs text-gray-500 mt-1 mb-2">Max 50MB. Supported: images, video, PDF, DOCX, PPT, XLS files.</div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">Or link to a project (GitHub, website, Figma...)</label>
                <input
                  type="url"
                  value={linkURL}
                  onChange={e => setLinkURL(e.target.value)}
                  placeholder="https://yourproject.com"
                  className="px-2 py-1 border rounded w-full"
                  disabled={uploading}
                />
              </div>
              <div className="mt-2">
                <label className="block font-medium mb-2">Short description</label>
                <input
                  type="text"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="e.g. Demo video for my landing page"
                  className="px-2 py-1 border rounded w-full"
                />
              </div>
              {error && <div className="text-red-500 mt-2">{error}</div>}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={handleAddLink}
                  type="button"
                  disabled={!linkURL}
                  variant="default"
                >
                  <Link2 className="h-4 w-4 mr-2" /> Add Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {portfolioList.length === 0 ? (
          <div className="text-gray-500 italic">No portfolio items yet. Use the edit button to add.</div>
        ) : (
          <div>
            <div className="flex gap-4">
              {/* Main Thumbnail */}
              {mainItem && (
                <div className="flex flex-col items-center w-32">
                  <div className="w-32 h-40 relative rounded-lg overflow-hidden border shadow cursor-pointer group"
                    onClick={() => setGalleryOpen(true)}
                  >
                    <PortfolioThumbnail
                      type={mainItem.type}
                      url={mainItem.url}
                      name={mainItem.name}
                    />
                    {/* Caption over image */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent px-2 py-1">
                      <span className="text-xs text-white font-semibold">{mainItem.name}</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Two Mini Thumbnails stacked */}
              <div className="flex flex-col gap-3">
                {miniItems.map(item => (
                  <div
                    key={item.id}
                    className="w-32 h-19 rounded-lg overflow-hidden border shadow relative cursor-pointer group"
                    style={{ height: "84px", width: "84px" }}
                    onClick={() => setGalleryOpen(true)}
                  >
                    <PortfolioThumbnail
                      type={item.type}
                      url={item.url}
                      name={item.name}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/55 to-transparent px-1 py-0.5">
                      <span className="text-xs text-white">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse All Button */}
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={() => setGalleryOpen(true)}>
                Browse All Projects
              </Button>
            </div>
          </div>
        )}
        {/* The gallery modal itself */}
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
