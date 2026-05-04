import { cn } from "@/lib/utils";
import type { Performance } from "@/lib/mock";

const styles: Record<Performance, string> = {
  Excellent: "bg-success-soft text-success border-success/20",
  Good: "bg-primary-soft text-primary border-primary/20",
  Average: "bg-warning-soft text-warning border-warning/20",
  Risk: "bg-destructive-soft text-destructive border-destructive/20",
};

export function PerfBadge({ value }: { value: Performance }) {
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border", styles[value])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}
