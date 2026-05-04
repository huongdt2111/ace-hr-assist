import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import { AIPanel } from "@/components/AIPanel";
import { employees, tasks } from "@/lib/mock";
import { Briefcase, CheckCircle2, AlertTriangle, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
  padding: "8px 12px",
};

export default function PMDashboard() {
  const [taskId, setTaskId] = useState(tasks[0].id);

  const ranked = [...employees]
    .map(e => ({ ...e, score: Math.round(e.skill * 0.5 + e.kpi * 0.3 + (100 - e.workload) * 0.2) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const riskData = [...employees].sort((a, b) => b.risk - a.risk).slice(0, 8).map(e => ({
    name: e.name.split(" ").slice(-1)[0],
    risk: Math.round(e.risk * 100),
    full: e.name,
    workload: e.workload,
    kpi: e.kpi,
  }));

  const riskColor = (r: number) => r > 70 ? "hsl(var(--destructive))" : r >= 40 ? "hsl(var(--warning))" : "hsl(var(--success))";

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">PM Dashboard</div>
        <h1 className="text-3xl font-semibold tracking-tight">Phân công & Rủi ro</h1>
        <p className="text-muted-foreground text-sm mt-1">Đề xuất AI giúp phân công đúng người, đúng việc</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Task đang mở" value={12} icon={Briefcase} tone="primary" />
        <StatCard label="Đã phân công" value={28} icon={CheckCircle2} tone="success" trend={6} />
        <StatCard label="Cảnh báo rủi ro" value={3} icon={AlertTriangle} tone="destructive" />
        <StatCard label="Team utilization" value="76%" icon={Activity} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-semibold text-sm">Gợi ý phân công</h3>
              <p className="text-xs text-muted-foreground">Top-5 nhân sự phù hợp nhất</p>
            </div>
            <Select value={taskId} onValueChange={setTaskId}>
              <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {tasks.map(t => <SelectItem key={t.id} value={t.id}>{t.id} — {t.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-5 py-3 w-12">#</th>
                <th className="text-left font-medium px-5 py-3">Nhân sự</th>
                <th className="text-right font-medium px-5 py-3">Score</th>
                <th className="text-right font-medium px-5 py-3">Skill</th>
                <th className="text-right font-medium px-5 py-3">Workload</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((e, i) => (
                <tr key={e.id} className={cn("border-t border-border", i === 0 && "bg-success-soft/40")}>
                  <td className="px-5 py-3">
                    <span className={cn("inline-grid place-items-center h-6 w-6 rounded-md text-xs font-semibold",
                      i === 0 ? "bg-success text-white" : "bg-secondary text-muted-foreground")}>{i + 1}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-hero text-white text-xs font-medium grid place-items-center">{e.avatar}</div>
                      <div>
                        <div className={cn("font-medium", i === 0 && "text-success")}>{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.role} · {e.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">{e.score}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{e.skill}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{e.workload}%</td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm" variant={i === 0 ? "default" : "outline"}>Phân công</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AIPanel title="AI Explain" confidence={88}>
          <p>Đề xuất <strong>{ranked[0].name}</strong> cho task này vì:</p>
          <ul className="space-y-1 text-xs list-disc list-inside text-muted-foreground">
            <li>Skill match phù hợp (score {ranked[0].skill})</li>
            <li>Workload còn dư địa ({ranked[0].workload}%)</li>
            <li>KPI gần nhất ổn định ({ranked[0].kpi})</li>
          </ul>
          <p className="text-xs mt-2">
            <strong>Lưu ý:</strong> {ranked[4].name} có skill cao nhưng workload đã ở mức {ranked[4].workload}%.
          </p>
        </AIPanel>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm">Cảnh báo rủi ro</h3>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Thấp</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Trung bình</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Cao</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Xác suất rủi ro overload / nghỉ việc theo nhân sự</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: "hsl(var(--secondary))" }}
              content={({ active, payload }) => active && payload?.[0] ? (
                <div className="rounded-xl border border-border bg-card shadow-md p-3 text-xs">
                  <div className="font-medium mb-1">{(payload[0].payload as any).full}</div>
                  <div className="text-muted-foreground">Risk: <span className="text-foreground font-semibold">{payload[0].value}%</span></div>
                  <div className="text-muted-foreground">Workload: {(payload[0].payload as any).workload}% · KPI: {(payload[0].payload as any).kpi}</div>
                  <div className="mt-1 text-[11px] text-warning">Rủi ro do workload cao + KPI giảm</div>
                </div>
              ) : null}
            />
            <Bar dataKey="risk" radius={[8, 8, 0, 0]}>
              {riskData.map((d, i) => <Cell key={i} fill={riskColor(d.risk)} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
