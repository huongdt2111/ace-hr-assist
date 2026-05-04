import { employees } from "@/lib/mock";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { AIPanel } from "@/components/AIPanel";

const COLORS: Record<string, string> = {
  "High Performer": "hsl(var(--success))",
  "Steady": "hsl(var(--primary))",
  "Growing": "hsl(var(--warning))",
  "At Risk": "hsl(var(--destructive))",
};

export default function Clusters() {
  const groups = Array.from(new Set(employees.map(e => e.cluster)));
  return (
    <div className="max-w-[1400px] space-y-6">
      <div>
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">HR · Phân cụm</div>
        <h1 className="text-3xl font-semibold tracking-tight">Phân cụm nhân sự</h1>
        <p className="text-muted-foreground text-sm mt-1">Nhóm nhân sự dựa trên KPI, workload và skill</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card lg:col-span-2">
          <h3 className="font-semibold text-sm">Bản đồ cụm (KPI × Workload)</h3>
          <ResponsiveContainer width="100%" height={380}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="workload" name="Workload" stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
              <YAxis dataKey="kpi" name="KPI" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ZAxis dataKey="experience" range={[60, 200]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
              {groups.map(g => (
                <Scatter key={g} name={g} data={employees.filter(e => e.cluster === g)} fill={COLORS[g]} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 pt-2">
            {groups.map(g => (
              <div key={g} className="flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[g] }} />{g}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {groups.map(g => {
            const members = employees.filter(e => e.cluster === g);
            return (
              <div key={g} className="rounded-2xl bg-card border border-border p-4 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[g] }} />
                    <div className="font-medium text-sm">{g}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{members.length} người</div>
                </div>
                <div className="flex -space-x-2 mt-3">
                  {members.slice(0, 5).map(m => (
                    <div key={m.id} className="h-7 w-7 rounded-full bg-gradient-hero text-white text-[10px] font-medium grid place-items-center border-2 border-card">{m.avatar}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AIPanel title="AI Insight — Cụm nhân sự" confidence={89}>
        <p><strong>High Performer</strong>: KPI cao, workload cân bằng — nên giao task chiến lược.</p>
        <p><strong>At Risk</strong>: workload cao + KPI giảm — đề xuất 1:1, giảm workload 20%.</p>
        <p><strong>Growing</strong>: tiềm năng — nên ghép mentor để tăng tốc phát triển.</p>
      </AIPanel>
    </div>
  );
}
