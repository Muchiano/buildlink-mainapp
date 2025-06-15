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
import AvatarCropDialog from "./profile-sections/AvatarCropDialog";

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

  const handleAvatarFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Open crop dialog with preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedAvatarImage(reader.result as string);
      setAvatarCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Callback from AvatarCropDialog after user crops & saves
  const handleAvatarCropped = async (croppedFile: File) => {
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
      setAvatarCropDialogOpen(false);
      setSelectedAvatarImage(null);
    }
  };

  const handleAvatarCropCancel = () => {
    setAvatarCropDialogOpen(false);
    setSelectedAvatarImage(null);
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
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.full_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90">
                  <Camera className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileSelected}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  value={profile.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  placeholder="e.g., Civil Engineer, Architect"
                />
              </div>

              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Engineer, Project Manager"
                />
              </div>

              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={profile.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Company or organization name"
                />
              </div>

              <div>
                <Label htmlFor="education_level">Education Level</Label>
                <Input
                  id="education_level"
                  value={profile.education_level}
                  onChange={(e) => handleInputChange('education_level', e.target.value)}
                  placeholder="e.g., Bachelor's, Master's, PhD"
                />
              </div>
            </div>

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
      <AvatarCropDialog
        open={avatarCropDialogOpen}
        imageSrc={selectedAvatarImage}
        onCancel={handleAvatarCropCancel}
        onCropSave={handleAvatarCropped}
        loading={uploading}
      />
    </>
  );
};

export default ProfileEditForm;
