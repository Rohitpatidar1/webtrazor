import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import {
  Plus,
  Edit,
  Trash2,
  X,
  CloudUpload,
  Image as ImageIcon,
  MapPin,
  Briefcase,
  User,
  Cpu, // Naya icon technologies ke liye
} from "lucide-react";
import { API_BASE } from "../../config";

export default function AdminProjects() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    client_name: "",
    category: "",
    location: "",
    description: "",
    technologies: "", // Added technologies field
    images: [],
    video: null,
  });

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/projects/`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/categories/`);
      const data = await response.json();
      setDbCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "drnlbh7lq",
        uploadPreset: "WebTrezor",
        sources: ["local", "url", "camera"],
        resourceType: "auto",
        multiple: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const fileUrl = result.info.secure_url;
          const isVideo = result.info.resource_type === "video";
          if (isVideo) {
            setFormData((prev) => ({ ...prev, video: { file: fileUrl } }));
          } else {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, { file: fileUrl }],
            }));
          }
        }
      },
    );
  };

  const removeMedia = async (mediaItem, type, index) => {
    if (isEditing && mediaItem.id) {
      if (!window.confirm("Permanently delete from server?")) return;
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `${API_BASE}/api/project/media/delete/${mediaItem.id}/`,
          {
            method: "DELETE",
            headers: { Authorization: `Token ${token}` },
          },
        );
        if (!response.ok) return alert("Failed to delete.");
      } catch (error) {
        return console.error(error);
      }
    }
    if (type === "image") {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({ ...prev, video: null }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.client_name) {
      return alert("Required fields missing!");
    }
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    const payload = {
      ...formData,
      images: formData.images.map((img) => img.file),
      video: formData.video ? formData.video.file : "",
    };

    const url = isEditing
      ? `${API_BASE}/api/project/update-full/${currentProjectId}/`
      : `${API_BASE}/api/tech/`; // Updated URL as per your request

    try {
      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(isEditing ? "Updated!" : "Saved!");
        setOpenModal(false);
        fetchProjects();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (proj) => {
    setIsEditing(true);
    setCurrentProjectId(proj.id);
    const existingImages = proj.media?.filter((m) => m.type === "image") || [];
    const existingVideo = proj.media?.find((m) => m.type === "video") || null;
    setFormData({
      title: proj.title,
      client_name: proj.client_name,
      category: proj.category,
      location: proj.location,
      description: proj.description,
      technologies: proj.technologies || "", // Populating technologies on edit
      images: existingImages,
      video: existingVideo,
    });
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete entire project?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE}/api/project/delete/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Token ${token}` },
        },
      );
      if (response.ok) fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-500 ${isDark ? "bg-[#051622] text-white" : "bg-slate-50 text-[#0B3C5D]"}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black italic tracking-tight">
            Project <span className="text-[#00BF56]">Library</span>
          </h2>
          <p className="opacity-60 text-sm font-bold uppercase tracking-widest">
            Manage your portfolio showcase
          </p>
        </div>
        <button
          className="flex items-center gap-2 bg-[#00BF56] hover:bg-[#009e4a] text-white px-6 py-3 rounded-2xl font-black italic transition-all shadow-lg shadow-[#00BF56]/20"
          onClick={() => {
            setIsEditing(false);
            setFormData({
              title: "",
              client_name: "",
              category: "",
              location: "",
              description: "",
              technologies: "",
              images: [],
              video: null,
            });
            setOpenModal(true);
          }}
        >
          <Plus size={20} /> Add New Project
        </button>
      </div>

      {/* Table */}
      <div
        className={`rounded-[2rem] overflow-hidden border transition-all ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-200 shadow-xl"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead
              className={`${isDark ? "bg-white/5 text-white/40" : "bg-[#0B3C5D] text-white"} text-[10px] uppercase font-black tracking-[0.2em]`}
            >
              <tr>
                <th className="px-6 py-5">Project Details</th>
                <th className="px-6 py-5">Client</th>
                <th className="px-6 py-5 text-center">Category</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-100"}`}
            >
              {projects.map((proj) => (
                <tr
                  key={proj.id}
                  className={`transition-colors ${isDark ? "hover:bg-white/[0.02]" : "hover:bg-[#00BF56]/5"}`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-[#00BF56]/10 text-[#00BF56]">
                        <ImageIcon size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-sm uppercase italic tracking-tighter">
                          {proj.title}
                        </span>
                        {/* Preview of tech tags in table */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.tech_list?.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className="text-[8px] bg-[#00BF56]/10 text-[#00BF56] px-1.5 rounded uppercase font-bold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold opacity-70 italic tracking-tight underline underline-offset-4 decoration-[#00BF56]/30">
                    {proj.client_name}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-4 py-1.5 rounded-full bg-slate-500/10 text-[10px] font-black uppercase tracking-widest border border-current opacity-60">
                      {proj.category_name}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(proj)}
                      className="p-2.5 bg-[#0B3C5D]/10 text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white rounded-xl transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {openModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl transition-all border-4 ${
              isDark
                ? "bg-[#0a2538] border-white/5 text-white"
                : "bg-white border-slate-100 text-[#0B3C5D]"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-8 border-b sticky top-0 z-10 flex justify-between items-center ${isDark ? "bg-[#0a2538] border-white/5" : "bg-white border-slate-100"}`}
            >
              <div>
                <h3 className="text-2xl font-black italic tracking-tighter">
                  {isEditing ? "EDIT" : "UPLOAD"}{" "}
                  <span className="text-[#00BF56]">PROJECT</span>
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">
                  Fill in the technical specifications
                </p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Project Title *
                  </label>
                  <div className="relative">
                    <Briefcase
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      name="title"
                      value={formData.title}
                      placeholder="e.g. Luxury Villa"
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none border transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Client Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      name="client_name"
                      value={formData.client_name}
                      placeholder="Client Org Name"
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none border transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                    />
                  </div>
                </div>

                {/* --- NEW TECHNOLOGIES FIELD --- */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Technologies Used (Comma Separated)
                  </label>
                  <div className="relative">
                    <Cpu
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      name="technologies"
                      value={formData.technologies}
                      placeholder="e.g. React, Tailwind CSS, Python, PostgreSQL"
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none border transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                    />
                  </div>
                  {/* Real-time Preview of Tags */}
                  <div className="flex flex-wrap gap-2 mt-2 px-2">
                    {formData.technologies.split(",").map(
                      (tech, i) =>
                        tech.trim() && (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#00BF56]/10 text-[#00BF56] border border-[#00BF56]/20 rounded-lg text-[10px] font-bold uppercase tracking-tight"
                          >
                            {tech.trim()}
                          </span>
                        ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Category Selection *
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={formData.category}
                    className={`w-full px-4 py-3.5 rounded-2xl outline-none border transition-all appearance-none ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                  >
                    <option value="">Choose Sub-category</option>
                    {dbCategories.map((cat) => (
                      <optgroup
                        key={cat.id}
                        label={cat.name}
                        className="text-[#00BF56] font-bold"
                      >
                        {cat.subcategories?.map((sub) => (
                          <option
                            key={sub.id}
                            value={sub.id}
                            className="text-initial"
                          >
                            {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                    Site Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                      size={16}
                    />
                    <input
                      name="location"
                      value={formData.location}
                      placeholder="Mumbai, IN"
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-2xl outline-none border transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase opacity-50 ml-2">
                  Project Brief
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  placeholder="Describe the scope of work..."
                  onChange={handleChange}
                  rows="4"
                  className={`w-full p-4 rounded-2xl outline-none border transition-all resize-none ${isDark ? "bg-white/5 border-white/10 focus:border-[#00BF56]" : "bg-slate-50 border-slate-200 focus:border-[#00BF56]"}`}
                />
              </div>

              {/* Media Upload Area */}
              <div
                className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-slate-50"}`}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-full bg-[#00BF56]/10 text-[#00BF56] mb-4">
                    <CloudUpload size={32} />
                  </div>
                  <h4 className="font-black italic tracking-tighter uppercase mb-1 text-lg">
                    Visual Assets
                  </h4>
                  <p className="text-xs opacity-50 mb-6 font-bold">
                    Drag and drop or use Cloudinary uploader
                  </p>
                  <button
                    type="button"
                    className="bg-[#0B3C5D] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                    onClick={uploadWidget}
                  >
                    Cloudinary Widget
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-[#00BF56]/20"
                    >
                      <img
                        src={img.file}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                      <button
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMedia(img, "image", index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {formData.video && (
                    <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-500/50 bg-black">
                      <video
                        src={formData.video.file}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 text-[8px] font-black uppercase text-white">
                        Video File
                      </div>
                      <button
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMedia(formData.video, "video")}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div
              className={`p-8 border-t flex gap-4 ${isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"}`}
            >
              <button
                className="flex-1 bg-[#00BF56] hover:bg-[#009e4a] text-white py-4 rounded-2xl font-black text-sm uppercase italic tracking-widest transition-all shadow-xl shadow-[#00BF56]/20 disabled:opacity-50"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading
                  ? "COMMITTING TO DB..."
                  : isEditing
                    ? "EXECUTE UPDATE"
                    : "SAVE REPOSITORY"}
              </button>
              <button
                className="px-8 py-4 font-black text-sm uppercase italic opacity-40 hover:opacity-100 transition-opacity"
                onClick={() => setOpenModal(false)}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
