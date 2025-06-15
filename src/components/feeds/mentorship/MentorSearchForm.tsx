
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
    <Card className="border-0 shadow-sm w-full max-w-full">
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
          {/* Responsive, condensed buttons */}
          <div className="flex flex-row gap-3 w-full">
            <Button
              className="
                flex-1 w-full min-w-0 
                bg-primary hover:bg-primary-800
                flex items-center justify-center
                px-2 py-2
                sm:px-4 sm:py-2
                text-xs sm:text-sm
                font-medium
                space-x-1
              "
              onClick={handleFindMentors}
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              <span className="truncate">Find a Mentor</span>
            </Button>
            <Button
              variant="outline"
              className="
                flex-1 w-full min-w-0 
                border-primary text-primary hover:bg-primary/10 
                flex items-center justify-center
                px-2 py-2 
                sm:px-4 sm:py-2
                text-xs sm:text-sm
                font-medium
                space-x-1
              "
              onClick={handleBecomeMentor}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
              <span className="truncate">Become a Mentor</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorSearchForm;

