import { Menu, Search } from "lucide-react";

export default function Topbar({ toggleMenu }) {
  return (
    <header className="flex items-center justify-between gap-4 w-full">
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-[#00bfa6] bg-[#1e293b] rounded-lg border-none cursor-pointer"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2.5 px-10 rounded-full border border-[#2e3a4f] bg-[#1e293b] text-white outline-none focus:border-[#00bfa6] text-sm"
          />
        </div>
      </div>
    </header>
  );
}
