
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import AvatarCropDialog from "./AvatarCropDialog";

interface AvatarUploaderProps {
  avatarUrl: string;
  fullName: string;
  uploading: boolean;
  onAvatarChange: (file: File) => Promise<void>;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
  fullName,
  uploading,
  onAvatarChange,
}) => {
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = async (croppedFile: File) => {
    await onAvatarChange(croppedFile);
    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  const handleCropCancel = () => {
    setCropDialogOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fullName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90">
          <Camera className="h-3 w-3" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      <AvatarCropDialog
        open={cropDialogOpen}
        imageSrc={selectedImage}
        onCancel={handleCropCancel}
        onCropSave={handleCropSave}
        loading={uploading}
      />
    </div>
  );
};

export default AvatarUploader;
