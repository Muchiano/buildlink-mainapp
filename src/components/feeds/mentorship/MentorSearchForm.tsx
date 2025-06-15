
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

interface MentorSearchFormProps {
  selectedField: string;
  setSelectedField: (value: string) => void;
  selectedExperience: string;
  setSelectedExperience: (value: string) => void;
  handleFindMentors: () => void;
  handleBecomeMentor: () => void;
}

const MentorSearchForm = ({
  selectedField,
  setSelectedField,
  selectedExperience,
  setSelectedExperience,
  handleFindMentors,
  handleBecomeMentor,
}: MentorSearchFormProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-primary">Find Your Perfect Mentor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">Select your field of interest</option>
            <option value="Structural Design">Structural Design</option>
            <option value="Project Management">Project Management</option>
            <option value="Code Compliance">Code Compliance</option>
            <option value="Sustainable Design">Sustainable Design</option>
            <option value="Urban Planning">Urban Planning</option>
            <option value="BIM">BIM</option>
            <option value="Cost Estimation">Cost Estimation</option>
            <option value="Contract Administration">Contract Administration</option>
            <option value="Risk Management">Risk Management</option>
          </select>
          <select
            className="w-full p-3 border rounded-lg"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">Experience level</option>
            <option value="Student">Student</option>
            <option value="Fresh Graduate">Fresh Graduate</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
          </select>
          <div className="flex space-x-3">
            <Button
              className="flex-1 bg-primary hover:bg-primary-800"
              onClick={handleFindMentors}
            >
              <Search className="h-4 w-4 mr-2" />
              Find Mentors
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
              onClick={handleBecomeMentor}
            >
              <Plus className="h-4 w-4 mr-2" />
              Become a Mentor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorSearchForm;
