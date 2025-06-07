
import { Home, Users, Plus, BookOpen, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  const items = [
    {
      id: "home",
      title: "Home Feed",
      icon: Home,
    },
    {
      id: "mentorship",
      title: "Mentorship Hub",
      icon: Users,
    },
    {
      id: "post",
      title: "Post/Create",
      icon: Plus,
    },
    {
      id: "skillup",
      title: "Skill Up",
      icon: BookOpen,
    },
    {
      id: "profile",
      title: "Profile Board",
      icon: User,
    },
  ];

  return (
    <Sidebar className="fixed left-0 top-0 h-full z-30 w-64">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
