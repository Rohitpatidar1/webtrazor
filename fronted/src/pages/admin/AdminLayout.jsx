import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Sidebar - Mobile par slide hoke aayega */}
      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <div className="p-4 md:p-8">
          <Topbar toggleMenu={toggleMenu} />
          {/* Outlet content ensures responsive grid */}
          <main className="mt-6 w-full max-w-full overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
