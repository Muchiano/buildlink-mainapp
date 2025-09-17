
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Professionals", key: "professionalsCount" },
  { label: "Skill Resources", key: "resourcesCount" },
  { label: "Posts", key: "postsCount" },
];

export default function AdminAnalyticsPage() {
  const { isAdmin } = useIsAdmin();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const [{ count: professionalsCount }, { count: resourcesCount }, { count: postsCount }] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("skill_resources").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
      ]);
      return { professionalsCount, resourcesCount, postsCount };
    },
    enabled: isAdmin,
  });

  if (!isAdmin) return <div className="p-8 text-center text-red-600">Admins only.</div>;
  if (isLoading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (error) return <div className="p-8 text-red-600">{error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {metrics.map(m => (
          <Card key={m.key} className="shadow-sm">
            <CardHeader>
              <CardTitle>{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-semibold">{stats && stats[m.key]}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
