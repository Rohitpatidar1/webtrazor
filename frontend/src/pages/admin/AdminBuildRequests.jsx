import { useTheme } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react"; // useRef add kiya
import jsPDF from "jspdf"; // PDF ke liye
import html2canvas from "html2canvas"; // Screenshot/Canvas ke liye
import {
  Search,
  Trash2,
  Eye,
  Briefcase,
  Clock,
  CheckCircle,
  Database,
  Calendar,
  X,
  Mail,
  Globe,
  Wallet,
  MessageSquare,
  Download, // Download icon
  User,
  Hash,
} from "lucide-react";

export default function AdminBuildRequests() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Modal content ko target karne ke liye ref
  const modalRef = useRef();

  // --- PDF Download Function ---
  const downloadPDF = async () => {
    const element = modalRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: isDark ? "#0a2538" : "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Build_Request_${selectedRequest.business_name}.pdf`);
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://127.0.0.1:8000/api/request/build/", {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching build requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this build request?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/delete-build-request/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Token ${token}` },
        },
      );
      if (response.ok) {
        setRequests(requests.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openDetails = (req) => {
    setSelectedRequest(req);
    setShowModal(true);
  };

  const filteredRequests = requests.filter((req) =>
    req.business_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCount = (status) =>
    requests.filter((r) => r.status === status).length;

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-500 ${isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0B3C5D]"}`}
    >
      {/* Header aur Stats Cards (Same as your code) */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#00BF56]/10 text-[#00BF56]">
            <Database size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
              Build <span className="text-[#00BF56]">Requests</span>
            </h2>
            <p className="text-sm opacity-60 font-medium uppercase tracking-widest">
              Client Inquiries
            </p>
          </div>
        </div>
      </header>

      {/* Stats Cards ... (Keep your code here) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "Pending",
            count: getCount("Pending"),
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            label: "Contacted",
            count: getCount("Contacted"),
            icon: <Briefcase size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Processed",
            count: getCount("Processed"),
            icon: <CheckCircle size={20} />,
            color: "text-[#00BF56]",
            bg: "bg-[#00BF56]/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-3xl border flex items-center justify-between shadow-xl transition-all ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="font-bold text-lg">{stat.label}</span>
            </div>
            <span className={`text-2xl font-black ${stat.color}`}>
              {stat.count || 0}
            </span>
          </div>
        ))}
      </div>

      {/* Search Bar ... (Keep your code here) */}
      <div className="relative mb-8 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-[#00BF56]"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by business name..."
          className={`w-full pl-12 pr-4 py-4 rounded-2xl border outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-white border-slate-200 focus:border-[#00BF56]"}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table ... (Keep your code here) */}
      <div
        className={`rounded-[2.5rem] overflow-hidden shadow-2xl transition-all border ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`uppercase text-[11px] font-black tracking-widest ${isDark ? "bg-white/5 text-white/40" : "bg-slate-50 text-slate-400"}`}
              >
                <th className="px-6 py-5">Business</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5 text-center">Budget</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="py-20 text-center font-bold animate-pulse text-[#00BF56]"
                  >
                    CONNECTING...
                  </td>
                </tr>
              ) : (
                filteredRequests.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#00BF56]/5 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="font-black text-sm uppercase italic">
                        {item.business_name}
                      </div>
                      <div className="text-[10px] opacity-50">{item.email}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-500/10 opacity-70">
                        {item.website_type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center font-bold text-[#00BF56] italic">
                      {item.budget}
                    </td>
                    <td className="px-6 py-5 text-center text-[10px] font-black uppercase">
                      <span
                        className={
                          item.status === "Pending"
                            ? "text-amber-500"
                            : item.status === "Contacted"
                              ? "text-blue-500"
                              : "text-[#00BF56]"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openDetails(item)}
                          className="p-2.5 rounded-xl bg-[#00BF56]/10 text-[#00BF56] hover:bg-[#00BF56] hover:text-white transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DETAILED VIEW MODAL --- */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border-4 ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}
          >
            {/* Modal Header */}
            <div
              className={`p-8 border-b flex justify-between items-center ${isDark ? "bg-white/5 border-white/5" : "bg-slate-50"}`}
            >
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                  Request <span className="text-[#00BF56]">Details</span>
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {/* Download PDF Button */}
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-[#00BF56] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#00a64a] transition-all shadow-lg shadow-[#00BF56]/20"
                >
                  <Download size={16} /> DOWNLOAD PDF
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content - Wrapped in ref for PDF */}
            <div
              ref={modalRef}
              className={`p-8 space-y-6 ${isDark ? "bg-[#0a2538]" : "bg-white"}`}
            >
              <div className="flex justify-between items-start border-b pb-4 border-white/10">
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">
                    Reference ID
                  </p>
                  <p className="font-black text-[#00BF56]">
                    #BUILD-{selectedRequest.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em]">
                    Created At
                  </p>
                  <p className="font-bold text-xs">
                    {new Date(selectedRequest.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  label="Business Name"
                  value={selectedRequest.business_name}
                  icon={<Globe size={14} />}
                  color="text-[#00BF56]"
                />
                <DetailItem
                  label="Client Email"
                  value={selectedRequest.email}
                  icon={<Mail size={14} />}
                />
                <DetailItem
                  label="Website Type"
                  value={selectedRequest.website_type}
                  icon={<Briefcase size={14} />}
                />
                <DetailItem
                  label="Allocated Budget"
                  value={selectedRequest.budget}
                  icon={<Wallet size={14} />}
                  color="text-[#00BF56]"
                />

                {/* Yaha database se aane wala baaki sara data add kar diya hai */}
                <DetailItem
                  label="Status"
                  value={selectedRequest.status}
                  icon={<Clock size={14} />}
                />
                <DetailItem
                  label="Full Name"
                  value={selectedRequest.full_name || "N/A"}
                  icon={<User size={14} />}
                />
              </div>

              <div
                className={`p-6 rounded-3xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
              >
                <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-1 mb-2">
                  <MessageSquare size={12} /> Project Description / Message
                </label>
                <p className="text-sm leading-relaxed italic opacity-80 whitespace-pre-wrap">
                  {selectedRequest.message ||
                    "No additional message provided by the client."}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className={`p-6 border-t flex gap-4 ${isDark ? "bg-white/5 border-white/5" : "bg-slate-50"}`}
            >
              <button
                onClick={() =>
                  (window.location.href = `mailto:${selectedRequest.email}`)
                }
                className="flex-1 bg-[#0B3C5D] text-white py-4 rounded-2xl font-black uppercase italic tracking-widest hover:scale-[1.02] transition-all"
              >
                Send Direct Email
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-8 py-4 font-black uppercase italic text-sm opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Detail Component
function DetailItem({ label, value, icon, color = "" }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-1">
        {icon} {label}
      </label>
      <p className={`font-bold text-sm uppercase ${color}`}>{value || "N/A"}</p>
    </div>
  );
}