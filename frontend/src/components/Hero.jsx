import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { API_BASE } from "../config";
import {
  Settings,
  Code,
  ShieldCheck,
  Cpu,
  Briefcase,
  CheckCircle,
  Users,
  Clock,
  ChevronRight,
  Layers,
  Search,
  Wrench,
  Plus,
  Minus,
  Mail,
  Loader2,
  Monitor,
  LayoutTemplate,
  Palette,
  PenTool,
  ArrowRight,
  Rocket,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  // --- SCROLL ANIMATION LOGIC (isVisible) ---
  const [isVisible, setIsVisible] = useState(false);
  const serviceSectionRef = useRef(null);
  // --- FEEDBACK API STATE ---
  const [dynamicFeedbacks, setDynamicFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (serviceSectionRef.current) {
      observer.observe(serviceSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  // --- API STATE ---
  const [latestProjects, setLatestProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  // --- FETCH LATEST PROJECTS ---
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/latest-projects/`);
        const data = await response.json();
        setLatestProjects(data);
      } catch (error) {
        console.error("Error fetching latest projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchLatest();
  }, []);
  // --- DEFINING COLORS TO FIX REFERENCE ERRORS ---
  const primaryColor = "#0B3C5D";
  const secondaryColor = "#00BF56";

  // --- FETCH FEEDBACKS FROM API ---
  // 1. Wrap the logic in useEffect to ensure it runs when the page loads
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/feedback/`);
        const data = await response.json();

        if (Array.isArray(data)) {
          // Map the API fields to the names your component expects
          const formattedData = data.map((item) => ({
            ...item,
            comment: item.comment || item.message || item.text, // Fallback chain
            name: item.name || item.user_name || "Anonymous",
            role: item.role || item.designation || "Client",
          }));
          setDynamicFeedbacks(formattedData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoadingFeedbacks(false);
      }
    };
    fetchFeedbacks();
  }, []); // The empty array [] makes it run only once
  // Static Data Objects
  const services = [
    {
      title: "Web Design",
      desc: "Creating stunning, high-performance websites that captivate your audience.",
      icon: <Monitor size={28} />,
    },
    {
      title: "UI/UX Design",
      desc: "Crafting intuitive and user-centric interfaces for seamless digital experiences.",
      icon: <LayoutTemplate size={28} />,
    },
    {
      title: "Logo Design",
      desc: "Building unique brand identities with timeless logo designs that resonate.",
      icon: <Palette size={28} />,
    },
    {
      title: "Template Design",
      desc: "Providing custom, ready-to-use digital templates tailored for your business.",
      icon: <PenTool size={28} />,
    },
  ];
  const steps = [
    { id: "01", title: "Fill Form", icon: <Mail />, link: "/buyservices" },
    { id: "02", title: "Online/offline Meeting", icon: <Users /> },
    { id: "03", title: "Requirement", icon: <Search /> },
    { id: "04", title: "Design", icon: <Palette /> },
    { id: "05", title: "Development", icon: <Code /> },
    { id: "06", title: "Deployment", icon: <Rocket /> },
    { id: "07", title: "Maintenance", icon: <Wrench /> },
  ];
  const faqs = [
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
  ];

  const stats = [
    {
      label: "New & Growing Startup",
      value: "2026",
      icon: <Rocket size={20} />,
    },
    { label: "Dedicated Team", value: "5+ Members", icon: <Users size={20} /> },
    {
      label: "Projects in Progress",
      value: "10+",
      icon: <Briefcase size={20} />,
    },
    { label: "Customer Support", value: "24/7", icon: <Clock size={20} /> },
  ];

  const feedbacks = [
    {
      name: "Sandeep Sharma",
      role: "Startup Founder",
      comment:
        "Webtrezor ne hamari business website ko ek premium look diya hai. Support aur delivery dono top-notch hain!",
      stars: 5,
    },
    {
      name: "Anjali Verma",
      role: "E-commerce Owner",
      comment:
        "Project delivery time se pehle hui. UI design itna clean hai ki hamari sales mein 20% growth aayi.",
      stars: 5,
    },
    {
      name: "Vikram Rathore",
      role: "Tech Consultant",
      comment:
        "Code quality aur scalability par inka focus kamaal ka hai. MERN stack projects ke liye best team.",
      stars: 5,
    },
  ];
  const displayFeedbacks =
    dynamicFeedbacks.length > 0 ? dynamicFeedbacks : feedbacks;
  return (
    <>
      <Helmet>
        <title>WebTrezor | Web Development Company in India</title>
        <meta
          name="description"
          content="WebTrezor builds modern MERN stack applications and premium UI/UX designs."
        />
      </Helmet>

      <div
        className={`min-h-screen transition-colors duration-500 font-sans ${isDarkMode ? "bg-[#051622] text-white" : "bg-gray-50 text-slate-900"}`}
      >
        {/* --- HERO MAIN SECTION --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 -left-20 w-96 h-96 bg-[#00BF56] rounded-full blur-[120px]"
          ></motion.div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 space-y-8 text-center lg:text-left"
            >
              <h1
                className={`text-5xl lg:text-7xl font-black leading-tight tracking-tight italic ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                From Innovation <br /> To Global{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BF56] to-emerald-400">
                  Success
                </span>{" "}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`text-xl max-w-lg mx-auto lg:mx-0 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
              >
                We don’t just write code; we transform your vision into digital
                reality. Delivering high-end technology solutions.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/buyservices" className="inline-block no-underline">
                  <button className="px-8 py-4 bg-[#00BF56] text-white font-bold rounded-2xl shadow-xl hover:shadow-[#00BF56]/20 transition-all flex items-center gap-2 border-none cursor-pointer">
                    Make Your WebSite <Rocket size={20} />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, r: 20 }}
              whileInView={{ opacity: 1, scale: 1, r: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:w-1/2 relative group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00BF56] to-emerald-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
                  className="relative rounded-[3rem] shadow-2xl border-8 border-white/5 group-hover:scale-[1.02] transition-transform duration-700"
                  alt="Team"
                />
              </div>
            </motion.div>
          </div>
        </section>
        {/* --- STATS SECTION --- */}
        <section className="py-12 px-6 -mt-16 relative z-20">
          <div
            className={`max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 p-10 rounded-[2.5rem] shadow-2xl border ${isDarkMode ? "bg-[#0B3C5D]/40 border-white/10 backdrop-blur-lg" : "bg-white border-slate-100"}`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] flex items-center justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black">{stat.value}</h3>
                <p className="text-sm font-medium opacity-50">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section
          ref={serviceSectionRef}
          id="services"
          className="py-24 px-6 max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-[#00BF56] font-black uppercase tracking-widest text-xs italic">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-black mt-4">
              Our Expert Services
            </h2>
            <div className="w-20 h-2 bg-[#00BF56] mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => {
              const animName = i === 1 ? "slideFromBottom" : "slideFromTop";
              return (
                <div
                  key={i}
                  className={`p-8 rounded-[2.5rem] border transition-all group hover:-translate-y-2 ${isDarkMode ? "bg-white/5 border-white/10 hover:bg-[#0B3C5D]/40" : "bg-white border-slate-100 hover:shadow-2xl"}`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible
                      ? `${animName} 0.8s ease-out ${i * 0.2}s forwards`
                      : "none",
                  }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0B3C5D] text-white flex items-center justify-center mb-6 group-hover:bg-[#00BF56] group-hover:shadow-[0_0_20px_#00BF56] transition-all shadow-lg">
                    {s.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-[#00BF56] transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div
            className="mt-16 text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "all 1s ease-out 0.8s",
            }}
          >
            <Link to="/services" className="no-underline inline-block">
              <button className="group relative px-10 py-4 bg-[#0B3C5D] text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl border-none cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00BF56] to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span className="text-lg">Explore All Services</span>
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform duration-300"
                    size={22}
                  />
                </div>
                <div className="absolute -inset-1 bg-[#00BF56] rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-300"></div>
              </button>
            </Link>
          </div>
        </section>

        {/* --- PROJECTS SECTION --- */}
        <section
          id="projects"
          className={`py-24 px-6 transition-all relative overflow-hidden ${isDarkMode ? "bg-[#051622]" : "bg-gray-50"}`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00BF56] opacity-[0.03] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6"
            >
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">
                  Explore{" "}
                  <span className="text-[#00BF56] drop-shadow-sm">
                    Projects
                  </span>
                </h2>
                <p
                  className={`mt-2 font-medium opacity-60 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Designed for Performance. Developed for Perfection.
                </p>
              </div>
              <Link
                to="/projects"
                className="group flex items-center gap-2 text-[#00BF56] font-bold no-underline"
              >
                <span className="border-b-2 border-transparent group-hover:border-[#00BF56] transition-all duration-300">
                  View All Projects
                </span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </Link>
            </motion.div>

            {loadingProjects ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="animate-spin text-[#00BF56]" size={40} />
                <p className="font-bold opacity-50 animate-pulse">
                  Fetching Masterpieces...
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-10">
                {latestProjects.map((p, i) => {
                  const imageUrl =
                    p.media && p.media.length > 0
                      ? p.media[0].file
                      : "https://via.placeholder.com/600x400";
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ y: -15 }}
                      onClick={() =>
                        (window.location.href = `/projects/${p.id}`)
                      }
                      className={`group rounded-[2.5rem] overflow-hidden shadow-2xl cursor-pointer transition-all duration-500 border ${isDarkMode ? "bg-[#0a2538]/80 border-white/5" : "bg-white border-slate-100"}`}
                    >
                      <div className="h-72 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[#00BF56]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                          <div className="bg-white text-black p-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                            <ChevronRight size={24} />
                          </div>
                        </div>
                        <motion.img
                          src={imageUrl}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                          className="w-full h-full object-cover transition duration-700"
                          alt={p.title}
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 relative">
                        <p className="text-[#00BF56] text-xs font-black uppercase tracking-[0.2em]">
                          {p.category_name || "Development"}
                        </p>
                        <h4
                          className={`text-2xl font-black truncate group-hover:text-[#00BF56] transition-colors duration-300 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                        >
                          {p.title}
                        </h4>
                        <div className="w-0 group-hover:w-full h-1 bg-[#00BF56] mt-4 transition-all duration-500 rounded-full opacity-30"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        {/* --- PROCESS SECTION --- */}
        <section
          id="process"
          className={`py-24 px-6 overflow-hidden ${isDarkMode ? "bg-[#051622]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-black italic">
                How it <span className="text-[#00BF56]">Works?</span>
              </h2>
              <p className="mt-4 opacity-60 font-medium">
                Simple steps to bring your vision to life
              </p>
            </motion.div>
            <div className="relative">
              <div className="hidden lg:block absolute top-10 left-0 w-full h-[2px] z-0 px-20">
                <div className="w-full h-full border-t-2 border-dashed border-[#00BF56]/30"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-16 gap-x-4 relative z-10">
                {steps.map((step, i) => {
                  const content = (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative group cursor-pointer"
                    >
                      <div
                        className={`w-20 h-20 rounded-[2rem] mx-auto mb-6 flex items-center justify-center transition-all duration-500 relative z-10 ${isDarkMode ? "bg-[#0a2538] border border-white/10 group-hover:bg-[#00BF56] group-hover:border-[#00BF56]" : "bg-white shadow-xl group-hover:bg-[#00BF56] group-hover:text-white"}`}
                      >
                        {React.cloneElement(step.icon, {
                          size: 32,
                          className:
                            "group-hover:scale-110 transition-transform duration-300",
                        })}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#00BF56] text-white text-[10px] font-black flex items-center justify-center border-4 border-[#051622] shadow-lg group-hover:scale-110 transition-transform">
                          {step.id}
                        </div>
                      </div>
                      <h4
                        className={`font-black text-sm uppercase tracking-wider group-hover:text-[#00BF56] transition-colors ${isDarkMode ? "text-white" : "text-slate-800"}`}
                      >
                        {step.title}
                      </h4>
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#00BF56] opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity"></div>
                    </motion.div>
                  );
                  return step.link ? (
                    <Link key={i} to={step.link} className="no-underline">
                      {content}
                    </Link>
                  ) : (
                    content
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* --- NEWSLETTER CTA / CONTACT SECTION --- */}
        <section className="py-24 px-6 relative overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-[#00BF56] rounded-full blur-[120px] pointer-events-none"
          />
          <div
            className={`max-w-7xl mx-auto rounded-[3.5rem] p-8 lg:p-16 relative border overflow-hidden ${isDarkMode ? "bg-[#0a2538]/50 border-white/5 backdrop-blur-xl" : "bg-white border-slate-100 shadow-2xl"}`}
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00BF56]/10 blur-[80px] rounded-full"></div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-3/5 text-center lg:text-left space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BF56]/10 text-[#00BF56] text-sm font-bold tracking-widest uppercase">
                  <Sparkles size={16} className="animate-pulse" /> Ready to
                  scale?
                </div>
                <h2
                  className={`text-4xl lg:text-7xl font-black leading-tight tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}
                >
                  Have a Project in Mind? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BF56] to-emerald-400 italic">
                    Let's Build it Together.
                  </span>
                </h2>
                <p
                  className={`text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Hum sirf websites nahi banate, hum scalable digital solutions
                  create karte hain. Aaj hi apna free consultation call schedule
                  karein.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <Link to="/contact" className="no-underline">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 20px 40px rgba(0, 191, 86, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 bg-[#00BF56] text-white font-black rounded-2xl shadow-xl flex items-center gap-3 border-none cursor-pointer text-lg"
                    >
                      Start Your Journey <ArrowUpRight size={22} />
                    </motion.button>
                  </Link>
                  {/* WhatsApp Button Integration */}
                  <a
                    href="https://wa.me/7724883202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className={`px-10 py-5 font-black rounded-2xl transition-all flex items-center gap-3 border cursor-pointer text-lg ${isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-900 hover:bg-slate-100"}`}
                    >
                      Chat on WhatsApp <MessageSquare size={22} />
                    </motion.button>
                  </a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                className="lg:w-2/5 w-full"
              >
                <div
                  className={`p-10 rounded-[2.5rem] border relative overflow-hidden group ${isDarkMode ? "bg-[#0b1a2b] border-white/10 shadow-3xl" : "bg-white border-slate-200 shadow-2xl"}`}
                >
                  <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
                    <svg width="150" height="150" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00BF56] to-emerald-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[#00BF56]/20">
                        RP
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">Rohit Patidar</h4>
                        <p className="text-sm text-[#00BF56] font-bold">
                          Founder, Webtrezor
                        </p>
                      </div>
                    </div>
                    <blockquote className="text-lg italic opacity-80 leading-relaxed font-medium">
                      "Quality delivery aur client satisfaction hamari priority
                      hai. Har line of code hum perfection ke saath likhte
                      hain."
                    </blockquote>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div>
                        <p className="text-3xl font-black text-[#00BF56]">
                          99%
                        </p>
                        <p className="text-xs uppercase font-bold opacity-50 tracking-widest">
                          Success Rate
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-black text-[#00BF56]">
                          24h
                        </p>
                        <p className="text-xs uppercase font-bold opacity-50 tracking-widest">
                          Avg. Response
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00BF56]/20 blur-3xl rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* --- PREMIUM FEEDBACK SECTION --- */}

        <section className="py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-transparent">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#00BF56]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-left mb-16 relative">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                style={{ color: secondaryColor }}
                className="block font-black uppercase tracking-[0.3em] text-xs mb-3"
              >
                // Real Testimonials
              </motion.span>

              <h2
                className={`text-5xl md:text-7xl font-black tracking-tighter leading-none ${
                  isDarkMode ? "text-white" : "text-[#0B3C5D]"
                }`}
              >
                What People <br />
                <span
                  className="italic text-transparent bg-clip-text bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${secondaryColor}, #10b981)`,
                  }}
                >
                  Are Saying
                </span>
              </h2>
            </div>

            {/* Marquee Container */}
            <div className="flex overflow-visible">
              {loadingFeedbacks && dynamicFeedbacks.length === 0 ? (
                <div className="w-full text-center py-10">
                  <Loader2
                    className="animate-spin mx-auto"
                    style={{ color: secondaryColor }}
                  />
                </div>
              ) : (
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex space-x-6 md:space-x-10 min-w-full"
                >
                  {[...displayFeedbacks, ...displayFeedbacks].map((f, i) => (
                    <div
                      key={i}
                      className={`flex-shrink-0 w-[320px] md:w-[420px] p-8 md:p-12 rounded-[2.5rem] border-2 transition-all duration-700 relative group/card ${
                        isDarkMode
                          ? "bg-slate-900/40 border-white/5 hover:border-[#00BF56]/50 backdrop-blur-md"
                          : "bg-white border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(0,191,86,0.15)]"
                      } hover:-translate-y-4`}
                    >
                      {/* Decorative Quote Mark */}
                      <span
                        className="absolute top-6 right-10 text-8xl font-serif opacity-10 group-hover/card:opacity-20 transition-opacity pointer-events-none"
                        style={{ color: secondaryColor }}
                      >
                        “
                      </span>

                      {/* STARS SECTION - UPDATED FOR BETTER VISIBILITY */}
                      <div className="flex gap-1.5 mb-8">
                        {[...Array(5)].map((_, idx) => (
                          <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={
                              idx < (f.stars || 5)
                                ? secondaryColor
                                : "transparent"
                            }
                            stroke={secondaryColor}
                            strokeWidth="1.5"
                            className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover/card:scale-110"
                            style={{
                              filter:
                                idx < (f.stars || 5)
                                  ? `drop-shadow(0 0 5px ${secondaryColor}66)`
                                  : "none",
                            }}
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      {/* Feedback Comment */}
                      <p
                        className={`text-lg md:text-xl leading-relaxed mb-12 font-bold italic min-h-[120px] ${
                          isDarkMode ? "text-slate-300" : "text-black"
                        }`}
                      >
                        "{f.comment}"
                      </p>

                      {/* User Profile */}
                      <div
                        className="flex items-center gap-4 border-t pt-8"
                        style={{
                          borderColor: isDarkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.05)",
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center text-white font-bold shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${secondaryColor}, #0B3C5D)`,
                          }}
                        >
                          {f.name ? f.name.charAt(0) : "U"}
                        </div>
                        <div>
                          <h4
                            className={`font-black text-lg ${isDarkMode ? "text-white" : "text-black"}`}
                          >
                            {f.name}
                          </h4>
                          <p
                            className="text-[10px] font-black uppercase tracking-widest"
                            style={{ color: secondaryColor }}
                          >
                            {f.role}
                          </p>
                        </div>
                      </div>

                      {/* Full Card Glow on Hover */}
                      <div
                        className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[0_0_40px_rgba(0,191,86,0.1)] border-2"
                        style={{ borderColor: secondaryColor }}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
        {/* --- FAQ SECTION --- */}
        <section className="py-24 px-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12 italic">
            Common <span className="text-[#00BF56]">Questions</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}
              >
                <button
                  className="w-full p-6 text-left flex justify-between items-center font-bold"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  {faq.q}
                  {activeFaq === i ? (
                    <Minus className="text-[#00BF56]" />
                  ) : (
                    <Plus />
                  )}
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 opacity-70 border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes slideRight { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideFromTop { from { opacity: 0; transform: translateY(-60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideFromBottom { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
      `,
          }}
        />
      </div>
    </>
  );
};

export default Hero;
