import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  UserPlus,
  Info,
  Briefcase,
  Phone,
  MapPin,
  Globe,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { API_BASE } from "../../config";

export default function ServiceProviders() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    service_name: "",
    provider_name: "",
    contact_no: "",
    location: "",
    business_url: "",
  });

  // Common Input Styles
  const inputClasses = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-[#00BF56]/10 ${
    isDark
      ? "bg-white/5 border-white/10 text-white focus:border-[#00BF56]"
      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00BF56]"
  }`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    try {
      const response = await fetch(`${API_BASE}/api/add-provider/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Service Provider Added Successfully! 🚀");
        setFormData({
          service_name: "",
          provider_name: "",
          contact_no: "",
          location: "",
          business_url: "",
        });
      } else {
        alert("Failed to add provider. Please check permissions.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors duration-500 ${
        isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0B3C5D]"
      }`}
    >
      {/* Header Section */}
      <header className="mb-12">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-3">
          Providers <span className="text-[#00BF56]">Management</span>
        </h2>
        <p className="opacity-60 font-medium">
          Add and manage business service providers for the directory.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section (Takes 2 columns) */}
        <div
          className={`lg:col-span-2 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all ${
            isDark
              ? "bg-[#0a2538] border border-white/5"
              : "bg-white border border-slate-100"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-[#00BF56]"></div>

          <div className="flex items-center gap-3 mb-8">
            <UserPlus className="text-[#00BF56]" size={28} />
            <h3 className="text-2xl font-black italic">Add New Provider</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Briefcase size={16} /> Service Type
                </label>
                <input
                  name="service_name"
                  value={formData.service_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Web Design, Plumber"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  Provider Name
                </label>
                <input
                  name="provider_name"
                  value={formData.provider_name}
                  onChange={handleChange}
                  required
                  placeholder="Business or Person Name"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <Phone size={16} /> Contact Number
                </label>
                <input
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  required
                  placeholder="+91 00000 00000"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                  <MapPin size={16} /> Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Indore, Vijay Nagar"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70 flex items-center gap-2">
                <Globe size={16} /> Business Website URL (Optional)
              </label>
              <input
                name="business_url"
                value={formData.business_url}
                onChange={handleChange}
                placeholder="https://webtrezor.com"
                className={inputClasses}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-[#00BF56] text-white font-black rounded-2xl shadow-xl shadow-[#00BF56]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <PlusCircle size={20} />
              )}
              {loading ? "Registering..." : "Register Provider"}
            </button>
          </form>
        </div>

        {/* Info/Quick Help Section */}
        <aside className="space-y-6">
          <div
            className={`p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden ${
              isDark
                ? "bg-[#0B3C5D]/30 border border-white/5"
                : "bg-[#0B3C5D] text-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-6 text-[#00BF56]">
              <Info size={24} />
              <h3 className="text-xl font-black italic">Quick Help</h3>
            </div>

            <ul className="space-y-6">
              {[
                {
                  title: "Keywords Matter",
                  desc: "Ensure Service Name matches what users search for.",
                },
                {
                  title: "Specific Location",
                  desc: "Include area names like 'Vijay Nagar' for local SEO.",
                },
                {
                  title: "Direct Contact",
                  desc: "Double-check the WhatsApp number for direct leads.",
                },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#00BF56] shrink-0" />
                  <div>
                    <p className="font-bold mb-1 leading-tight">{item.title}</p>
                    <p className="text-sm opacity-60 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Card */}
          <div
            className={`p-6 rounded-[2.5rem] border border-dashed transition-all ${
              isDark
                ? "border-white/10 opacity-40 hover:opacity-100"
                : "border-slate-300 opacity-60 hover:opacity-100"
            }`}
          >
            <p className="text-center font-bold text-sm italic">
              "Building a trusted directory of experts for Webtrezor users."
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
