import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import HRDashboard from "./pages/HRDashboard";
import PMDashboard from "./pages/PMDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import TaskInput from "./pages/TaskInput";
import Employees from "./pages/Employees";
import Clusters from "./pages/Clusters";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/performance" element={<HRDashboard />} />
            <Route path="/clusters" element={<Clusters />} />
            <Route path="/assign" element={<PMDashboard />} />
            <Route path="/risk" element={<PMDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/task-input" element={<TaskInput />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
