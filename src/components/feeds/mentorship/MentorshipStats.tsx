
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { mentorshipService } from "@/services/mentorshipService";
import { Skeleton } from "@/components/ui/skeleton";

const MentorshipStats = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['mentorshipStats'],
    queryFn: mentorshipService.getStats
  });

  const formatMenteesMatched = (count: number | undefined) => {
    if (count === undefined) return '0';
    if (count > 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="text-center border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">
            {isLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : `${statsData?.data?.mentorsCount ?? 0}+`}
          </div>
          <div className="text-xs text-gray-600">Active Mentors</div>
        </CardContent>
      </Card>
      <Card className="text-center border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-primary">
            {isLoading ? <Skeleton className="h-8 w-16 mx-auto" /> : formatMenteesMatched(statsData?.data?.menteesMatchedCount)}
          </div>
          <div className="text-xs text-gray-600">Mentees Matched</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorshipStats;
