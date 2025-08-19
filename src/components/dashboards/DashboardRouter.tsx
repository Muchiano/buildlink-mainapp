import { useProfile } from "@/hooks/useProfile";
import StudentDashboard from "./StudentDashboard";
import GraduateDashboard from "./GraduateDashboard";
import ProfessionalDashboard from "./ProfessionalDashboard";
import CompanyDashboard from "./CompanyDashboard";

const DashboardRouter = () => {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Profile not found</h3>
        <p className="text-gray-500">Unable to load profile data</p>
      </div>
    );
  }

  // Route to appropriate dashboard based on user type
  switch (profile.user_type) {
    case "student":
      return <StudentDashboard />;
    case "graduate":
      return <GraduateDashboard />;
    case "professional":
      return <ProfessionalDashboard />;
    case "company":
      return <CompanyDashboard />;
    default:
      return <StudentDashboard />; // Default fallback
  }
};

export default DashboardRouter;