
import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Link2, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { getType } from "./getPortfolioFileType";

type PortfolioItem = {
  id: string;
  name: string;
  url: string;
  type: string;
  description?: string;
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
  asIconButton = true,
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [linkURL, setLinkURL] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const updatePortfolio = async (newPortfolio: PortfolioItem[]) => {
    await supabase
      .from("profiles")
      .update({ portfolio: newPortfolio })
      .eq("id", profileId);
  };

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
    const newPortfolio = [...portfolioList, item];
    await updatePortfolio(newPortfolio);
    setUploading(false);
    setProgress(100);
    setOpen(false);
    setDesc("");
    if (onPortfolioAdd) onPortfolioAdd(item);
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
        ) : (
          <Button variant="default" size="sm" disabled={disabled} className="gap-2">
            <Plus className="h-4 w-4" />
            Add to Portfolio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add to Portfolio</DialogTitle>
          <DialogDescription>
            Upload a file or add a public link.
          </DialogDescription>
        </DialogHeader>
        <div>
          <label className="block font-medium mb-2">Attach file</label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,video/*"
            ref={fileInput}
            disabled={uploading || disabled}
            className="block"
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
          <label className="block font-medium mb-2">Or link to a project (GitHub, website, Figma...)</label>
          <input
            type="url"
            value={linkURL}
            onChange={e => setLinkURL(e.target.value)}
            placeholder="https://yourproject.com"
            className="px-2 py-1 border rounded w-full"
            disabled={uploading || disabled}
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
            disabled={uploading || disabled}
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <DialogFooter>
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
