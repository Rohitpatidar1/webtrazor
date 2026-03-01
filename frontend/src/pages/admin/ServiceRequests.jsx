import { useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles"; 
import ServiceStats from "../../components/admin/ServiceStats";
import ServiceTable from "../../components/admin/ServiceTable";
import { Search, RefreshCw, Layers } from "lucide-react";

export default function ServiceRequests() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://127.0.0.1:8000/api/request/service/",
        {
          headers: { Authorization: `Token ${token}` },
        },
      );
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bhai, are you sure you want to delete this?")) {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://127.0.0.1:8000/api/admin/delete-service-request/${id}/`,
          {
            method: "DELETE",
            headers: { Authorization: `Token ${token}` },
          },
        );
        if (response.ok) {
          fetchServiceRequests();
        }
      } catch (error) {
        console.error("Error deleting request:", error);
      }
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  // Fixed: req.name -> req.client_name
  const filteredRequests = requests.filter(
    (req) =>
      req.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-all duration-500 ${isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0b3c5d]"}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#00bf56]/10 text-[#00bf56]">
            <Layers size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter">
              Service <span className="text-[#00bf56]">Requests</span>
            </h2>
            <p className="text-sm opacity-60">Manage client connection leads</p>
          </div>
        </div>
        <button
          onClick={fetchServiceRequests}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00bf56] text-white rounded-xl font-bold shadow-lg shadow-[#00bf56]/20 hover:scale-105 active:scale-95 transition-all"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <ServiceStats data={requests} isDark={isDark} />

      <div className="relative my-8 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-[#00bf56] transition-colors" size={20} />
        <input
          type="text"
          placeholder="Search by client name, service or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all duration-300 ${
            isDark ? "bg-white/5 border-white/10 focus:border-[#00bf56] text-white" : "bg-white border-slate-200 shadow-sm focus:border-[#00bf56] text-[#0b3c5d]"
          }`}
        />
      </div>

      <div className={`rounded-[2rem] shadow-2xl overflow-hidden border transition-all duration-500 ${isDark ? "bg-[#0a2538] border-white/5 shadow-black/40" : "bg-white border-slate-100"}`}>
        <ServiceTable
          requests={filteredRequests}
          loading={loading}
          onDelete={handleDelete}
          isDark={isDark}
        />
      </div>
    </div>
  );
}