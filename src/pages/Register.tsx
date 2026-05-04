import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Register() {
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-soft p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-elev p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center text-white font-bold">AI</div>
          <div className="font-semibold">AI HR System</div>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Tạo tài khoản</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-6">Bắt đầu chỉ trong 30 giây</p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/"; }}>
          <div className="space-y-2"><Label>Họ tên</Label><Input placeholder="Nguyễn Văn A" required /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="ban@congty.com" required /></div>
          <div className="space-y-2"><Label>Mật khẩu</Label><Input type="password" placeholder="••••••••" required /></div>
          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select defaultValue="hr">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="pm">PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full h-10" type="submit">Tạo tài khoản</Button>
        </form>
        <div className="text-sm text-center text-muted-foreground mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
