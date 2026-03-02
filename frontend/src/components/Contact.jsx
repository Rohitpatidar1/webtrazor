import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Linkedin,
  Twitter,
  Github,
  Globe,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // State for form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  // Business Details - FIXED URLs
  const contactDetails = {
    address: "Indore, Madhya Pradesh, India",
    phone: "+917389674558",
    displayPhone: "+91 7389674558",
    email: "webtrezor01@gmail.com",
    // Fixed: Search query for Indore location
    mapExternalLink:
      "https://www.google.com/maps/search/?api=1&query=Indore+Madhya+Pradesh+India",
    // Fixed: Working Google Maps Embed URL for Indore
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.5553034947!2d75.76437149726563!3d22.723911700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b4cbd13%3A0x6d9006691f37920!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin",
    socials: {
      // Fixed: No leading slash
      linkedin: "https://www.linkedin.com/in/web-trezor-8992093b2/",
      github: "https://github.com/webtrezor01-cmd",
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FORMSPREE_URL = "https://formspree.io/f/mqedjbez";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Success! Your message has been sent to WebTrezor.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Check your connection.");
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:ring-4 focus:ring-[#00BF56]/10 ${
    isDarkMode
      ? "bg-slate-800 border-white/10 text-white placeholder:text-slate-500 focus:border-[#00BF56]"
      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-[#00BF56]"
  }`;

  return (
    <>
      <Helmet>
        <title>Contact WebTrezor | Hire MERN Stack Developers</title>
        <meta
          name="description"
          content="Get in touch with WebTrezor for professional website development, MERN stack applications and UI/UX design services."
        />
        <meta
          name="keywords"
          content="Hire React Developer India, Contact Web Development Company, MERN Stack Agency India, Website Development Inquiry"
        />
      </Helmet>

      <div
        className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#051622]" : "bg-slate-50"}`}
      >
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#0B3C5D] text-white">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00BF56] opacity-10 rounded-full blur-[100px] -ml-20 -mt-20 animate-pulse"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 italic">
              Let’s Build Something{" "}
              <span className="text-[#00BF56]">Amazing</span> 🚀
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto opacity-80 leading-relaxed font-medium">
              Have a project idea? Our team at WebTrezor is ready to help you
              navigate your digital journey.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-6 -mt-16 pb-24 relative z-20">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Panel: Contact Info */}
            <aside
              className={`p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between transition-all ${isDarkMode ? "bg-[#0a2538] border border-white/5" : "bg-white border border-slate-100"}`}
            >
              <div className="space-y-10">
                <h3
                  className={`text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                >
                  Get In Touch 📍
                </h3>

                <div className="space-y-8">
                  <a
                    href={contactDetails.mapExternalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-5 group cursor-pointer"
                  >
                    <div className="p-4 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] group-hover:bg-[#00BF56] group-hover:text-white transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest opacity-50 block mb-1">
                        Office Location
                      </label>
                      <p
                        className={`font-bold transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-[#00BF56]" : "text-slate-700 group-hover:text-[#00BF56]"}`}
                      >
                        {contactDetails.address}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${contactDetails.phone}`}
                    className="flex items-start gap-5 group cursor-pointer"
                  >
                    <div className="p-4 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] group-hover:bg-[#00BF56] group-hover:text-white transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest opacity-50 block mb-1">
                        Contact Number
                      </label>
                      <p
                        className={`font-bold transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-[#00BF56]" : "text-slate-700 group-hover:text-[#00BF56]"}`}
                      >
                        {contactDetails.displayPhone}
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-start gap-5 group cursor-pointer"
                  >
                    <div className="p-4 rounded-2xl bg-[#00BF56]/10 text-[#00BF56] group-hover:bg-[#00BF56] group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <label className="text-xs font-black uppercase tracking-widest opacity-50 block mb-1">
                        Email Address
                      </label>
                      <p
                        className={`font-bold transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-[#00BF56]" : "text-slate-700 group-hover:text-[#00BF56]"}`}
                      >
                        {contactDetails.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-slate-500/10">
                <p
                  className={`text-sm font-black mb-6 uppercase tracking-widest ${isDarkMode ? "text-white/40" : "text-[#0B3C5D]/40"}`}
                >
                  Connect with us
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, url: contactDetails.socials.linkedin },
                    { icon: Twitter, url: contactDetails.socials.twitter },
                    { icon: Github, url: contactDetails.socials.github },
                    { icon: Globe, url: contactDetails.socials.website },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all ${
                        isDarkMode
                          ? "border-white/10 text-white hover:bg-[#00BF56]"
                          : "border-slate-200 text-[#0B3C5D] hover:bg-[#00BF56] hover:text-white"
                      }`}
                    >
                      <item.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Panel: Contact Form */}
            <main
              className={`lg:col-span-2 p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden transition-all ${isDarkMode ? "bg-[#0a2538] border border-white/5" : "bg-white border border-slate-100"}`}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#00BF56]"></div>
              <h3
                className={`text-3xl font-black mb-10 tracking-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
              >
                Send a Message ✉️
              </h3>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={inputClasses}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className={inputClasses}
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 00000 00000"
                    className={inputClasses}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Subject
                  </label>
                  <select
                    name="subject"
                    className={inputClasses}
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option>General Inquiry</option>
                    <option>Project Consultation</option>
                    <option>Partnership</option>
                    <option>Support</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold opacity-70">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    className={`${inputClasses} resize-none`}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-5 bg-[#00BF56] text-white font-black rounded-2xl shadow-xl shadow-[#00BF56]/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                  >
                    Submit Now <Send size={20} />
                  </button>
                </div>
              </form>
            </main>
          </div>

          {/* Map Section */}
          <div className="mt-20 relative rounded-[3rem] overflow-hidden h-[450px] shadow-2xl border-4 border-white/5">
            <div className="absolute top-6 left-6 z-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/20">
              <div className="w-3 h-3 bg-[#00BF56] rounded-full animate-ping"></div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                WebTrezor HQ
              </span>
            </div>
            <iframe
              title="Google Map"
              className={`w-full h-full transition-all duration-700 ${isDarkMode ? "grayscale invert-[0.9] contrast-[1.2] brightness-[0.8]" : ""}`}
              src={contactDetails.mapEmbedUrl}
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen=""
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
