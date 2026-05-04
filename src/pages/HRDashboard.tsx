import { StatCard } from "@/components/StatCard";
import { AIPanel } from "@/components/AIPanel";
import { PerfBadge } from "@/components/PerfBadge";
import { employees, kpiByDept, performanceDist } from "@/lib/mock";
import { Users, Target, Award, AlertTriangle } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, ScatterChart, Scatter, ZAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const COLORS = ["hsl(var(--success))", "hsl(var(--primary))", "hsl(var(--warning))", "hsl(var(--destructive))"];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
  padding: "8px 12px",
  boxShadow: "var(--shadow-md)",
};

export default function HRDashboard() {
  const avgKpi = Math.round(employees.reduce((s, e) => s + e.kpi, 0) / employees.length);
  const excellent = employees.filter(e => e.performance === "Excellent").length;
  const risk = employees.filter(e => e.performance === "Risk").length;
  const topRisk = [...employees].sort((a, b) => b.risk - a.risk)[0];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs font-medium text-primary uppercase tracking-wider mb-1">HR Dashboard</div>
          <h1 className="text-3xl font-semibold tracking-tight">Tổng quan hiệu suất</h1>
          <p className="text-muted-foreground text-sm mt-1">Đánh giá & phát triển nhân sự dựa trên dữ liệu thực tế</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild><Link to="/employees">Xem nhân sự</Link></Button>
          <Button asChild><Link to="/task-input">Phân tích AI</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tổng nhân sự" value={employees.length} icon={Users} trend={12} tone="primary" />
        <StatCard label="KPI trung bình" value={`${avgKpi}%`} icon={Target} trend={4} tone="success" />
        <StatCard label="Excellent" value={excellent} icon={Award} trend={8} tone="success" />
        <StatCard label="Cần chú ý" value={risk} icon={AlertTriangle} trend={-3} tone="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <h3 className="font-semibold text-sm">Phân loại hiệu suất</h3>
          <p className="text-xs text-muted-foreground mb-2">Tỷ lệ nhân sự theo nhóm</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={performanceDist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {performanceDist.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {performanceDist.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{p.name}</span>
                <span className="ml-auto font-medium">{p.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-5 shadow-card lg:col-span-2">
          <h3 className="font-semibold text-sm">KPI theo phòng ban</h3>
          <p className="text-xs text-muted-foreground mb-2">Trung bình điểm KPI</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={kpiByDept}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="department" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--secondary))" }} />
              <Bar dataKey="kpi" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-card border border-border p-5 shadow-card lg:col-span-2">
          <h3 className="font-semibold text-sm">Skill vs KPI</h3>
          <p className="text-xs text-muted-foreground mb-2">Mỗi điểm = 1 nhân sự, màu theo performance</p>
          <ResponsiveContainer width="100%" height={280}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="skill" name="Skill" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis dataKey="kpi" name="KPI" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <ZAxis range={[80, 80]} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: "3 3" }} />
              {(["Excellent", "Good", "Average", "Risk"] as const).map((p, i) => (
                <Scatter key={p} name={p} data={employees.filter(e => e.performance === p)} fill={COLORS[i]} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <AIPanel title="AI Insight" confidence={92}>
          <p>
            <strong>{employees[0].name}</strong> thuộc nhóm <span className="text-success font-medium">Excellent</span> vì
            KPI cao ({employees[0].kpi}%) và workload hợp lý ({employees[0].workload}%).
          </p>
          <p>
            <strong>{topRisk.name}</strong> đang có rủi ro cao
            (risk {Math.round(topRisk.risk * 100)}%) — đề xuất giảm workload và 1:1 với manager.
          </p>
          <p className="text-muted-foreground text-xs">
            Phân tích dựa trên KPI 30 ngày, workload hiện tại, lịch sử dự án.
          </p>
        </AIPanel>
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Bảng nhân sự</h3>
            <p className="text-xs text-muted-foreground">Top theo KPI</p>
          </div>
          <Button variant="ghost" size="sm" asChild><Link to="/employees">Xem tất cả →</Link></Button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-5 py-3">Nhân sự</th>
              <th className="text-left font-medium px-5 py-3">Role</th>
              <th className="text-left font-medium px-5 py-3">Phòng ban</th>
              <th className="text-right font-medium px-5 py-3">KPI</th>
              <th className="text-right font-medium px-5 py-3">Workload</th>
              <th className="text-left font-medium px-5 py-3">Performance</th>
            </tr>
          </thead>
          <tbody>
            {[...employees].sort((a, b) => b.kpi - a.kpi).slice(0, 6).map(e => (
              <tr key={e.id} className="border-t border-border hover:bg-secondary/30">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-hero text-white text-xs font-medium grid place-items-center">{e.avatar}</div>
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-xs text-muted-foreground">{e.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{e.role}</td>
                <td className="px-5 py-3 text-muted-foreground">{e.department}</td>
                <td className="px-5 py-3 text-right font-medium">{e.kpi}</td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${e.workload}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">{e.workload}</span>
                  </div>
                </td>
                <td className="px-5 py-3"><PerfBadge value={e.performance} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
