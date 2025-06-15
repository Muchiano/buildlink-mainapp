
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface ExperienceListProps {
  experiences: Experience[];
  editingIndex: number | null;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderEditing: (index: number) => React.ReactNode;
}

const ExperienceList = ({
  experiences,
  editingIndex,
  onEdit,
  onDelete,
  renderEditing,
}: ExperienceListProps) => {
  return (
    <div className="space-y-3 min-h-[100px]">
      {experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={index} className="p-3 border rounded-md">
            {editingIndex === index ? (
              renderEditing(index)
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm p-3 border rounded-md">
          No experience added yet. Add some experience above.
        </p>
      )}
    </div>
  );
};

export default ExperienceList;
