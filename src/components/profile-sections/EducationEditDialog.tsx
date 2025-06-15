
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/dataService';
import { useToast } from '@/hooks/use-toast';

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

interface EducationEditDialogProps {
  children: React.ReactNode;
  currentProfile?: any;
  onProfileUpdated?: () => void;
}

const EducationEditDialog = ({ children, currentProfile, onProfileUpdated }: EducationEditDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [education, setEducation] = useState<Education[]>(currentProfile?.education || []);
  const [newEducation, setNewEducation] = useState<Education>({
    degree: '',
    institution: '',
    year: '',
    description: ''
  });

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim() && newEducation.year.trim()) {
      setEducation([...education, { ...newEducation }]);
      setNewEducation({ degree: '', institution: '', year: '', description: '' });
    }
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await profileService.updateProfile(user.id, { education });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Education updated successfully!'
      });

      setOpen(false);
      onProfileUpdated?.();
    } catch (error) {
      console.error('Error updating education:', error);
      toast({
        title: 'Error',
        description: 'Failed to update education. Please try again.',
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
          <DialogTitle>Edit Education & Training</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 p-4 border rounded-md">
            <Label className="text-base font-semibold">Add New Education</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="degree">Degree/Certification</Label>
                <Input
                  id="degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="e.g., Bachelor of Civil Engineering"
                />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="e.g., University of Nairobi"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="year">Year/Duration</Label>
              <Input
                id="year"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                placeholder="e.g., 2015-2019 or 2020"
              />
            </div>
            <div>
              <Label htmlFor="edu-description">Description (Optional)</Label>
              <Textarea
                id="edu-description"
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                placeholder="Relevant coursework, achievements, or specializations..."
                rows={3}
              />
            </div>
            <Button 
              type="button" 
              onClick={addEducation} 
              variant="outline" 
              className="w-full"
              disabled={!newEducation.degree.trim() || !newEducation.institution.trim() || !newEducation.year.trim()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Your Education</Label>
            <div className="space-y-3 min-h-[100px]">
              {education.length > 0 ? (
                education.map((edu, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                        {edu.description && (
                          <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm p-3 border rounded-md">No education added yet. Add some education above.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Education'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationEditDialog;
