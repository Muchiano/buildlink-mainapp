import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';
import AvatarUploader from "./profile-sections/AvatarUploader";
import ProfileFormFields from "./profile-sections/ProfileFormFields";

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ProfileEditForm = ({ isOpen, onClose, onSave }: ProfileEditFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    profession: '',
    organization: '',
    title: '',
    education_level: '',
    avatar: ''
  });
  const [avatarCropDialogOpen, setAvatarCropDialogOpen] = useState(false);
  const [selectedAvatarImage, setSelectedAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
    }
  }, [isOpen, user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await profileService.getProfile(user.id);
      if (error) throw error;
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          profession: data.profession || '',
          organization: data.organization || '',
          title: data.title || '',
          education_level: data.education_level || '',
          avatar: data.avatar || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Replace avatar logic with in-AvatarUploader logic
  const handleAvatarChange = async (croppedFile: File) => {
    if (!user) return;
    setUploading(true);
    try {
      const { data, error } = await profileService.uploadAvatar(user.id, croppedFile);
      if (error) throw error;

      if (data) {
        setProfile(prev => ({ ...prev, avatar: data.avatar || "" }));
        toast({
          title: "Success",
          description: "Avatar uploaded successfully!",
        });
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await profileService.updateProfile(user.id, profile);
      if (error) throw error;
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully!'
      });
      
      onSave();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Avatar Upload */}
            <AvatarUploader
              avatarUrl={profile.avatar}
              fullName={profile.full_name}
              uploading={uploading}
              onAvatarChange={handleAvatarChange}
            />

            {/* Form Fields */}
            <ProfileFormFields
              profile={profile}
              onChange={handleInputChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileEditForm;
