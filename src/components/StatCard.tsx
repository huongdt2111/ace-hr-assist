import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  tone?: "primary" | "success" | "warning" | "destructive";
}

const toneMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({ label, value, icon: Icon, trend, tone = "primary" }: Props) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-elev transition-shadow">
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl grid place-items-center", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-medium",
            trend >= 0 ? "text-success" : "text-destructive")}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}
