import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Link2, Plus, BadgePlus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { getType } from "./getPortfolioFileType";
import { Badge } from "@/components/ui/badge";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
  thumbnailUrl?: string;
};

interface PortfolioEditorDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  portfolioList: PortfolioItem[];
  profileId: string;
  handleProfileUpdate: () => void;
  onPortfolioAdd?: (item: PortfolioItem) => void;
  asIconButton?: boolean;
  disabled?: boolean;
}

const PortfolioEditorDialog: React.FC<PortfolioEditorDialogProps> = ({
  open,
  setOpen,
  portfolioList,
  profileId,
  handleProfileUpdate,
  onPortfolioAdd,
  asIconButton = false,
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [linkURL, setLinkURL] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [thumbnailOption, setThumbnailOption] = useState<"auto" | "upload" | "preset">("auto");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(undefined);

  // Preset thumbnails (can be your selection, or placeholders)
  const presetThumbnails = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // laptop
    "https://images.unsplash.com/photo-1518770660439-4636190af475", // circuit board
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // monitor java
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", // woman on laptop
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // macbook user
  ];

  const updatePortfolio = async (newPortfolio: PortfolioItem[]) => {
    await supabase
      .from("profiles")
      .update({ portfolio: newPortfolio })
      .eq("id", profileId);
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setThumbnailUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `${profileId}/thumbnails/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data, error } = await supabase
      .storage
      .from("portfolio")
      .upload(filename, file, { upsert: false });
    setThumbnailUploading(false);
    if (error || !data) return;
    const { data: publicUrlData } = supabase.storage.from("portfolio").getPublicUrl(filename);
    setThumbnailUrl(publicUrlData.publicUrl);
  };

  // Handle project file upload (main project asset)
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setError(null);

    const file = files[0];
    const ext = file.name.split(".").pop();
    const filename = `${profileId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    setUploading(true);
    setProgress(50);

    const { data, error: uploadError } = await supabase
      .storage
      .from("portfolio")
      .upload(filename, file, { upsert: false });
    if (uploadError) {
      setError("Upload failed");
      setUploading(false);
      setProgress(0);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("portfolio").getPublicUrl(filename);
    const url = publicUrlData.publicUrl;
    let resolvedThumbnailUrl = thumbnailUrl;

    if (thumbnailOption === "auto") {
      // Use main asset as thumbnail if it's an image, otherwise fallback to preset
      if (file.type.startsWith('image/')) {
        resolvedThumbnailUrl = url;
      } else {
        resolvedThumbnailUrl = presetThumbnails[0];
      }
    }
    // Otherwise, use uploaded or selected
    // thumbnailUrl is already set

    const item: PortfolioItem = {
      id: Math.random().toString(36).substring(2),
      name: file.name,
      url,
      type: getType(file.name),
      description: desc,
      thumbnailUrl: resolvedThumbnailUrl,
    };
    const newPortfolio = [...portfolioList, item];
    await updatePortfolio(newPortfolio);
    setUploading(false);
    setProgress(100);
    setOpen(false);
    setDesc("");
    setThumbnailUrl(undefined);
    setThumbnailFile(null);
    setThumbnailOption("auto");
    if (onPortfolioAdd) onPortfolioAdd(item);
    handleProfileUpdate();
  };

  // Adding a link project
  const handleAddLink = async () => {
    if (!linkURL) return;
    let resolvedThumbnailUrl = thumbnailUrl;
    if (thumbnailOption === "auto") {
      resolvedThumbnailUrl = presetThumbnails[0];
    }
    const item: PortfolioItem = {
      id: Math.random().toString(36).substring(2),
      name: linkURL,
      url: linkURL,
      type: "link",
      description: desc,
      thumbnailUrl: resolvedThumbnailUrl,
    };
    const newPortfolio = [...portfolioList, item];
    await updatePortfolio(newPortfolio);
    setOpen(false);
    setLinkURL("");
    setDesc("");
    setThumbnailUrl(undefined);
    setThumbnailFile(null);
    setThumbnailOption("auto");
    if (onPortfolioAdd) onPortfolioAdd(item);
    handleProfileUpdate();
  };

  return (
    <Dialog open={open} onOpenChange={disabled ? () => {} : setOpen}>
      <DialogTrigger asChild>
        {asIconButton ? (
          <Button variant="ghost" size="sm" className="px-2" disabled={disabled} aria-label="Add to Portfolio">
            <Plus className="h-4 w-4" />
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BadgePlus className="h-5 w-5 text-primary" />
            Add New Portfolio Project
          </DialogTitle>
          <DialogDescription>
            Share your best work—upload files or add live project/web links. You can set a custom thumbnail that will show in your gallery.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <label className="block font-semibold mb-1">Attach a File</label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,video/*"
            ref={fileInput}
            disabled={uploading || disabled}
            className="block disabled:opacity-50"
            onChange={handleFileUpload}
          />
          {(progress > 0 && progress < 99) && (
            <Progress value={progress} className="mt-2" />
          )}
          <div className="text-xs text-gray-500 mt-1 mb-2">
            Max 50MB. Supported: images, video, PDF, DOCX, PPT, XLS files.
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">Or link a project</label>
          <input
            type="url"
            value={linkURL}
            onChange={e => setLinkURL(e.target.value)}
            placeholder="https://yourproject.com"
            className="px-2 py-1 border rounded w-full"
            disabled={uploading || disabled}
          />
        </div>
        <div className="mt-3">
          <label className="block font-semibold mb-1">Short description</label>
          <input
            type="text"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="e.g. Demo video for my landing page"
            className="px-2 py-1 border rounded w-full"
            disabled={uploading || disabled}
          />
        </div>
        {/* Thumbnail selection */}
        <div className="mt-6 border-t pt-4">
          <label className="block font-semibold mb-2">Project Thumbnail</label>
          <div className="flex gap-4 items-center mb-2">
            <label className="flex gap-1 items-center">
              <input type="radio" value="auto" checked={thumbnailOption==="auto"} onChange={()=>setThumbnailOption("auto")} />
              <span className="text-sm">Auto</span>
            </label>
            <label className="flex gap-1 items-center">
              <input type="radio" value="preset" checked={thumbnailOption==="preset"} onChange={()=>setThumbnailOption("preset")} />
              <span className="text-sm">Preset</span>
            </label>
            <label className="flex gap-1 items-center">
              <input type="radio" value="upload" checked={thumbnailOption==="upload"} onChange={()=>setThumbnailOption("upload")} />
              <span className="text-sm">Upload</span>
            </label>
          </div>
          {thumbnailOption==="upload" && (
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                disabled={thumbnailUploading}
              />
              {thumbnailUploading && <div className="text-xs text-gray-400">Uploading...</div>}
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Thumbnail" className="h-16 rounded mt-2 border" />
              )}
            </div>
          )}
          {thumbnailOption==="preset" && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {presetThumbnails.map(url => (
                <button
                  key={url}
                  type="button"
                  onClick={()=>{setThumbnailUrl(url);}}
                  className={`border rounded shadow hover:ring-2 focus:ring-2 ${thumbnailUrl===url ? 'ring-2 ring-primary border-primary' : ''}`}
                  style={{padding:2, background:"white", outline:"none"}}
                  tabIndex={0}
                >
                  <img src={url} alt="Preset" className="h-12 w-16 rounded" />
                </button>
              ))}
            </div>
          )}
          {thumbnailOption==="auto" && (
            <div className="text-xs italic text-gray-500">
              Uses the cover image (if uploading an image) or will choose a default preset.
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <DialogFooter className="mt-1">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={uploading || disabled}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleAddLink}
            type="button"
            disabled={!linkURL || uploading || disabled}
            variant="default"
          >
            <Link2 className="h-4 w-4 mr-2" /> Add Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioEditorDialog;
