import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
  Trash2, User, Phone, MapPin, Calendar, Briefcase, 
  Eye, X, Download, Mail, MessageSquare, Hash 
} from "lucide-react";

export default function ServiceTable({ requests, loading, onDelete, isDark }) {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: isDark ? "#0a2538" : "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // Fixed: name -> client_name
    pdf.save(`${selected.client_name || 'Service'}_Request.pdf`);
  };

  if (loading) return <div className="py-24 text-center font-black animate-pulse text-[#00bf56]">CONNECTING...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className={`transition-colors duration-500 ${isDark ? "bg-white/5 text-white/40" : "bg-[#0b3c5d] text-white"} text-[10px] uppercase font-black`}>
          <tr>
            <th className="px-6 py-5">Client</th>
            <th className="px-6 py-5">Service</th>
            <th className="px-6 py-5">Contact</th>
            <th className="px-6 py-5 text-center">Status</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-100"}`}>
          {requests.map((item) => (
            <tr key={item.id} className={`group transition-colors ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-[#00bf56]/5"}`}>
              <td className="px-6 py-5">
                {/* Fixed: item.name -> item.client_name */}
                <span className={`font-black uppercase italic ${isDark ? "text-white" : "text-[#0b3c5d]"}`}>
                  {item.client_name || "Unknown Client"}
                </span>
              </td>
              <td className="px-6 py-5 text-[#00bf56] font-bold uppercase text-[11px]">{item.service_type}</td>
              <td className="px-6 py-5 text-[11px] opacity-60">{item.phone}</td>
              <td className="px-6 py-5 text-center">
                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${item.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-[#00bf56]/10 text-[#00bf56]'}`}>{item.status || "Pending"}</span>
              </td>
              <td className="px-6 py-5 text-right flex justify-end gap-2">
                <button onClick={() => { setSelected(item); setShowModal(true); }} className="p-3 bg-[#00bf56]/10 text-[#00bf56] rounded-xl hover:bg-[#00bf56] hover:text-white transition-all"><Eye size={18} /></button>
                <button onClick={() => onDelete(item.id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- POPUP MODAL --- */}
      {showModal && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border-4 ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}>
            
            <div className={`p-6 border-b flex justify-between items-center ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
              <button onClick={downloadPDF} className="flex items-center gap-2 bg-[#00BF56] text-white px-4 py-2 rounded-xl font-bold text-xs hover:scale-105 transition-all">
                <Download size={16}/> PDF
              </button>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-full"><X size={24}/></button>
            </div>

            <div ref={pdfRef} className={`p-10 space-y-6 ${isDark ? "text-white" : "text-[#0B3C5D]"}`}>
              <div className="grid grid-cols-2 gap-6">
                {/* Fixed: selected.name -> selected.client_name */}
                <DetailItem icon={<User/>} label="Full Name" value={selected.client_name} isDark={isDark} />
                <DetailItem icon={<Mail/>} label="Email" value={selected.email} isDark={isDark} />
                <DetailItem icon={<Phone/>} label="Phone" value={selected.phone} isDark={isDark} />
                <DetailItem icon={<MapPin/>} label="Location" value={selected.location} isDark={isDark} />
                <DetailItem icon={<Briefcase/>} label="Service" value={selected.service_type} color="text-[#00bf56]" isDark={isDark} />
                <DetailItem icon={<Calendar/>} label="Date" value={new Date(selected.created_at).toLocaleDateString()} isDark={isDark} />
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
                <label className="text-[10px] font-black uppercase opacity-40 flex items-center gap-1 mb-2"><MessageSquare size={14}/> Details</label>
                <p className="text-sm italic">{selected.details || "No details provided."}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value, color, isDark }) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-black uppercase opacity-40 flex items-center gap-1">{icon} {label}</label>
      <p className={`text-sm font-black uppercase italic ${color ? color : isDark ? "text-white" : "text-[#0B3C5D]"}`}>{value || "N/A"}</p>
    </div>
  );
}