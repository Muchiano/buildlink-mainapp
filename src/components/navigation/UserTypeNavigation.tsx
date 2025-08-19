import { useProfile } from "@/hooks/useProfile";
import { 
  Home, 
  Users, 
  Plus, 
  BookOpen, 
  User,
  Briefcase,
  GraduationCap,
  Target,
  Building2,
  UserPlus,
  BarChart3,
  Award
} from "lucide-react";

export const useUserTypeNavigation = () => {
  const { profile } = useProfile();
  
  const getNavigationItems = () => {
    const baseItems = [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: Home,
      },
      {
        id: "post",
        title: "Create Post",
        icon: Plus,
      },
      {
        id: "profile",
        title: "Profile",
        icon: User,
      },
    ];

    switch (profile?.user_type) {
      case "student":
        return [
          ...baseItems.slice(0, 1), // Dashboard
          {
            id: "courses",
            title: "My Courses",
            icon: BookOpen,
          },
          {
            id: "study-groups",
            title: "Study Groups",
            icon: Users,
          },
          {
            id: "assignments",
            title: "Assignments",
            icon: Target,
          },
          ...baseItems.slice(1), // Post, Profile
        ];
      
      case "graduate":
        return [
          ...baseItems.slice(0, 1), // Dashboard
          {
            id: "job-search",
            title: "Job Search",
            icon: Briefcase,
          },
          {
            id: "skill-development",
            title: "Skill Development",
            icon: GraduationCap,
          },
          {
            id: "alumni-network",
            title: "Alumni Network",
            icon: Users,
          },
          ...baseItems.slice(1), // Post, Profile
        ];
      
      case "professional":
        return [
          ...baseItems.slice(0, 1), // Dashboard
          {
            id: "mentorship",
            title: "Mentorship",
            icon: Users,
          },
          {
            id: "thought-leadership",
            title: "Content Hub",
            icon: BookOpen,
          },
          {
            id: "networking",
            title: "Industry Events",
            icon: Award,
          },
          ...baseItems.slice(1), // Post, Profile
        ];
      
      case "company":
        return [
          ...baseItems.slice(0, 1), // Dashboard
          {
            id: "recruitment",
            title: "Talent Acquisition",
            icon: UserPlus,
          },
          {
            id: "employee-development",
            title: "Team Development",
            icon: Award,
          },
          {
            id: "analytics",
            title: "Company Analytics",
            icon: BarChart3,
          },
          {
            id: "branding",
            title: "Company Profile",
            icon: Building2,
          },
          ...baseItems.slice(1, 2), // Post only
          ...baseItems.slice(2), // Profile
        ];
      
      default:
        return baseItems;
    }
  };

  return { navigationItems: getNavigationItems() };
};