
import React from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Crop } from "lucide-react";

interface BannerCropperProps {
  selectedImage: string;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (_croppedArea: any, croppedAreaPixels: any) => void;
  uploading: boolean;
  onCancel: () => void;
  onSave: () => void;
  aspect: number;
}

const BannerCropper: React.FC<BannerCropperProps> = ({
  selectedImage,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  uploading,
  onCancel,
  onSave,
  aspect,
}) => {
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: `${aspect} / 1` }}>
        <Cropper
          image={selectedImage}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
          cropShape="rect"
          showGrid={false}
        />
      </div>
      <div className="w-full flex items-center gap-4">
        <span className="text-xs text-muted-foreground">Zoom:</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={e => onZoomChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex justify-end gap-2 w-full">
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
          Cancel
        </Button>
        <Button type="button" onClick={onSave} disabled={uploading} className="flex items-center gap-2">
          {uploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Crop className="h-4 w-4" />
          )}
          {uploading ? 'Uploading...' : 'Save & Upload'}
        </Button>
      </div>
    </div>
  );
};

export default BannerCropper;
