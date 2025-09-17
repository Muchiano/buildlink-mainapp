import { Award, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { skillsService } from "@/services/skillsService";
import { Skeleton } from "@/components/ui/skeleton";

const SkillUpHeader = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['skillUpStats'],
    queryFn: skillsService.getStats
  });

  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">Resource Hub</h2>
      <p className="text-primary-100 mb-4">Certified Professional Development from trusted industry bodies</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <BookOpen className="h-6 w-6 mx-auto mb-2" />
          <div className="text-lg font-bold">
            {isLoading ? <Skeleton className="h-6 w-12 mx-auto bg-white/20" /> : `${statsData?.data?.coursesCount ?? 0}+`}
          </div>
          <div className="text-xs">Courses Available</div>
        </div>
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Award className="h-6 w-6 mx-auto mb-2" />
          <div className="text-lg font-bold">500+</div>
          <div className="text-xs">CPD Points Earned</div>
        </div>
      </div>
    </div>
  );
};

export default SkillUpHeader;
