
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Usage: <ResourceReviewsList resourceId={resource.id} />

interface ResourceReviewsListProps {
  resourceId: string;
}

type Review = {
  id: string;
  user_id: string;
  content: string;
  rating: number;
  created_at: string;
};

export default function ResourceReviewsList({ resourceId }: ResourceReviewsListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["resource-reviews", resourceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resource_reviews")
        .select("*")
        .eq("resource_id", resourceId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!resourceId,
  });

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">Loading reviews...</div>;
  }
  if (error) return <div className="text-red-600 py-4">{error.message}</div>;
  if (!data || data.length === 0)
    return <div className="text-gray-400 py-4 italic">No reviews yet. Be the first!</div>;

  return (
    <div className="space-y-4 mt-2">
      {data.map(review => (
        <div
          key={review.id}
          className="border rounded-lg px-4 py-2 bg-background shadow-sm"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-primary">{getStars(review.rating)}</span>
            <span className="text-xs text-muted-foreground">{formatDate(review.created_at)}</span>
          </div>
          <div className="text-gray-800">{review.content}</div>
        </div>
      ))}
    </div>
  );
}

// Star rendering helper
function getStars(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function formatDate(ts: string) {
  const d = new Date(ts);
  return d.toLocaleDateString();
}
