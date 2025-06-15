
import { Card, CardContent } from "@/components/ui/card";

const MentorshipStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="text-center border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">150+</div>
          <div className="text-xs text-gray-600">Active Mentors</div>
        </CardContent>
      </Card>
      <Card className="text-center border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">1.2K</div>
          <div className="text-xs text-gray-600">Mentees Matched</div>
        </CardContent>
      </Card>
      <Card className="text-center border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">95%</div>
          <div className="text-xs text-gray-600">Success Rate</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorshipStats;
