import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mentorshipService } from "@/services/mentorshipService";
import { Skeleton } from "../ui/skeleton";
import MentorshipStats from "./mentorship/MentorshipStats";
import MentorSearchForm from "./mentorship/MentorSearchForm";
import BecomeMentorForm from "./mentorship/BecomeMentorForm";
import MentorList from "./mentorship/MentorList";
import FeaturedMentors from "./mentorship/FeaturedMentors";
import { Mentor } from "./mentorship/MentorItem";

const MentorshipHub = () => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showMentors, setShowMentors] = useState(false);
  const [showBecomeMentor, setShowBecomeMentor] = useState(false);

  const { data: mentorsData, isLoading, error } = useQuery({
    queryKey: ['mentors'],
    queryFn: mentorshipService.getMentors
  });

  const mentors: Mentor[] = (mentorsData?.data || []).map((mentor: any) => ({
    id: mentor.user_id,
    name: mentor.profiles?.full_name || 'No name',
    title: mentor.profiles?.title || mentor.profiles?.profession,
    company: mentor.profiles?.organization,
    rating: mentor.rating,
    sessions: mentor.reviews_count || 0,
    specialties: mentor.mentor_expertise.map((e: any) => e.skill),
    bio: mentor.bio,
    price: mentor.hourly_rate ? `KSh ${mentor.hourly_rate}/session` : 'Not specified',
  }));

  const handleFindMentors = () => {
    setShowMentors(true);
    setShowBecomeMentor(false);
  };

  const handleBecomeMentor = () => {
    setShowBecomeMentor(true);
    setShowMentors(false);
  };

  const filteredMentors = mentors.filter(mentor => {
    const fieldMatch = !selectedField || mentor.specialties.some(specialty => 
      specialty.toLowerCase().includes(selectedField.toLowerCase())
    );
    return fieldMatch;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-500 text-center">Could not load mentors. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <MentorshipStats />

      <MentorSearchForm 
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        handleFindMentors={handleFindMentors}
        handleBecomeMentor={handleBecomeMentor}
      />

      {showBecomeMentor && <BecomeMentorForm />}

      {showMentors && (
        <MentorList 
          mentors={filteredMentors} 
          title={`Recommended Mentors ${selectedField ? `for ${selectedField}`: ''}`} 
        />
      )}

      {!showMentors && !showBecomeMentor && (
        <FeaturedMentors mentors={mentors} />
      )}
    </div>
  );
};

export default MentorshipHub;
