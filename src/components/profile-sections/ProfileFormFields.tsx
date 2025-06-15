
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface ProfileFormFieldsProps {
  profile: {
    full_name: string;
    profession: string;
    organization: string;
    title: string;
    education_level: string;
  };
  onChange: (field: string, value: string) => void;
}

const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  profile,
  onChange,
}) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="full_name">Full Name</Label>
      <Input
        id="full_name"
        value={profile.full_name}
        onChange={(e) => onChange("full_name", e.target.value)}
        placeholder="Enter your full name"
      />
    </div>
    <div>
      <Label htmlFor="profession">Profession</Label>
      <Input
        id="profession"
        value={profile.profession}
        onChange={(e) => onChange("profession", e.target.value)}
        placeholder="e.g., Civil Engineer, Architect"
      />
    </div>
    <div>
      <Label htmlFor="title">Job Title</Label>
      <Input
        id="title"
        value={profile.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="e.g., Senior Engineer, Project Manager"
      />
    </div>
    <div>
      <Label htmlFor="organization">Organization</Label>
      <Input
        id="organization"
        value={profile.organization}
        onChange={(e) => onChange("organization", e.target.value)}
        placeholder="Company or organization name"
      />
    </div>
    <div>
      <Label htmlFor="education_level">Education Level</Label>
      <Input
        id="education_level"
        value={profile.education_level}
        onChange={(e) => onChange("education_level", e.target.value)}
        placeholder="e.g., Bachelor's, Master's, PhD"
      />
    </div>
  </div>
);

export default ProfileFormFields;
