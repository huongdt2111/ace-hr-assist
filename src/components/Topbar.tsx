import { Bell, LogOut, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const navigate = useNavigate();
  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-30 flex items-center gap-4 px-6">
      <SidebarTrigger />
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Tìm nhân sự, task, phòng ban…" className="pl-9 bg-secondary border-0 h-9" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary transition-colors relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 hover:bg-secondary rounded-lg pl-1 pr-3 py-1 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-hero text-white text-xs font-semibold">AD</AvatarFallback>
            </Avatar>
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-[11px] text-muted-foreground">Administrator</div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
