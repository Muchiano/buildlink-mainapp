
import React from "react";
import { Button } from "@/components/ui/button";

interface BannerRemoveButtonProps {
  removing: boolean;
  uploading: boolean;
  onRemove: () => void;
}

const BannerRemoveButton: React.FC<BannerRemoveButtonProps> = ({
  removing,
  uploading,
  onRemove,
}) => {
  return (
    <Button
      type="button"
      variant="destructive"
      className="mt-2"
      disabled={removing || uploading}
      onClick={onRemove}
    >
      {removing ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      ) : (
        // use lucide-react trash-2 icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      )}
      {removing ? "Removing..." : "Remove Banner"}
    </Button>
  );
};

export default BannerRemoveButton;
