
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface SkillsEditDialogProps {
  children: React.ReactNode;
  currentProfile?: any;
  onProfileUpdated?: () => void;
}

const SkillsEditDialog = ({ children, currentProfile, onProfileUpdated }: SkillsEditDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(currentProfile?.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await profileService.updateProfile(user.id, { skills });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Skills updated successfully!'
      });

      setOpen(false);
      onProfileUpdated?.();
    } catch (error) {
      console.error('Error updating skills:', error);
      toast({
        title: 'Error',
        description: 'Failed to update skills. Please try again.',
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
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Skills & Specialization</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Add Skills</Label>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., AutoCAD, Project Management"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2 min-h-[100px] p-3 border rounded-md">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{skill}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet. Add some skills above.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Skills'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillsEditDialog;
