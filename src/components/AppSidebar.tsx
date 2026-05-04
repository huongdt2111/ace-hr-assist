import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, Network, ClipboardList,
  AlertTriangle, Users, PlusSquare, Shield,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Tổng quan", url: "/", icon: LayoutDashboard },
  { title: "Nhập task", url: "/task-input", icon: PlusSquare, badge: "AI" },
];

const hrItems = [
  { title: "Hiệu suất", url: "/performance", icon: TrendingUp },
  { title: "Phân cụm", url: "/clusters", icon: Network },
];

const pmItems = [
  { title: "Phân công", url: "/assign", icon: ClipboardList },
  { title: "Rủi ro", url: "/risk", icon: AlertTriangle },
];

const adminItems = [
  { title: "Quản lý user", url: "/admin", icon: Shield },
];

const globalItems = [
  { title: "Nhân sự", url: "/employees", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (p: string) => (p === "/" ? pathname === "/" : pathname.startsWith(p));

  const renderItem = (item: { title: string; url: string; icon: any; badge?: string }) => (
    <SidebarMenuItem key={item.url}>
      <SidebarMenuButton asChild isActive={isActive(item.url)}>
        <NavLink to={item.url} end={item.url === "/"} className="flex items-center gap-3">
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center text-white font-bold shadow-md shrink-0">
            AI
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold text-sm">AI HR System</div>
              <div className="text-[11px] text-muted-foreground">Quản trị thông minh</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Chính</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{main.map(renderItem)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>HR</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{hrItems.map(renderItem)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>PM</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{pmItems.map(renderItem)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{adminItems.map(renderItem)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Chung</SidebarGroupLabel>
          <SidebarGroupContent><SidebarMenu>{globalItems.map(renderItem)}</SidebarMenu></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
