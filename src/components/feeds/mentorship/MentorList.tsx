
import MentorItem, { Mentor } from "./MentorItem";

interface MentorListProps {
  mentors: Mentor[];
  title: string;
}

const MentorList = ({ mentors, title }: MentorListProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
      <div className="space-y-4">
        {mentors.map((mentor) => (
          <MentorItem key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorList;
