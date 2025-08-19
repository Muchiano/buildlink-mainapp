import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { profileService } from "@/services/profileService";
import { publicProfileService } from "@/services/publicProfileService";
import { postsService } from "@/services/postsService";
import { useToast } from "@/hooks/use-toast";

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadUserData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data: profileData, error: profileError } = await profileService.getProfile(user.id);
      if (profileError) throw profileError;
      setProfile(profileData);

      const { data: postsData, error: postsError } = await postsService.getPosts();
      if (postsError) throw postsError;
      
      const filteredPosts = postsData?.filter(post => post.author_id === user.id) || [];
      setUserPosts(filteredPosts);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  const handleProfileUpdate = () => {
    loadUserData();
    // Update profile completion score
    if (user) {
      publicProfileService.updateProfileCompletion(user.id);
    }
    toast({
      title: 'Success',
      description: 'Profile updated successfully!'
    });
  };

  const handleAvatarChange = async (croppedFile: File) => {
    if (!user) return;
    setUploading(true);
    try {
      const { data, error } = await profileService.uploadAvatar(user.id, croppedFile);
      if (error) throw error;
      if (data) {
        setProfile((prev: any) => ({ ...prev, avatar: data.avatar || "" }));
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

  const handleAvatarRemove = async () => {
    if (!user) return;
    setUploading(true);
    try {
      const updatedProfile = { ...profile, avatar: "" };
      const { error } = await profileService.updateProfile(user.id, updatedProfile);
      if (error) throw error;
      setProfile(updatedProfile);
      toast({
        title: "Photo removed",
        description: "Your profile photo has been removed.",
      });
    } catch (error) {
      console.error("Error removing avatar:", error);
      toast({
        title: "Error",
        description: "Failed to remove profile photo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    profile,
    userPosts,
    loading,
    uploading,
    handleProfileUpdate,
    handleAvatarChange,
    handleAvatarRemove,
  };
};
