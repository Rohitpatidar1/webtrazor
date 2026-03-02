import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Settings,
  Cpu,
  Globe,
  Smartphone,
  Zap,
  ShieldCheck,
  Layers,
  Headphones,
  Send,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  HelpCircle,
  X,
  Trophy,
  Users,
  Briefcase,
  Loader2,
  PhoneCall,
  MessageSquare,
  MapPin,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";

// --- DATA CONFIGURATION ---
const serviceData = {
  id: "agency-services",
  title: "Premium Digital Solutions",
  tagline:
    "Modern, Scalable and Responsive Solutions for your business growth.",
  description:
    "We utilize cutting-edge technologies to build solutions that are not only visually stunning but also performance-driven.",
  mainImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
  features: [
    {
      title: "Web Design",
      desc: "Modern, responsive, and high-converting websites tailored for your business.",
      icon: Globe,
    },
    {
      title: "UI/UX Design",
      desc: "User-centric interfaces that provide seamless and engaging digital experiences.",
      icon: Layers,
    },
    {
      title: "Logo Design",
      desc: "Unique brand identities that make your business stand out in the market.",
      icon: Sparkles,
    },
    {
      title: "Template Design",
      desc: "Professional ready-to-use templates for social media, presentations, and more.",
      icon: Smartphone,
    },
    {
      title: "Interior & Exterior",
      desc: "High-quality 3D modeling and design for modern spaces and structures.",
      icon: MapPin,
    },
    {
      title: "AI Automation",
      desc: "Smart AI-driven workflows to optimize your business efficiency and growth.",
      icon: Cpu,
    },
  ],
  faqs: [
    {
      q: "How long does it take to complete a project?",
      a: "The timeline depends on the project's complexity. Typically, a professional business website takes 2-4 weeks, while complex E-commerce or SaaS platforms may take 6-10 weeks.",
    },
    {
      q: "Do you provide post-launch maintenance and support?",
      a: "Yes, we offer 6 months of free maintenance and 24/7 technical support after deployment to ensure your digital product runs smoothly without any glitches.",
    },
    {
      q: "Will my website be mobile-friendly and SEO-optimized?",
      a: "Absolutely! Every project we build is 100% responsive (mobile-first design) and follows the latest SEO best practices to help you rank higher on search engines.",
    },
    {
      q: "Which technologies do you use for development?",
      a: "We specialize in the MERN stack (MongoDB, Express, React, Node.js), Tailwind CSS, and Next.js. For AI and Automation, we use Python and advanced API integrations.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes! We can revamp your current website with a modern UI/UX, faster loading speeds, and better performance while keeping your existing data safe.",
    },
  ],
  stats: [
    { label: "Expert Developers", value: "05+", icon: Briefcase },
    { label: "Current Projects", value: "Running", icon: Layers },
    { label: "Support", value: "24/7", icon: Headphones },
  ],
};

// --- SUB-COMPONENT: SECTION HEADING ---
const SectionHeading = ({ title, subtitle, isDarkMode }) => (
  <div className="text-center mb-16 space-y-4">
    <h2
      className={`text-3xl md:text-5xl font-black tracking-tighter ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
    >
      {title}
    </h2>
    <p
      className={`max-w-2xl mx-auto text-lg opacity-70 ${isDarkMode ? "text-blue-100" : "text-slate-600"}`}
    >
      {subtitle}
    </p>
    <div className="w-20 h-1.5 bg-[#00BF56] mx-auto rounded-full"></div>
  </div>
);

// --- SUB-COMPONENT: BOOKING MODAL ---
const ServiceModal = ({ isOpen, onClose, selectedService, isDarkMode }) => {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProviders, setShowProviders] = useState(false);
  const [providers, setProviders] = useState([]);
  const [formData, setFormData] = useState({
    client_name: "",
    service_type: "",
    location: "",
    phone: "",
    details: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service_type: selectedService || "Web Development",
      }));
      setIsSent(false);
      setShowProviders(false);
    }
  }, [isOpen, selectedService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const service = encodeURIComponent(formData.service_type);
      const location = encodeURIComponent(formData.location);
      const response = await fetch(
        `http://127.0.0.1:8000/api/providers/${service}/${location}/`,
      );
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      setProviders(data);
      setShowProviders(true);
    } catch (error) {
      console.error(error);
      alert("Error fetching providers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/request/service/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) setIsSent(true);
      else throw new Error("Submission failed");
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Naya Reset function for Back to form
  const handleReset = () => {
    setIsSent(false);
    setShowProviders(false);
  };

  if (!isOpen) return null;

  const inputClasses = `w-full p-4 rounded-xl border outline-none transition-all duration-200 
    ${
      isDarkMode
        ? "bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus:border-[#00BF56]"
        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00BF56]"
    }`;

  return (
    <>
      <Helmet>
        <title>Our Services | Web Development & UI/UX | WebTrezor</title>
        <meta
          name="description"
          content="Explore WebTrezor's professional services including MERN stack development, React applications, Shopify setup, branding and UI/UX design."
        />
        <meta
          name="keywords"
          content="MERN Stack Development, React Development Services, Shopify Setup India, UI UX Design Company, Custom Website Development"
        />
      </Helmet>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-[#0B3C5D]/80 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <div
          className={`relative w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl transition-all 
        ${isDarkMode ? "bg-[#0f1c2e] border border-white/10 text-white" : "bg-white text-slate-900"}`}
        >
          <div className="p-8 md:p-12">
            {showProviders ? (
              <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setShowProviders(false)}
                    className="p-2 rounded-full hover:bg-[#00BF56]/10 text-[#00BF56] transition-colors"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <h3 className="text-xl font-black italic">Providers</h3>
                  <X
                    className="cursor-pointer hover:text-red-500"
                    onClick={onClose}
                  />
                </div>

                {providers.length > 0 ? (
                  providers.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200 shadow-sm"}`}
                    >
                      <h4 className="font-black text-xl mb-1 flex items-center gap-2">
                        {p.name || p.provider_name}{" "}
                        <BadgeCheck size={18} className="text-[#00BF56]" />
                      </h4>
                      <p className="text-xs font-bold text-[#00BF56] uppercase flex items-center gap-1 mb-4">
                        <Zap size={12} /> {p.service_type || p.service_name}
                      </p>
                      <div className="flex gap-3">
                        <a
                          href={`tel:${p.phone || p.contact_no}`}
                          className="flex-1 bg-[#0B3C5D] text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#082a42] transition-colors"
                        >
                          <PhoneCall size={18} /> Call
                        </a>
                        <a
                          href={`https://wa.me/${p.phone || p.contact_no}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#00BF56] text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#00a34a] transition-colors"
                        >
                          <MessageSquare size={18} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center opacity-60 py-10">
                    <HelpCircle size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No providers found in {formData.location}.</p>
                  </div>
                )}
              </div>
            ) : isSent ? (
              <div className="text-center space-y-6 py-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-[#00BF56]/20 text-[#00BF56] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black italic">Success!</h3>
                <p className="opacity-70">Aapki enquiry submit ho gayi hai.</p>

                <div className="space-y-3">
                  <button
                    onClick={fetchProviders}
                    disabled={loading}
                    className="w-full bg-[#00BF56] text-white p-5 rounded-2xl font-black shadow-xl hover:scale-[1.05] transition-transform flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        View Local Providers <ChevronRight />
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleReset}
                    className={`w-full p-4 rounded-2xl font-bold transition-all border ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-slate-200 hover:bg-slate-50"}`}
                  >
                    Edit Inquiry / Back
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-3xl font-black italic">Book Service</h3>
                  <X
                    className="cursor-pointer hover:text-red-500 transition-colors"
                    onClick={onClose}
                  />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    required
                    name="client_name"
                    placeholder="Full Name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      required
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                    <input
                      required
                      name="location"
                      placeholder="City (e.g. Indore)"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    {[
                      "Web Development",
                      "Logo design",
                      "UI/UX Design",
                      "Templates design",
                      "Interior/Exterior",
                      "AI Automation",
                    ].map((s) => (
                      <option
                        key={s}
                        value={s}
                        className={isDarkMode ? "bg-slate-800" : "bg-white"}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    required
                    name="details"
                    rows="3"
                    placeholder="Project details..."
                    value={formData.details}
                    onChange={handleInputChange}
                    className={inputClasses}
                  ></textarea>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#00BF56] text-white p-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#00a34a] transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}{" "}
                    {loading ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeService, setActiveService] = useState("");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const openBookingModal = (serviceTitle = "") => {
    setActiveService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#051622]" : "bg-slate-50"}`}
    >
      <header className="relative pt-32 pb-32 lg:pb-48 px-6 bg-[#0B3C5D]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#00BF56] font-bold text-sm">
              <Sparkles size={16} /> Expert Agency Services
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white italic leading-tight tracking-tighter">
              Innovation Se <span className="text-[#00BF56]">Success</span> Tak.
            </h1>
            <p className="text-xl text-blue-100 opacity-80 max-w-xl mx-auto lg:mx-0">
              Start your journey toward a powerful professional digital presence
              by filling out the form below.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-5">
              <button
                onClick={() => openBookingModal("Web Development")}
                className="px-10 py-5 bg-[#00BF56] text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                Book Service
              </button>
            </div>
          </div>
          <div className="relative group hidden lg:block">
            <img
              src={serviceData.mainImage}
              className="relative rounded-[3rem] shadow-2xl border-4 border-white/10"
              alt="Hero"
            />
          </div>
        </div>
      </header>

      <div className="relative z-20 -mt-16 px-6">
        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-[2.5rem] shadow-2xl border ${isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-100"}`}
        >
          {serviceData.stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-6 p-4">
              <div className="w-16 h-16 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] flex items-center justify-center">
                <stat.icon size={32} />
              </div>
              <div>
                <div
                  className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-bold opacity-50 uppercase">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        <section>
          <SectionHeading
            title="Core Capabilities"
            subtitle="Explore our specialized services."
            isDarkMode={isDarkMode}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceData.features.map((feature, idx) => (
              <div
                key={idx}
                onClick={() => openBookingModal(feature.title)}
                className={`group p-10 rounded-[2.5rem] border transition-all cursor-pointer hover:-translate-y-3 ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-[#0B3C5D]/40" : "bg-white border-slate-100 hover:shadow-2xl"}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0B3C5D] text-white flex items-center justify-center mb-8 group-hover:bg-[#00BF56] transition-colors">
                  <feature.icon size={32} />
                </div>
                <h3
                  className={`text-2xl font-black mb-4 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  {feature.title}
                </h3>
                <p className="opacity-60 mb-8 leading-relaxed">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-2 text-[#00BF56] font-black">
                  Book Now <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2
              className={`text-4xl md:text-5xl font-black ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              Common <span className="text-[#00BF56]">Questions</span>
            </h2>
            <p
              className={`opacity-60 font-medium ${isDarkMode ? "text-blue-100" : "text-slate-600"}`}
            >
              Aapke dimaag mein chal rahe sawalon ke jawaab yahan hain.
            </p>
          </div>
          <div className="space-y-6 text-left">
            {serviceData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[2rem] border transition-all hover:border-[#00BF56]/50 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}
              >
                <h4
                  className={`text-xl font-bold mb-3 flex items-start gap-3 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  <HelpCircle className="text-[#00BF56] shrink-0" size={24} />{" "}
                  {faq.q}
                </h4>
                <p className="opacity-60 font-medium pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={activeService}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
