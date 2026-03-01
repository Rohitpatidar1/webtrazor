import { Clock, PhoneCall, CheckCircle2 } from "lucide-react";

export default function ServiceStats({ data = [], isDark }) {
  const getCount = (status) => data.filter(r => (r.status || "Pending").toLowerCase() === status.toLowerCase()).length;

  const statConfig = [
    { label: "Pending", count: getCount("Pending"), icon: <Clock size={22}/>, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Contacted", count: getCount("Contacted"), icon: <PhoneCall size={22}/>, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Processed", count: getCount("Processed"), icon: <CheckCircle2 size={22}/>, color: "text-[#00bf56]", bg: "bg-[#00bf56]/10" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statConfig.map((stat, i) => (
        <div key={i} className={`p-6 rounded-[1.5rem] border transition-all duration-500 ${
          isDark ? "bg-[#0a2538] border-white/5 shadow-inner" : "bg-white border-slate-100 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDark ? "text-white/40" : "text-[#0b3c5d]/40"}`}>
                {stat.label}
              </p>
              <h3 className={`text-4xl font-black italic tracking-tighter ${isDark ? "text-white" : "text-[#0b3c5d]"}`}>
                {stat.count.toString().padStart(2, '0')}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl shadow-inner ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}