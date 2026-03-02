import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  Quote,
  Loader2,
  MapPin,
  Tag,
  Star,
  ExternalLink,
  Code2,
  Cpu,
  Image as ImageIcon,
  Play,
  Calendar,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";

const SectionHeading = ({ children, icon: Icon, isDarkMode }) => (
  <div className="flex items-center gap-3 mb-8 group">
    <div
      className={`p-2.5 rounded-xl ${isDarkMode ? "bg-emerald-500/10" : "bg-emerald-50"}`}
    >
      {Icon && (
        <Icon
          className="text-[#00BF56] group-hover:rotate-12 transition-transform"
          size={22}
        />
      )}
    </div>
    <h2
      className={`text-2xl font-extrabold tracking-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
    >
      {children}
    </h2>
  </div>
);

export default function ProjectDetails2() {
  const { id } = useParams();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [project, setProject] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMedia, setCurrentMedia] = useState({ type: "image", url: "" });

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/feedback/?project=${id}`,
      );
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(Array.isArray(data) ? data : data.results || []);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/projects/${id}/`,
        );
        if (!response.ok) throw new Error("Project not found");

        const data = await response.json();
        setProject(data);

        if (data.media && data.media.length > 0) {
          setCurrentMedia({
            type: data.media[0].type,
            url: data.media[0].file,
          });
        }
        await fetchFeedbacks();
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          rating: formData.rating,
          project: id,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", message: "", rating: 5 });
        await fetchFeedbacks();
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Failed to send feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDarkMode ? "bg-[#05111a]" : "bg-slate-50"}`}
      >
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );

  if (!project)
    return <div className="text-center py-20 font-bold">Project Not Found</div>;

  // FIX: Convert technology string or array from Admin to usable list
  const displayTechStack = project.technologies
    ? Array.isArray(project.technologies)
      ? project.technologies
      : project.technologies.split(",").map((t) => t.trim())
    : [];

  const inputClasses = `w-full px-5 py-3 rounded-xl border outline-none transition-all ${
    isDarkMode
      ? "bg-white/5 border-white/10 text-white focus:border-emerald-500"
      : "bg-slate-100 border-slate-200 focus:border-emerald-500"
  }`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-[#05111a] text-slate-300" : "bg-slate-50 text-slate-700"} pb-10`}
    >
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; gap: 1.5rem; }
      `}</style>

      <nav className="container mx-auto px-6 pt-20 pb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 font-bold hover:text-emerald-500 transition-colors"
        >
          <ChevronLeft size={18} /> Back to Portfolio
        </button>
      </nav>

      <main className="container mx-auto px-6">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h1
              className={`text-4xl md:text-5xl font-black ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              {project.title}
              <span className="text-emerald-500">.</span>
            </h1>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-[#05111a] px-6 py-3 rounded-xl font-black transition-all flex items-center gap-2"
              >
                <ExternalLink size={18} /> Live View
              </a>
            )}
          </div>

          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[300px] md:h-[550px] border border-white/5 bg-black">
            {currentMedia.type === "video" ? (
              <video
                key={currentMedia.url}
                src={currentMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={currentMedia.url}
                className="w-full h-full object-cover"
                alt="Selected media"
              />
            )}
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <SectionHeading icon={ImageIcon} isDarkMode={isDarkMode}>
                Gallery
              </SectionHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.media?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setCurrentMedia({ type: item.type, url: item.file })
                    }
                    className={`relative rounded-2xl overflow-hidden h-28 border-4 transition-all ${currentMedia.url === item.file ? "border-emerald-500" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                        <Play size={20} className="text-white fill-white" />
                      </div>
                    )}
                    <img
                      src={item.file}
                      className="w-full h-full object-cover"
                      alt="Project media thumbnail"
                    />
                  </button>
                ))}
              </div>
            </section>

            <section
              className={`p-10 rounded-[2.5rem] ${isDarkMode ? "bg-white/5 border border-white/10" : "bg-white shadow-xl"}`}
            >
              <SectionHeading icon={Code2} isDarkMode={isDarkMode}>
                Project Story
              </SectionHeading>
              <div className="flex flex-wrap gap-6 mb-8 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold uppercase">
                    {project.category_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold uppercase">
                    {project.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold uppercase">
                    {project.client_name}
                  </span>
                </div>
              </div>
              <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line mb-10">
                {project.description}
              </p>

              {/* FIXED TECHNOLOGY SECTION */}
              {displayTechStack.length > 0 && (
                <div className="pt-10 border-t border-emerald-500/10">
                  <SectionHeading icon={Cpu} isDarkMode={isDarkMode}>
                    Technologies Used
                  </SectionHeading>
                  <div className="flex flex-wrap gap-2">
                    {displayTechStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-emerald-500/10 rounded-lg text-xs font-bold text-emerald-500 border border-emerald-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Client Reviews - Live from DB */}
            {feedbacks.length > 0 && (
              <section className="overflow-hidden py-10">
                <SectionHeading icon={Quote} isDarkMode={isDarkMode}>
                  Client Reviews
                </SectionHeading>
                <div className="animate-marquee">
                  {[...feedbacks, ...feedbacks].map((fb, idx) => (
                    <div
                      key={idx}
                      className={`w-[320px] p-8 rounded-2xl border ${isDarkMode ? "bg-white/5 border-white/10" : "bg-white shadow-lg"}`}
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(Number(fb.rating))].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="fill-emerald-500 text-emerald-500"
                          />
                        ))}
                      </div>
                      <p className="text-sm italic mb-4 opacity-80 leading-relaxed">
                        "{fb.message}"
                      </p>
                      <p className="font-black text-xs text-emerald-500 tracking-widest uppercase">
                        — {fb.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
            <div
              className={`p-8 rounded-[2rem] ${isDarkMode ? "bg-[#0a2538] border border-white/10 shadow-2xl" : "bg-white shadow-xl"}`}
            >
              <h3 className="text-xl font-black mb-6">Add Insight</h3>
              <div className="relative min-h-[300px]">
                {submitted ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent animate-in fade-in duration-500">
                    <div className="mb-4 bg-emerald-500 text-white rounded-full p-3 scale-110">
                      <Star size={30} className="fill-white" />
                    </div>
                    <p className="font-black text-lg">Thank You!</p>
                    <p className="text-xs opacity-70 mt-2">
                      Feedback Added Successfully
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 animate-in fade-in"
                  >
                    <input
                      required
                      placeholder="Full Name"
                      className={inputClasses}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <div className="flex items-center gap-3 px-2">
                      <span className="text-xs font-bold uppercase opacity-60">
                        Rating:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, rating: num })
                            }
                          >
                            <Star
                              size={20}
                              className={
                                num <= formData.rating
                                  ? "fill-emerald-500 text-emerald-500"
                                  : "text-slate-400"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      required
                      placeholder="Message..."
                      rows="4"
                      className={`${inputClasses} resize-none`}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                    <button
                      disabled={submitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#05111a] py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "Submit Now"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
