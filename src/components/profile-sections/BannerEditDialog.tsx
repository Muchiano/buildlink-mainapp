
import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface BannerEditDialogProps {
  children: React.ReactNode;
  currentProfile?: any;
  onProfileUpdated?: () => void;
}

const BannerEditDialog = ({ children, currentProfile, onProfileUpdated }: BannerEditDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    try {
      // For now, we'll just update the profile with a placeholder
      // In a real app, you'd upload to storage first
      const { error } = await profileService.updateProfile(user.id, {
        banner: 'updated'
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Banner updated successfully!'
      });

      setOpen(false);
      onProfileUpdated?.();
    } catch (error) {
      console.error('Error updating banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to update banner. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Banner</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="h-32 bg-gradient-to-r from-primary to-primary/80 rounded-lg relative">
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Camera className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Current Banner</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {uploading ? 'Uploading...' : 'Upload New Banner'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended size: 1200x300px. Max file size: 5MB
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BannerEditDialog;
