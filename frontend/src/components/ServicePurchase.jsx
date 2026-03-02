import React, { useState, useEffect } from "react";
import {
  Building2,
  Send,
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  MessageSquare,
  Globe,
  Wallet,
  FileText,
  Loader2,
} from "lucide-react";
import { API_BASE } from "../config";
import { useTheme } from "@mui/material/styles";

const ServicePurchase = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    business_name: "",
    website_type: "",
    details: "",
    budget: "",
    email: "",
    whatsapp: "",
  });

  const CONTACT_NUMBER = "917724883202";

  // --- HELPER: OPEN WHATSAPP WITH AI-STYLE TEXT ---
  const openWhatsApp = () => {
    const intro = "Hello! I am interested in your services for my business.";
    const body =
      `*Project Inquiry*%0A` +
      `--------------------------%0A` +
      `*Business Name:* ${formData.business_name || "N/A"}%0A` +
      `*Service Type:* ${formData.website_type || "Web Development"}%0A` +
      `*Estimated Budget:* ${formData.budget || "To be discussed"}%0A` +
      `*Details:* ${formData.details || "I would like to discuss a new project."}`;

    window.open(
      `https://wa.me/${CONTACT_NUMBER}?text=${intro}%0A%0A${body}`,
      "_blank",
    );
  };

  // --- API: FETCH CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/request/build/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        nextStep();
      } else {
        const data = await response.json();
        alert("Submission failed: " + JSON.stringify(data));
      }
    } catch (error) {
      // Fallback: If server is down, still let them reach the success page to call/whatsapp
      nextStep();
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    const inputClasses = `w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none focus:ring-4 focus:ring-[#00BF56]/10 ${
      isDarkMode
        ? "bg-slate-800 border-slate-700 text-white focus:border-[#00BF56]"
        : "bg-white border-slate-200 text-slate-900 focus:border-[#00BF56]"
    }`;
    const labelClasses = `text-sm font-bold mb-2 block ${isDarkMode ? "text-slate-300" : "text-[#0B3C5D]"}`;

    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className={labelClasses}>Business Name</label>
              <div className="relative flex items-center">
                <Building2
                  className="absolute left-4 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleInputChange}
                  placeholder="Enter business name"
                  className={inputClasses}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contact@business.com"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={labelClasses}>WhatsApp Number</label>
                <div className="relative flex items-center">
                  <MessageSquare
                    className="absolute left-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+91..."
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Website Category</label>
                <div className="relative flex items-center">
                  <Globe
                    className="absolute left-4 text-slate-400 z-10"
                    size={20}
                  />
                  <select
                    name="website_type"
                    value={formData.website_type}
                    onChange={handleInputChange}
                    className={inputClasses}
                    required
                  >
                    <option value="">Select Category...</option>
                    {categories.map((parent) => (
                      <optgroup key={parent.id} label={parent.name}>
                        {parent.subcategories?.map((sub) => (
                          <option key={sub.id} value={sub.name}>
                            {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Budget Range</label>
                <div className="relative flex items-center">
                  <Wallet
                    className="absolute left-4 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g. ₹10,000"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label className={labelClasses}>Project Details</label>
              <div className="relative">
                <FileText
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <textarea
                  name="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Describe your requirements..."
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center py-10 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-[#00BF56]/10 text-[#00BF56] rounded-full flex items-center justify-center mx-auto mb-6">
              <Send size={40} />
            </div>
            <h3 className="text-2xl font-black mb-2 italic uppercase">
              Review Submission
            </h3>
            <div
              className={`mt-6 p-6 rounded-2xl text-left space-y-2 border ${isDarkMode ? "bg-slate-800 border-white/5" : "bg-slate-50 border-slate-200"}`}
            >
              <p>
                <strong>Business:</strong> {formData.business_name}
              </p>
              <p>
                <strong>Type:</strong>{" "}
                <span className="text-[#00BF56] font-bold">
                  {formData.website_type}
                </span>
              </p>
              <p>
                <strong>Contact:</strong> {formData.whatsapp}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-10 animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-[#00BF56] text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#00BF56]/30">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-black mb-4 italic uppercase">
              Request Submitted!
            </h3>
            <p className="opacity-70 mb-10 text-lg">
              Thank you. Our team will contact you shortly.
            </p>
            <a
              href={`tel:+${CONTACT_NUMBER}`}
              className="inline-flex items-center gap-2 bg-[#0B3C5D] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              <Phone size={18} /> Call Us Directly
            </a>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen py-20 px-6 transition-colors duration-500 ${isDarkMode ? "bg-[#051622]" : "bg-slate-50"}`}
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1
          className={`text-4xl md:text-6xl font-black mb-4 tracking-tighter italic ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
        >
          Make Your <span className="text-[#00BF56]">Own Web</span>
        </h1>
        <p className="text-lg opacity-60">
          Professional digital presence ke liye step-by-step request fill
          karein.
        </p>
      </div>

      <div
        className={`max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border transition-all ${isDarkMode ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}
      >
        <div className="bg-[#0B3C5D] p-8 md:p-12">
          <div className="relative flex justify-between items-center max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
            {[1, 2, 3].map((s_id) => (
              <div
                key={s_id}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step >= s_id ? "bg-[#00BF56] border-[#00BF56] text-white" : "bg-[#0B3C5D] border-white/20 text-white/40"}`}
                >
                  {step > s_id ? <CheckCircle2 size={24} /> : s_id}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-16">
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="mt-12 pt-8 border-t border-slate-500/10 flex flex-wrap gap-4 justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1 || loading}
                className="flex items-center gap-2 font-bold text-[#0B3C5D] disabled:opacity-20 dark:text-white"
              >
                <ArrowLeft size={20} /> Back
              </button>

              <div className="flex items-center gap-3">
                {step < 3 && (
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageSquare size={20} fill="currentColor" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 bg-[#0B3C5D] text-white px-8 py-4 rounded-2xl font-black hover:bg-[#082a42] transition-all disabled:opacity-70 shadow-xl shadow-[#0B3C5D]/20"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : step === 2 ? (
                      "Final Submit"
                    ) : (
                      "Continue"
                    )}
                    {!loading && <ArrowRight size={20} />}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black"
                  >
                    New Request
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicePurchase;
