import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Rocket,
  Eye,
  Target,
  Code2,
  Palette,
  Layout,
  Globe,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";

const PRIMARY = "#0B3C5D";
const SECONDARY = "#00BF56";

// Shared Components
const SectionHeader = ({ title, subtitle, isDarkMode }) => (
  <div className="text-center mb-16 space-y-4">
    <span className="text-[#00BF56] font-bold tracking-[0.3em] uppercase text-sm">
      {subtitle}
    </span>
    <h2
      className={`text-4xl md:text-6xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
    >
      {title}
    </h2>
    <div className="w-24 h-2 bg-[#00BF56] mx-auto rounded-full"></div>
  </div>
);

const GlassCard = ({ icon: Icon, title, description, isDarkMode }) => (
  <div
    className={`p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 group ${
      isDarkMode
        ? "bg-white/5 border-white/10 hover:bg-white/10"
        : "bg-white border-slate-200 shadow-xl"
    }`}
  >
    <div className="mb-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00BF56]/10 text-[#00BF56] group-hover:bg-[#00BF56] group-hover:text-white transition-colors duration-500">
      <Icon size={32} />
    </div>
    <h3
      className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
    >
      {title}
    </h3>
    <p
      className={`leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
    >
      {description}
    </p>
  </div>
);

const TeamMember = ({
  name,
  role,
  bio,
  image,
  isDarkMode,
  linkedin,
  github,
}) => (
  <div
    className={`group relative p-8 rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${
      isDarkMode
        ? "bg-slate-900 border-white/5 hover:border-[#00BF56]/50"
        : "bg-white border-slate-100 shadow-lg hover:shadow-2xl"
    }`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
      <Cpu size={80} />
    </div>
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* FOUNDER IMAGE WRAPPER */}
      <div className="relative mb-6">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#00BF56] to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#00BF56]/20 bg-slate-800">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name}&background=0B3C5D&color=fff`;
            }}
          />
        </div>
      </div>

      <h4
        className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
      >
        {name}
      </h4>
      <p className="text-[#00BF56] font-bold text-sm uppercase tracking-widest mb-4">
        {role}
      </p>
      <p
        className={`text-sm leading-relaxed mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        {bio}
      </p>
      <div className="flex gap-4">
        {linkedin && linkedin !== "NA" && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-white/5 text-slate-400 hover:text-[#00BF56]"
                : "bg-slate-50 text-slate-500 hover:text-[#00BF56]"
            }`}
          >
            <Linkedin size={18} />
          </a>
        )}
        {github && github !== "NA" && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-white/5 text-slate-400 hover:text-[#00BF56]"
                : "bg-slate-50 text-slate-500 hover:text-[#00BF56]"
            }`}
          >
            <Github size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function About() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Helper to format Google Drive links to direct image links
  const getDirectLink = (url) => {
    if (url.includes("drive.google.com")) {
      const id = url.split("/d/")[1]?.split("/")[0];
      return `https://lh3.googleusercontent.com/d/${id}`;
    }
    return url;
  };

  return (
    <>
      <Helmet>
        <title>About WebTrezor | Modern Web Development Agency</title>
        <meta
          name="description"
          content="Learn about WebTrezor, a modern web development agency focused on building scalable MERN stack applications and premium UI/UX experiences."
        />
        <meta
          name="keywords"
          content="About WebTrezor, Web Development Agency India, MERN Stack Company, React Experts India"
        />
      </Helmet>

      <div
        className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? "bg-[#051622] text-white" : "bg-slate-50 text-slate-900"}`}
      >
        {/* Hero Section */}
        <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
              alt="Collaboration"
              className={`w-full h-full object-cover transition-opacity duration-1000 ${isDarkMode ? "opacity-20" : "opacity-10"}`}
            />
            <div
              className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-b from-[#051622]/50 to-[#051622]" : "bg-gradient-to-b from-white/30 to-slate-50"}`}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BF56]/10 text-[#00BF56] font-bold text-sm mb-8 animate-pulse">
              <Target size={16} /> 4 B.Tech Graduates • One Vision
            </div>
            <h1
              className={`text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              Architecting Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BF56] to-emerald-400">
                Digital Identity.
              </span>
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              WebTrezor empowers startups and businesses with high-quality,
              professional, and scalable digital solutions.
            </p>
          </div>
        </div>

        {/* About Us Detailed Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 rounded-lg bg-[#00BF56]/10 text-[#00BF56] font-bold text-sm uppercase tracking-wider">
                About Us
              </div>
              <h2
                className={`text-4xl md:text-5xl font-black italic tracking-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
              >
                Passionate Creators <br />{" "}
                <span className="text-[#00BF56]">Dedicated to You.</span>
              </h2>
              <p
                className={`text-lg leading-relaxed opacity-80 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                At WebTrezor, we are a passionate team of young developers and
                designers dedicated to building powerful digital solutions for
                modern businesses. Founded by a group of four B.Tech graduates,
                WebTrezor was created with a simple vision — to help
                individuals, startups, and businesses build their online
                presence with confidence and creativity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Website Development",
                  "Logo & Brand Design",
                  "UI/UX Design",
                  "Templates & Digital Assets",
                  "Custom Web Solutions",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-[#00BF56]" />
                    <span
                      className={`font-bold opacity-90 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#00BF56] opacity-10 blur-2xl rounded-full"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                className="relative rounded-[3rem] border-8 border-white/5 shadow-2xl transition-transform group-hover:scale-[1.02] duration-500"
                alt="Team Work"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="container mx-auto px-6 mb-32 relative z-20">
          <div
            className={`grid md:grid-cols-3 gap-8 p-10 rounded-[3rem] border backdrop-blur-xl ${
              isDarkMode
                ? "bg-slate-900 border-white/10 shadow-2xl"
                : "bg-white border-slate-200 shadow-2xl"
            }`}
          >
            {[
              {
                label: "Founded By",
                value: "4 Engineers",
                sub: "B.Tech Professionals",
              },
              {
                label: "Our Specialty",
                value: "Custom Solutions",
                sub: "End-to-End Delivery",
              },
              {
                label: "Client Focus",
                value: "Quality First",
                sub: "100% Transparency",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center md:border-r last:border-0 ${isDarkMode ? "border-white/10" : "border-slate-200"}`}
              >
                <p className="text-[#00BF56] font-black uppercase text-xs tracking-widest mb-2">
                  {stat.label}
                </p>
                <h3
                  className={`text-3xl font-black mb-1 ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  {stat.value}
                </h3>
                <p className="text-sm opacity-50">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <section className="py-20 container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <GlassCard
              icon={Rocket}
              title="Our Mission"
              isDarkMode={isDarkMode}
              description="To provide high-quality, affordable, and reliable digital services. We aim to empower startups by giving them branding that truly represents their vision."
            />
            <GlassCard
              icon={Eye}
              title="Our Vision"
              isDarkMode={isDarkMode}
              description="To become a trusted global digital partner, known for delivering innovative, user-friendly, and result-oriented digital solutions."
            />
          </div>
        </section>

        {/* Expertise Section */}
        <section
          className={`py-32 ${isDarkMode ? "bg-white/5" : "bg-slate-100"}`}
        >
          <div className="container mx-auto px-6 text-center">
            <SectionHeader
              title="What We Excel At"
              subtitle="Our Specializations"
              isDarkMode={isDarkMode}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[
                { icon: Code2, label: "Web Development" },
                { icon: Palette, label: "Brand Design" },
                { icon: Layout, label: "UI/UX Design" },
                { icon: Globe, label: "Custom Solutions" },
                { icon: ShieldCheck, label: "Digital Assets" },
              ].map((skill, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl flex flex-col items-center gap-4 transition-all hover:scale-105 ${isDarkMode ? "bg-slate-900 border border-white/5" : "bg-white shadow-sm border border-slate-100"}`}
                >
                  <div className="text-[#00BF56]">
                    <skill.icon size={32} />
                  </div>
                  <span
                    className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}
                  >
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section with Images & Specific Links */}
        <section className="py-32 container mx-auto px-6">
          <SectionHeader
            title="Meet The Founders"
            subtitle="Our Strong Core"
            isDarkMode={isDarkMode}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Sonu Patidar"
              role="Frontend Developer"
              image={getDirectLink(
                "https://drive.google.com/file/d/1kfz_mdMug1pkmhVtZmDtSXtNdnLFdQ2w/view?usp=sharing",
              )}
              bio="Expert in building modern, responsive, and user-friendly web interfaces."
              isDarkMode={isDarkMode}
              linkedin="https://www.linkedin.com/in/sonu-patidar-98822527a/"
              github="https://github.com/sonupatidar123"
            />
            <TeamMember
              name="Narendra Patidar"
              role="Backend Developer"
              image={getDirectLink(
                "https://drive.google.com/file/d/1uErpsYY-Sbq29OKJtRsDfXAlADwxd-4t/view?usp=sharing",
              )}
              bio="Specialized in server-side development, APIs, and database management."
              isDarkMode={isDarkMode}
              linkedin="https://www.linkedin.com/in/narendra-patidar-836b21365/"
              github="https://github.com/Narendrapatidar5639"
            />
            <TeamMember
              name="Hariprasad Patidar"
              role="UI/UX & Design"
              image={getDirectLink(
                "https://drive.google.com/file/d/1L6MfZegOeS2ss_5I4zoJCDSQufKBBRZf/view?usp=sharing",
              )}
              bio="Focused on creating clean, professional, and brand-oriented designs."
              isDarkMode={isDarkMode}
              linkedin="https://www.linkedin.com/in/hariprasad-patidar-a955b3305/"
              github="https://github.com/Hariprasadpatidar"
            />
            <TeamMember
              name="Rohit Patidar"
              role="Full Stack Developer"
              image={getDirectLink(
                "https://drive.google.com/file/d/16FHUoNMc8SywfczmhiLbv633wV8AsRcy/view?usp=sharing",
              )}
              bio="Handles both frontend and backend with performance and scalability."
              isDarkMode={isDarkMode}
              linkedin="https://www.linkedin.com/in/rohitpatidar5001/"
              github="https://github.com/Rohitpatidar1?tab=repositories"
            />
          </div>
        </section>

        {/* Values Section */}
        <section
          className={`py-32 ${isDarkMode ? "bg-[#00BF56]/5" : "bg-[#00BF56]/10"}`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2
                  className={`text-4xl md:text-5xl font-black mb-8 italic ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  Why Partner With{" "}
                  <span className="text-[#00BF56]">WebTrezor?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Quality over quantity",
                    "Transparency & honesty",
                    "Continuous learning",
                    "Client satisfaction",
                    "Team collaboration",
                  ].map((value, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#00BF56] flex items-center justify-center text-white">
                        <ShieldCheck size={18} />
                      </div>
                      <span
                        className={`text-xl font-bold opacity-80 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`p-10 rounded-[3rem] border ${isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-200 shadow-2xl"}`}
              >
                <p
                  className={`text-lg leading-relaxed italic opacity-70 mb-8 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  "Humne ek aisi team banayi jo sirf code nahi likhti, balki
                  aapke sapno ko ek digital architecture deti hai. At WebTrezor,
                  we don’t just build websites — we build digital identities."
                </p>
                <button className="flex items-center gap-2 text-[#00BF56] font-black text-xl hover:translate-x-2 transition-transform">
                  Let's Discuss Your Project <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-24 container mx-auto px-6">
          <div className="bg-[#0B3C5D] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#00BF56] opacity-10 rounded-full blur-[100px] -ml-20 -mt-20 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white italic mb-10 tracking-tight leading-tight">
                Ready to Secure Your <br />
                <span className="text-[#00BF56]">Digital Future?</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => (window.location.href = "/buyservices")}
                  className="bg-[#00BF56] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  START YOUR PROJECT
                </button>
                <button
                  onClick={() => (window.location.href = "/services")}
                  className="px-12 py-5 rounded-2xl font-black text-xl border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  VIEW OUR SERVICES
                </button>
              </div>
            </div>
          </div>
        </section>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      </div>
    </>
  );
}
