import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-background p-6">
      <div className="text-center max-w-md">
        <div className="text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">404</div>
        <h1 className="text-2xl font-semibold mt-2">Không tìm thấy trang</h1>
        <p className="text-muted-foreground mt-2">Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.</p>
        <Button asChild className="mt-6"><Link to="/">Về Dashboard</Link></Button>
      </div>
    </div>
  );
}
