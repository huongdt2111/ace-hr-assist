import { useState, useMemo } from "react";
import { employees } from "@/lib/mock";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PerfBadge } from "@/components/PerfBadge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Employees() {
  const [q, setQ] = useState("");
  const [dep, setDep] = useState("all");
  const [level, setLevel] = useState("all");

  const departments = Array.from(new Set(employees.map(e => e.department)));
  const levels = Array.from(new Set(employees.map(e => e.level)));

  const filtered = useMemo(() => employees.filter(e =>
    (q === "" || e.name.toLowerCase().includes(q.toLowerCase()) || e.id.toLowerCase().includes(q.toLowerCase())) &&
    (dep === "all" || e.department === dep) &&
    (level === "all" || e.level === level)
  ), [q, dep, level]);

  const riskClass = (r: number) => r > 0.6 ? "text-destructive" : r > 0.4 ? "text-warning" : "text-success";

  return (
    <div className="max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Nhân sự</h1>
        <p className="text-muted-foreground text-sm mt-1">{employees.length} nhân sự · cập nhật theo thời gian thực</p>
      </div>

      <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm theo tên, ID…" className="pl-9 bg-secondary border-0" />
          </div>
          <Select value={dep} onValueChange={setDep}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Phòng ban" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phòng ban</SelectItem>
              {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả level</SelectItem>
              {levels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-5 py-3">Nhân sự</th>
                <th className="text-left font-medium px-5 py-3">Role</th>
                <th className="text-left font-medium px-5 py-3">Phòng ban</th>
                <th className="text-left font-medium px-5 py-3">Level</th>
                <th className="text-right font-medium px-5 py-3">Exp</th>
                <th className="text-right font-medium px-5 py-3">KPI</th>
                <th className="text-right font-medium px-5 py-3">Workload</th>
                <th className="text-right font-medium px-5 py-3">Risk</th>
                <th className="text-left font-medium px-5 py-3">Cluster</th>
                <th className="text-left font-medium px-5 py-3">Performance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
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
                  <td className="px-5 py-3 text-muted-foreground">{e.level}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{e.experience}y</td>
                  <td className="px-5 py-3 text-right font-medium">{e.kpi}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="h-1.5 w-14 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${e.workload}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-7">{e.workload}</span>
                    </div>
                  </td>
                  <td className={cn("px-5 py-3 text-right font-medium", riskClass(e.risk))}>{Math.round(e.risk * 100)}%</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{e.cluster}</td>
                  <td className="px-5 py-3"><PerfBadge value={e.performance} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
