import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Search,
  Plus,
  LayoutGrid,
  Construction,
  Wrench,
  Star,
  ArrowUpRight,
  Globe,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";

import RecentProjects from "../../components/admin/RecentProjects";
import RecentRequests from "../../components/admin/RecentRequests";

const PRIMARY = "#0B3C5D";
const SECONDARY = "#00BF56";

// --- Internal StatsCard for Theme Consistency ---
const DashboardCard = ({ title, value, icon, color, isDark }) => (
  <div
    className={`relative p-6 rounded-[2rem] border transition-all duration-500 hover:scale-[1.02] shadow-xl overflow-hidden ${
      isDark
        ? "bg-white/5 border-white/5 shadow-black/20"
        : "bg-white border-slate-100 shadow-slate-200/50"
    }`}
  >
    {/* Background Glow */}
    <div
      className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -mr-10 -mt-10 blur-3xl"
      style={{ backgroundColor: color }}
    ></div>

    <div className="flex justify-between items-start relative z-10">
      <div>
        <p
          className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-1 ${isDark ? "text-white" : "text-[#0B3C5D]"}`}
        >
          {title}
        </p>
        <h3
          className={`text-4xl font-black italic tracking-tighter ${isDark ? "text-white" : "text-[#0B3C5D]"}`}
        >
          {value.toString().padStart(2, "0")}
        </h3>
      </div>
      <div
        className="p-3 rounded-2xl shadow-inner"
        style={{ backgroundColor: `${color}20`, color: color }}
      >
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-[#00BF56]">
      <TrendingUp size={12} /> <span>+12% from last month</span>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [stats, setStats] = useState({
    projects_count: 0,
    build_requests_count: 0,
    service_requests_count: 0,
    feedback_count: 0,
  });

  const [latestProjects, setLatestProjects] = useState([]);
  const [latestServices, setLatestServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Token ${token}` };

      const [statsRes, projectsRes, servicesRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/admin/dashboard-stats/", { headers }),
        fetch("http://127.0.0.1:8000/api/latest-projects/"),
        fetch("http://127.0.0.1:8000/api/latest-build-requests/", { headers }),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (projectsRes.ok) setLatestProjects(await projectsRes.json());
      if (servicesRes.ok) setLatestServices(await servicesRes.json());
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex flex-col h-screen items-center justify-center font-black italic tracking-tighter transition-colors ${isDark ? "text-white bg-[#051622]" : "text-[#0B3C5D] bg-slate-50"}`}
      >
        <div className="relative mb-4">
          <RefreshCcw
            size={48}
            className="animate-spin text-[#00BF56] opacity-20"
          />
          <div className="absolute inset-0 flex items-center justify-center text-xl">
            🚀
          </div>
        </div>
        <div className="text-2xl tracking-widest">
          INITIALIZING <span className="text-[#00BF56]">DASHBOARD...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-8 lg:p-12 transition-colors duration-700 ${isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0B3C5D]"}`}
    >
      {/* Top Navbar Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">
            Web<span className="text-[#00BF56]">trezor</span>{" "}
            <span className="text-sm not-italic opacity-30 font-bold uppercase tracking-[0.5em] ml-2">
              HQ
            </span>
          </h1>
          <p className="text-sm font-medium opacity-50 ml-1">
            Central Intelligence & Operations Dashboard
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:text-[#00BF56] transition-all"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Intelligence..."
              className={`w-full pl-12 pr-4 py-3 rounded-2xl text-sm outline-none border transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 focus:border-[#00BF56]"
                  : "bg-white border-slate-200 shadow-sm focus:border-[#00BF56]"
              }`}
            />
          </div>
          <button
            onClick={() => window.open("/", "_blank")}
            className="p-3.5 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] hover:bg-[#00BF56] hover:text-white transition-all shadow-xl shadow-[#00BF56]/10 group"
          >
            <Globe
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          title="Active Projects"
          value={stats.projects_count}
          icon={<LayoutGrid size={24} />}
          color="#3b82f6"
          isDark={isDark}
        />
        <DashboardCard
          title="Build Queue"
          value={stats.build_requests_count}
          icon={<Construction size={24} />}
          color={SECONDARY}
          isDark={isDark}
        />
        <DashboardCard
          title="Service Leads"
          value={stats.service_requests_count}
          icon={<Wrench size={24} />}
          color="#f59e0b"
          isDark={isDark}
        />
        <DashboardCard
          title="User Feedback"
          value={stats.feedback_count}
          icon={<Star size={24} />}
          color="#06b6d4"
          isDark={isDark}
        />
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid lg:grid-cols-5 gap-8 mb-12">
        <div
          className={`lg:col-span-3 p-8 rounded-[3rem] shadow-2xl transition-all border ${
            isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black italic tracking-tight uppercase">
              Latest Projects
            </h2>
            <ArrowUpRight className="opacity-20" />
          </div>
          <RecentProjects projects={latestProjects} isDark={isDark} />
        </div>

        <div
          className={`lg:col-span-2 p-8 rounded-[3rem] shadow-2xl transition-all border ${
            isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black italic tracking-tight uppercase text-[#00BF56]">
              Incoming Requests
            </h2>
            <Construction size={20} className="opacity-20" />
          </div>
          <RecentRequests requests={latestServices} isDark={isDark} />
        </div>
      </div>

      {/* Command Center (Quick Actions) */}
      <div
        className={`p-10 rounded-[3rem] border flex flex-col md:flex-row gap-8 items-center justify-between transition-all ${
          isDark
            ? "bg-gradient-to-br from-[#0B3C5D]/40 to-black/20 border-white/5"
            : "bg-[#0B3C5D] text-white shadow-2xl shadow-[#0B3C5D]/30"
        }`}
      >
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-black italic tracking-tight mb-1 uppercase">
            Command Center
          </h3>
          <p className="text-sm opacity-60 max-w-xs uppercase tracking-widest font-bold">
            Deploy new assets or audit existing systems.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/admin/projects")}
            className="flex items-center gap-3 px-8 py-4 bg-[#00BF56] text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#00BF56]/40 text-sm uppercase italic"
          >
            <Plus size={20} /> Deploy Project
          </button>

          <button
            onClick={() => navigate("/admin/build-requests")}
            className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-black text-sm uppercase italic transition-all ${
              isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            View Queue <ArrowUpRight size={18} />
          </button>

          <button
            onClick={() => navigate("/admin/feedback")}
            className={`flex items-center gap-3 px-8 py-4 border rounded-2xl font-black text-sm uppercase italic transition-all ${
              isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            Audit Feedback
          </button>
        </div>
      </div>

      {/* System Footer Label */}
      <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.8em] opacity-20">
        Webtrezor Management Engine v2.0
      </div>
    </div>
  );
}