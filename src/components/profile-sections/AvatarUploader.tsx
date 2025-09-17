
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";
import AvatarCropDialog from "./AvatarCropDialog";

interface AvatarUploaderProps {
  avatarUrl: string;
  fullName: string;
  uploading: boolean;
  onAvatarChange: (file: File) => Promise<void>;
  onAvatarRemove?: () => Promise<void>;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
  fullName,
  uploading,
  onAvatarChange,
  onAvatarRemove,
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

  const handleRemovePhoto = async () => {
    if (onAvatarRemove) {
      await onAvatarRemove();
    }
  };

  return (
    <div className="flex flex-col justify-start space-y-2">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{fullName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <label className="absolute bottom-0 left-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90">
          <Camera className="h-3 w-3" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
        {/* Remove Photo button */}
        {avatarUrl && onAvatarRemove && (
          <button
            type="button"
            className="absolute top-0 right-0 bg-destructive text-white rounded-full p-1 hover:bg-destructive/80 transition"
            style={{ transform: 'translate(50%,-50%)' }}
            onClick={handleRemovePhoto}
            disabled={uploading}
            aria-label="Remove profile photo"
            title="Remove profile photo"
          >
            <X className="h-3 w-3" />
          </button>
        )}
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
