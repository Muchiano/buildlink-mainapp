
import MentorList from "./MentorList";
import { Mentor } from "./MentorItem";

interface FeaturedMentorsProps {
    mentors: Mentor[];
}

const FeaturedMentors = ({ mentors }: FeaturedMentorsProps) => {
  return (
    <MentorList mentors={mentors.slice(0, 2)} title="Featured Mentors" />
  );
};

export default FeaturedMentors;
