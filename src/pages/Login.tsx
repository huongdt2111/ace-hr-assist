import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-hero p-12 flex-col justify-between text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px, 80px 80px",
        }} />
        <div className="relative flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur grid place-items-center font-bold">AI</div>
          <div className="font-semibold">AI HR System</div>
        </div>
        <div className="relative space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
            <Sparkles className="h-3 w-3" /> Explainable AI
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">
            Quản trị nhân sự <br />thông minh hơn mỗi ngày.
          </h1>
          <p className="text-white/80 leading-relaxed">
            Phân tích hiệu suất, đề xuất phân công và cảnh báo rủi ro — tất cả trong một dashboard, hỗ trợ bởi AI.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-6">
            {[["98%", "Độ chính xác"], ["3.2s", "Ra quyết định"], ["+45%", "Hiệu quả"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold">{v}</div>
                <div className="text-xs text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/60">© 2026 AI HR System</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Đăng nhập</h2>
            <p className="text-sm text-muted-foreground mt-1">Chào mừng quay lại 👋</p>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = "/"; }}>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="ban@congty.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Mật khẩu</Label>
                <a className="text-xs text-primary hover:underline" href="#">Quên?</a>
              </div>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <Button className="w-full h-10" type="submit">Đăng nhập</Button>
          </form>
          <div className="text-sm text-center text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
