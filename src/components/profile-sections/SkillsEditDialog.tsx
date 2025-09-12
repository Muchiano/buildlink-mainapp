import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profileService';
import { useToast } from '@/hooks/use-toast';
import { Skill, convertAndSanitizeSkills, getLevelText } from '@/lib/skillUtils';

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
  
  // Convert legacy string skills and sanitize malformed skill objects
  const [skills, setSkills] = useState<Skill[]>(convertAndSanitizeSkills(currentProfile?.skills || []));
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(3);

  const addSkill = () => {
    if (newSkill.trim() && !skills.find(skill => skill.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setSkills([...skills, { name: newSkill.trim(), level: newSkillLevel }]);
      setNewSkill('');
      setNewSkillLevel(3);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill.name !== skillToRemove));
  };

  const updateSkillLevel = (skillName: string, newLevel: number) => {
    setSkills(skills.map(skill => 
      skill.name === skillName ? { ...skill, level: newLevel } : skill
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const targetId = currentProfile?.id || user?.id;
      if (!targetId) throw new Error('No user found');

      // Store as simple string array for clean DB model
      const skillNames = skills.map(s => s.name.trim()).filter(Boolean);
      
      const { error } = await profileService.updateProfile(targetId, { skills: skillNames });

      if (error) throw error;

      toast({ title: 'Success', description: 'Skills updated successfully!' });

      setOpen(false);
      onProfileUpdated?.();
    } catch (error) {
      console.error('Error updating skills:', error);
      toast({ title: 'Error', description: 'Failed to update skills. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if(isOpen) {
        setSkills(convertAndSanitizeSkills(currentProfile?.skills || []));
      }
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skills & Specialization</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Add New Skill</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., AutoCAD, Project Management"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
              </div>
              <div className="flex space-x-2">
                <Select value={newSkillLevel.toString()} onValueChange={(value) => setNewSkillLevel(parseInt(value))}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Beginner</SelectItem>
                    <SelectItem value="2">Intermediate</SelectItem>
                    <SelectItem value="3">Advanced</SelectItem>
                    <SelectItem value="4">Expert</SelectItem>
                    <SelectItem value="5">Master</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addSkill} variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Your Skills ({skills.length})</Label>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border animate-fade-in">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                          onClick={() => removeSkill(skill.name)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => updateSkillLevel(skill.name, level)}
                              className={`w-4 h-4 rounded-full border-2 transition-colors ${
                                level <= skill.level
                                  ? 'bg-primary border-primary'
                                  : 'bg-gray-200 border-gray-300 hover:border-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {getLevelText(skill.level)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {skill.level}/5
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No skills added yet. Add some skills above to showcase your expertise.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
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
