
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

interface EducationFormFieldsProps {
  education: Education;
  onChange: (edu: Education) => void;
  idPrefix: string;
  showLabels?: boolean;
  disabled?: boolean;
}

const EducationFormFields = ({
  education,
  onChange,
  idPrefix,
  showLabels = true,
  disabled = false,
}: EducationFormFieldsProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          {showLabels && <Label htmlFor={`${idPrefix}-degree`}>Degree/Certification</Label>}
          <Input
            id={`${idPrefix}-degree`}
            value={education.degree}
            onChange={(e) => onChange({ ...education, degree: e.target.value })}
            placeholder="e.g., Bachelor of Civil Engineering"
            disabled={disabled}
          />
        </div>
        <div>
          {showLabels && <Label htmlFor={`${idPrefix}-institution`}>Institution</Label>}
          <Input
            id={`${idPrefix}-institution`}
            value={education.institution}
            onChange={(e) => onChange({ ...education, institution: e.target.value })}
            placeholder="e.g., University of Nairobi"
            disabled={disabled}
          />
        </div>
      </div>
      <div>
        {showLabels && <Label htmlFor={`${idPrefix}-year`}>Year/Duration</Label>}
        <Input
          id={`${idPrefix}-year`}
          value={education.year}
          onChange={(e) => onChange({ ...education, year: e.target.value })}
          placeholder="e.g., 2015-2019 or 2020"
          disabled={disabled}
        />
      </div>
      <div>
        {showLabels && (
          <Label htmlFor={`${idPrefix}-description`}>Description (Optional)</Label>
        )}
        <Textarea
          id={`${idPrefix}-description`}
          value={education.description}
          onChange={(e) => onChange({ ...education, description: e.target.value })}
          placeholder="Relevant coursework, achievements, or specializations..."
          rows={3}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EducationFormFields;
