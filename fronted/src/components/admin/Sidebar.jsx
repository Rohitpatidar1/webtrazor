import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Hammer,
  Wrench,
  Star,
  ArrowLeft,
  X,
  LogOut, // Naya icon add kiya
} from "lucide-react";

export default function Sidebar({ isOpen, toggleMenu }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Admin token remove karo
    localStorage.removeItem("adminToken");
    // Direct login page pe bhejo bina refresh ke delay ke
    navigate("/admin-login");
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/projects",
      label: "Projects",
      icon: <FolderKanban size={20} />,
    },
    {
      path: "/admin/service-providers",
      label: "Providers",
      icon: <Users size={20} />,
    },
    {
      path: "/admin/build-requests",
      label: "Builds",
      icon: <Hammer size={20} />,
    },
    {
      path: "/admin/service-requests",
      label: "Services",
      icon: <Wrench size={20} />,
    },
    { path: "/admin/feedback", label: "Feedback", icon: <Star size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] md:hidden backdrop-blur-sm transition-opacity"
          onClick={toggleMenu}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-64 bg-[#0b3c5d] flex flex-col p-6 transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden absolute top-4 right-4 text-[#00bfa6] border-none bg-transparent cursor-pointer hover:rotate-90 transition-transform"
        >
          <X size={28} />
        </button>

        {/* Logo */}
        <div className="text-xl font-black text-[#00bfa6] mb-10 text-center italic uppercase tracking-tighter">
          WebTrezor{" "}
          <span className="text-white opacity-50 text-[10px] block not-italic">
            Admin Panel
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && toggleMenu()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl no-underline transition-all duration-200 ${
                  isActive
                    ? "bg-[#00bfa6] text-white shadow-lg shadow-[#00bfa6]/30 font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#00bfa6]"
                }`
              }
            >
              {item.icon} <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer Buttons */}
        <div className="mt-auto pt-5 border-t border-white/10 space-y-3">
          {/* Logout Button (Wapas aa gaya!) */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-xl font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all cursor-pointer group"
          >
            <LogOut
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-xs">Logout Admin</span>
          </button>

          {/* Back to Site */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 bg-[#00bfa6]/10 text-[#00bfa6] py-3 rounded-xl font-bold border border-[#00bfa6]/20 hover:bg-[#00bfa6] hover:text-white transition-all cursor-pointer group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-xs">Main Site</span>
          </button>
        </div>
      </aside>
    </>
  );
}
