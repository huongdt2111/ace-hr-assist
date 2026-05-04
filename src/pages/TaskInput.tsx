import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIPanel } from "@/components/AIPanel";
import { employees } from "@/lib/mock";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TaskInput() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const ranked = [...employees]
    .map(e => ({ ...e, score: Math.round(e.skill * 0.5 + e.kpi * 0.3 + (100 - e.workload) * 0.2) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDone(false);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  return (
    <div className="max-w-[1400px] space-y-6">
      <div>
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" /> AI-powered
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Nhập task & phân tích AI</h1>
        <p className="text-muted-foreground text-sm mt-1">AI sẽ đề xuất nhân sự phù hợp dựa trên skill, workload và lịch sử dự án</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <form onSubmit={submit} className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-card space-y-4 h-fit">
          <h3 className="font-semibold">Thông tin task</h3>
          <div className="space-y-2"><Label>Tên task</Label><Input placeholder="VD: Tối ưu trang checkout" required /></div>
          <div className="space-y-2"><Label>Dự án</Label><Input placeholder="VD: E-commerce v2" required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Độ phức tạp</Label>
              <Select defaultValue="medium">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Skill yêu cầu</Label>
              <Select defaultValue="frontend">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="fullstack">Fullstack</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Deadline</Label><Input type="date" required /></div>
            <div className="space-y-2"><Label>Workload (giờ)</Label><Input type="number" defaultValue={40} /></div>
          </div>
          <div className="space-y-2"><Label>Mô tả thêm</Label><Textarea placeholder="Yêu cầu chi tiết..." rows={3} /></div>
          <Button type="submit" className="w-full h-10" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Đang phân tích…</> : <><Sparkles className="h-4 w-4 mr-2" />Phân tích bằng AI</>}
          </Button>
        </form>

        <div className="lg:col-span-3 space-y-4">
          {!done && !loading && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-soft grid place-items-center mb-3">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="font-medium">Chưa có phân tích</div>
              <p className="text-sm text-muted-foreground mt-1">Điền thông tin task và nhấn "Phân tích bằng AI" để xem đề xuất.</p>
            </div>
          )}
          {loading && (
            <div className="rounded-2xl border border-border p-12 text-center bg-card animate-pulse">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
              <div className="mt-3 text-sm text-muted-foreground">AI đang đánh giá {employees.length} nhân sự…</div>
            </div>
          )}
          {done && (
            <>
              <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <span className="h-5 w-5 rounded bg-gradient-hero grid place-items-center"><Sparkles className="h-3 w-3 text-white" /></span>
                      AI Output — Top 5 nhân sự phù hợp
                    </h3>
                    <p className="text-xs text-muted-foreground">Sắp xếp theo composite score</p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {ranked.map((e, i) => {
                    const riskTone = e.risk > 0.6 ? "destructive" : e.risk > 0.4 ? "warning" : "success";
                    const riskLabel = e.risk > 0.6 ? "Cao" : e.risk > 0.4 ? "Trung bình" : "Thấp";
                    return (
                      <div key={e.id} className={cn("p-4 flex items-center gap-4", i === 0 && "bg-success-soft/30")}>
                        <span className={cn("h-7 w-7 rounded-md text-xs font-semibold grid place-items-center",
                          i === 0 ? "bg-success text-white" : "bg-secondary text-muted-foreground")}>{i + 1}</span>
                        <div className="h-9 w-9 rounded-full bg-gradient-hero text-white text-xs font-medium grid place-items-center">{e.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{e.name}</div>
                          <div className="text-xs text-muted-foreground">{e.role} · {e.department}</div>
                        </div>
                        <div className="hidden sm:block text-center">
                          <div className="text-xs text-muted-foreground">Score</div>
                          <div className="font-semibold">{e.score}</div>
                        </div>
                        <div className="hidden md:block text-center">
                          <div className="text-xs text-muted-foreground">Risk</div>
                          <div className={cn("text-xs font-medium px-2 py-0.5 rounded-md inline-block",
                            riskTone === "destructive" && "bg-destructive/10 text-destructive",
                            riskTone === "warning" && "bg-warning/10 text-warning",
                            riskTone === "success" && "bg-success/10 text-success")}>{riskLabel}</div>
                        </div>
                        <div className="hidden md:block text-center">
                          <div className="text-xs text-muted-foreground">Expected</div>
                          <div className="font-semibold text-success">{Math.min(98, e.kpi + 5)}%</div>
                        </div>
                        <Button size="sm" variant={i === 0 ? "default" : "outline"}>Phân công</Button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <AIPanel title="AI Insight" confidence={91}>
                <p>
                  <strong>{ranked[0].name}</strong> phù hợp nhất do skill match {ranked[0].skill}% và workload thấp ({ranked[0].workload}%).
                  Dự đoán hoàn thành đúng deadline với chất lượng cao.
                </p>
                <p>
                  <strong>{ranked[ranked.length - 1].name}</strong> có score cạnh tranh nhưng workload đã ở mức {ranked[ranked.length - 1].workload}% —
                  có rủi ro quá tải nếu nhận thêm task này.
                </p>
              </AIPanel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
