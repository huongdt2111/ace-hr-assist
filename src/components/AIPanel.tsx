import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  children: React.ReactNode;
  confidence?: number;
  className?: string;
}

export function AIPanel({ title = "AI Insight", children, confidence, className }: Props) {
  return (
    <div className={cn("rounded-2xl border border-primary/20 bg-gradient-ai p-5", className)}>
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-lg bg-gradient-hero grid place-items-center text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="font-semibold text-sm">{title}</div>
        {confidence !== undefined && (
          <span className="ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            Confidence {confidence}%
          </span>
        )}
      </div>
      <div className="text-sm text-foreground/80 space-y-2 leading-relaxed">{children}</div>
    </div>
  );
}
