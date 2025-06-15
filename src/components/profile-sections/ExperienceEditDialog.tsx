
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface ExperienceEditDialogProps {
  children: React.ReactNode;
  currentProfile?: any;
  onProfileUpdated?: () => void;
}

const ExperienceEditDialog = ({ children, currentProfile, onProfileUpdated }: ExperienceEditDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize experiences from currentProfile
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState<Experience>({
    title: '',
    company: '',
    duration: '',
    description: ''
  });

  // Update experiences when dialog opens or currentProfile changes
  React.useEffect(() => {
    if (open && currentProfile?.experiences) {
      setExperiences(currentProfile.experiences || []);
    }
  }, [open, currentProfile]);

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.company.trim() && newExperience.duration.trim()) {
      setExperiences([...experiences, { ...newExperience }]);
      setNewExperience({ title: '', company: '', duration: '', description: '' });
    }
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      console.log('Updating experiences:', experiences);
      
      const { error } = await profileService.updateProfile(user.id, { 
        experiences: experiences 
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Experience updated successfully!'
      });

      setOpen(false);
      onProfileUpdated?.();
    } catch (error) {
      console.error('Error updating experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to update experience. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Professional Experience</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 p-4 border rounded-md">
            <Label className="text-base font-semibold">Add New Experience</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                  placeholder="e.g., Senior Civil Engineer"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="e.g., ABC Construction Ltd"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Describe your key responsibilities and achievements..."
                rows={3}
              />
            </div>
            <Button 
              type="button" 
              onClick={addExperience} 
              variant="outline" 
              className="w-full"
              disabled={!newExperience.title.trim() || !newExperience.company.trim() || !newExperience.duration.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Your Experience</Label>
            <div className="space-y-3 min-h-[100px]">
              {experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                        {exp.description && (
                          <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm p-3 border rounded-md">No experience added yet. Add some experience above.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Experience'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceEditDialog;
