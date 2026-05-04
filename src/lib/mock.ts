export type Performance = "Excellent" | "Good" | "Average" | "Risk";

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  level: string;
  experience: number; // years
  kpi: number; // 0-100
  skill: number; // 0-100
  workload: number; // 0-100
  risk: number; // 0-1
  cluster: string;
  performance: Performance;
  avatar: string;
}

const names = [
  "Nguyễn An", "Trần Bình", "Lê Châu", "Phạm Dũng", "Hoàng Em",
  "Vũ Phong", "Đặng Giang", "Bùi Hà", "Đỗ Khánh", "Ngô Linh",
  "Dương Minh", "Lý Nhi", "Tô Phúc", "Trịnh Quân", "Mai Sơn",
  "Lưu Thảo", "Phan Uyên", "Cao Vinh", "Hồ Xuân", "Tạ Yến",
];

const departments = ["Engineering", "Product", "Design", "Data", "QA"];
const roles = ["Frontend", "Backend", "Fullstack", "PM", "Designer", "Data Scientist", "QA"];
const levels = ["Junior", "Middle", "Senior", "Lead"];
const clusters = ["High Performer", "Steady", "Growing", "At Risk"];

function perf(kpi: number, risk: number): Performance {
  if (kpi >= 85 && risk < 0.3) return "Excellent";
  if (kpi >= 70) return "Good";
  if (risk > 0.6) return "Risk";
  return "Average";
}

export const employees: Employee[] = names.map((name, i) => {
  const kpi = 50 + Math.round(Math.random() * 50);
  const skill = 40 + Math.round(Math.random() * 60);
  const workload = 30 + Math.round(Math.random() * 70);
  const risk = Math.min(1, Math.max(0, (workload / 100) * 0.6 + (1 - kpi / 100) * 0.5 - 0.1));
  return {
    id: `EMP-${String(i + 1).padStart(3, "0")}`,
    name,
    role: roles[i % roles.length],
    department: departments[i % departments.length],
    level: levels[i % levels.length],
    experience: 1 + (i % 9),
    kpi,
    skill,
    workload,
    risk: Number(risk.toFixed(2)),
    cluster: clusters[i % clusters.length],
    performance: perf(kpi, risk),
    avatar: name.split(" ").map(n => n[0]).join(""),
  };
});

export const kpiByDept = departments.map(dep => ({
  department: dep,
  kpi: Math.round(
    employees.filter(e => e.department === dep).reduce((s, e) => s + e.kpi, 0) /
      employees.filter(e => e.department === dep).length
  ),
}));

export const performanceDist = (["Excellent", "Good", "Average", "Risk"] as Performance[]).map(p => ({
  name: p,
  value: employees.filter(e => e.performance === p).length,
}));

export const tasks = [
  { id: "T-101", name: "Tối ưu trang checkout", project: "E-commerce v2", complexity: "High", skill: "Frontend" },
  { id: "T-102", name: "API thanh toán Stripe", project: "Payments", complexity: "Medium", skill: "Backend" },
  { id: "T-103", name: "Dashboard Analytics", project: "Insights", complexity: "High", skill: "Fullstack" },
  { id: "T-104", name: "Refactor design system", project: "Platform", complexity: "Medium", skill: "Designer" },
];
