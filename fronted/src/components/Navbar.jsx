import { useState, useEffect, useContext, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ColorModeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logo from "../assets/ori_logo-removebg-preview.png";

export default function Navbar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [scrollWidth, setScrollWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let requestRunning = null;

    const handleScroll = () => {
      if (requestRunning) return;

      requestRunning = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        if (height > 0) {
          const scrolled = (winScroll / height) * 100;
          setScrollWidth(scrolled);
        }

        requestRunning = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRunning) window.cancelAnimationFrame(requestRunning);
    };
  }, []);

  const isDarkMode = theme.palette.mode === "dark";

  const menuItems = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: "Make Own Web", path: "/buyservices" },
      { name: "Services", path: "/services" },
      { name: "About", path: "/about" },
    ],
    [],
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
          isScrolled
            ? isDarkMode
              ? "bg-black/85 backdrop-blur-lg border-b border-white/10 py-2 shadow-2xl" // Black theme on scroll
              : "bg-[#0B3C5D]/85 backdrop-blur-lg border-b border-white/10 py-2 shadow-2xl"
            : isDarkMode
              ? "bg-black py-4 border-b border-transparent" // Solid Black theme
              : "bg-[#0B3C5D] py-4 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 no-underline group"
          >
            <img
              src={logo}
              alt="WebTREZOR Logo"
              className={`w-auto object-contain transition-all duration-500 group-hover:scale-110 ${
                isScrolled ? "h-9" : "h-10 md:h-12"
              }`}
            />
            <span className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase italic">
              Web<span className="text-[#00BF56]">TREZOR</span>
            </span>
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  relative px-4 py-2 text-sm font-bold transition-all duration-300 no-underline
                  ${isActive ? "text-[#FF8C00]" : "text-gray-200"}
                  hover:text-[#FF8C00] group/link
                `}
              >
                {item.name}
                {({ isActive }) => (
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-[#FF8C00] rounded-full transition-all duration-400 
                   ${isActive ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover/link:w-1/2 group-hover/link:opacity-100"}`}
                  />
                )}
              </NavLink>
            ))}

            <button
              onClick={colorMode.toggleColorMode}
              className="p-2 mx-2 rounded-full transition-all border-none bg-transparent cursor-pointer text-white hover:bg-white/10"
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </button>

            <button
              onClick={() => navigate("/contact")}
              className={`ml-4 bg-[#00BF56] text-white font-black rounded-xl
                         shadow-[0_4px_15px_rgba(0,191,86,0.3)] hover:shadow-[0_0_25px_rgba(0,191,86,0.5)]
                         transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-none cursor-pointer
                         ${isScrolled ? "py-2 px-6" : "py-2.5 px-8"}`}
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="md:hidden border-none bg-transparent cursor-pointer"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <CloseIcon fontSize="large" style={{ color: "white" }} />
            ) : (
              <MenuIcon fontSize="large" style={{ color: "white" }} />
            )}
          </button>
        </div>

        {/* MOBILE OVERLAY MENU */}
        <div
          className={`fixed top-[64px] left-0 w-full h-screen transition-all duration-500 ease-in-out transform md:hidden ${
            isDarkMode ? "bg-black" : "bg-[#0B3C5D]"
          } ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <div className="flex flex-col items-center pt-10 space-y-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={toggleMenu}
                className={({ isActive }) => `
                  text-xl font-bold transition-all duration-300 no-underline
                  ${isActive ? "text-[#FF8C00]" : "text-gray-200"}
                `}
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={() => {
                colorMode.toggleColorMode();
                toggleMenu();
              }}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white border-none cursor-pointer"
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}{" "}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={() => {
                navigate("/contact");
                toggleMenu();
              }}
              className="w-[80%] bg-[#00BF56] text-white font-black py-4 rounded-xl border-none cursor-pointer shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 pointer-events-none">
          <div
            className="h-full shadow-[0_0_12px_#00BF56]" // Glowing effect color updated
            style={{
              width: `${scrollWidth}%`,
              backgroundColor: "#00BF56", // Secondary color added here
              transition: "none",
              willChange: "width",
            }}
          />
        </div>
      </nav>

      <div className="h-24" />
    </>
  );
}
