import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Trash2,
  MessageSquare,
  Printer,
  Star,
  Calendar,
  Mail,
  Folder,
} from "lucide-react";
import { API_BASE } from "../../config";

export default function AdminFeedback() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/feedback/`);
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Bhai, kya aap sach mein ye feedback delete karna chahte hain?",
      )
    )
      return;
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(
        `${API_BASE}/api/admin/delete-feedback/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.ok) {
        setFeedbacks(feedbacks.filter((item) => item.id !== id));
        alert("Feedback deleted successfully");
      } else {
        alert("Error: You do not have permission to delete.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Network error.");
    }
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-10 transition-colors duration-500 ${
        isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0b3c5d]"
      }`}
    >
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#00bf56]/10 text-[#00bf56] shadow-lg shadow-[#00bf56]/5">
            <MessageSquare size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase">
              Customer <span className="text-[#00bf56]">Feedback</span>
            </h2>
            <p className="text-xs font-bold opacity-50 tracking-[0.2em]">
              Total Records: {feedbacks.length}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[#0b3c5d] text-white rounded-xl font-bold hover:bg-[#0b3c5d]/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#0b3c5d]/20"
        >
          <Printer size={18} />
          Print / Export
        </button>
      </div>

      {/* --- Table Container --- */}
      <div
        className={`rounded-[2.5rem] shadow-2xl overflow-hidden border transition-all duration-500 ${
          isDark
            ? "bg-[#0a2538] border-white/5 shadow-black/40"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`${isDark ? "bg-white/5 text-white/50" : "bg-[#0b3c5d] text-white"} text-[11px] uppercase tracking-[0.2em] font-black`}
              >
                <th className="px-6 py-5">User Info</th>
                <th className="px-6 py-5 text-center">Rating</th>
                <th className="px-6 py-5">Project</th>
                <th className="px-6 py-5 w-1/3">Message</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>

            <tbody
              className={`divide-y transition-colors duration-500 ${isDark ? "divide-white/5" : "divide-slate-100"}`}
            >
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-20 text-center font-bold italic animate-pulse text-[#00bf56]"
                  >
                    Fetching feedbacks...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-20 text-center opacity-30 italic"
                  >
                    No feedback records found.
                  </td>
                </tr>
              ) : (
                feedbacks.map((item) => (
                  <tr
                    key={item.id}
                    className={`group transition-all duration-300 ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-[#00bf56]/5"}`}
                  >
                    {/* User Info */}
                    <td className="px-6 py-5">
                      <div className="font-black text-sm uppercase tracking-tight italic">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] opacity-50 font-bold mt-1">
                        <Mail size={10} className="text-[#00bf56]" />{" "}
                        {item.email}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={
                              i < (item.rating || 0) ? "#00bf56" : "transparent"
                            }
                            className={
                              i < (item.rating || 0)
                                ? "text-[#00bf56]"
                                : "text-slate-300 opacity-30"
                            }
                          />
                        ))}
                      </div>
                    </td>

                    {/* Project */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                        <Folder size={12} className="text-[#00bf56]" />
                        {item.project_title || "General"}
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-5">
                      <p className="text-xs leading-relaxed opacity-80 italic line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                        "{item.message}"
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[10px] font-mono opacity-50">
                        <Calendar size={12} />
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all transform active:scale-90 shadow-sm"
                        title="Delete Feedback"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Label */}
      <p className="mt-8 text-center text-[10px] font-bold opacity-20 uppercase tracking-[0.3em]">
        Webtrezor Admin Feedback Management
      </p>
    </div>
  );
}
