
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Building2, FileText, TrendingUp, MessageCircle, Heart } from "lucide-react";

export default function AdminAnalyticsPage() {
  const { isAdmin } = useIsAdmin();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const [
        { count: professionalsCount },
        { data: profiles },
        { count: companiesCount },
        { data: companies },
        { count: resourcesCount },
        { count: postsCount },
        { count: commentsCount },
        { count: likesCount }
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("id, full_name, user_type, profession, organization, created_at").order("created_at", { ascending: false }),
        supabase.from("profiles").select("organization", { count: "exact", head: true }).not("organization", "is", null).not("organization", "eq", ""),
        supabase.from("profiles").select("organization").not("organization", "is", null).not("organization", "eq", "").order("organization"),
        supabase.from("skill_resources").select("*", { count: "exact", head: true }),
        supabase.from("posts").select("*", { count: "exact", head: true }),
        supabase.from("comments").select("*", { count: "exact", head: true }),
        supabase.from("post_interactions").select("*", { count: "exact", head: true }).eq("type", "like"),
      ]);

      // Extract unique companies
      const uniqueCompanies = Array.from(new Set(companies?.map(c => c.organization).filter(Boolean))) as string[];

      return { 
        professionalsCount, 
        companiesCount: uniqueCompanies.length,
        resourcesCount, 
        postsCount,
        commentsCount,
        likesCount,
        profiles: profiles || [],
        companies: uniqueCompanies
      };
    },
    enabled: isAdmin,
  });

  if (!isAdmin) return <div className="p-8 text-center text-red-600">Admins only.</div>;
  if (isLoading) return <div className="p-8 text-center">Loading analytics...</div>;
  if (error) return <div className="p-8 text-red-600">{error.message}</div>;

  const metrics = [
    { label: "Total Users", value: stats?.professionalsCount, icon: Users },
    { label: "Companies", value: stats?.companiesCount, icon: Building2 },
    { label: "Resources", value: stats?.resourcesCount, icon: FileText },
    { label: "Posts", value: stats?.postsCount, icon: TrendingUp },
    { label: "Comments", value: stats?.commentsCount, icon: MessageCircle },
    { label: "Likes", value: stats?.likesCount, icon: Heart },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold">Platform Analytics</h2>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{m.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-semibold">{m.value ?? 0}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Lists */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-3">
                  {stats?.profiles.map((profile: any) => (
                    <div key={profile.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="space-y-1">
                        <p className="font-medium">{profile.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {profile.profession || "No profession"} • {profile.user_type}
                        </p>
                        {profile.organization && (
                          <p className="text-sm text-muted-foreground">{profile.organization}</p>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
                        Joined {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Registered Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-2">
                  {stats?.companies.map((company: string, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <p className="font-medium">{company}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
