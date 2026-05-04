import { StatCard } from "@/components/StatCard";
import { employees } from "@/lib/mock";
import { Users, Activity, ShieldCheck, Server } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const users = [
  { id: "U-001", name: "Admin User", email: "admin@company.com", role: "Admin", active: true },
  { id: "U-002", name: "Hà HR", email: "ha.hr@company.com", role: "HR", active: true },
  { id: "U-003", name: "Minh PM", email: "minh.pm@company.com", role: "PM", active: true },
  { id: "U-004", name: "Linh HR", email: "linh.hr@company.com", role: "HR", active: false },
  { id: "U-005", name: "Phong PM", email: "phong.pm@company.com", role: "PM", active: true },
];

const roleStyle: Record<string, string> = {
  Admin: "bg-primary/10 text-primary",
  HR: "bg-success/10 text-success",
  PM: "bg-warning/10 text-warning",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Admin</div>
        <h1 className="text-3xl font-semibold tracking-tight">Quản lý hệ thống</h1>
        <p className="text-muted-foreground text-sm mt-1">Toàn quyền truy cập, người dùng và cấu hình</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tổng user" value={users.length} icon={Users} tone="primary" />
        <StatCard label="Active 24h" value={4} icon={Activity} tone="success" />
        <StatCard label="Phòng ban" value={5} icon={ShieldCheck} tone="warning" />
        <StatCard label="Edge functions" value={8} icon={Server} tone="primary" />
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Quản lý người dùng</h3>
            <p className="text-xs text-muted-foreground">Phân quyền và bật/tắt tài khoản</p>
          </div>
          <Button size="sm">+ Thêm user</Button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-5 py-3">Người dùng</th>
              <th className="text-left font-medium px-5 py-3">Email</th>
              <th className="text-left font-medium px-5 py-3">Role</th>
              <th className="text-left font-medium px-5 py-3">Trạng thái</th>
              <th className="text-right font-medium px-5 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-border hover:bg-secondary/30">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-hero text-white text-xs font-medium grid place-items-center">
                      {u.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="font-medium">{u.name}</div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${roleStyle[u.role]}`}>{u.role}</span>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs ${u.active ? "text-success" : "text-muted-foreground"}`}>
                    {u.active ? "● Active" : "○ Disabled"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right"><Switch defaultChecked={u.active} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
        <h3 className="font-semibold text-sm mb-1">Tổng quan dữ liệu</h3>
        <p className="text-xs text-muted-foreground mb-4">Admin có thể xem cả module HR và PM</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-semibold">{employees.length}</div>
            <div className="text-xs text-muted-foreground">Nhân sự đang theo dõi</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-semibold">12</div>
            <div className="text-xs text-muted-foreground">Task đang mở</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/50">
            <div className="text-2xl font-semibold">99.98%</div>
            <div className="text-xs text-muted-foreground">Uptime tháng này</div>
          </div>
        </div>
      </div>
    </div>
  );
}
