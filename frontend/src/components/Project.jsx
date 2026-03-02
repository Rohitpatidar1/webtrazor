import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Chip, CircularProgress, Stack } from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { API_BASE } from "../config";
export default function Projects() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catTab, setCatTab] = useState("All");
  const [subTab, setSubTab] = useState("All");

  // Colors
  const primaryColor = "#0B3C5D";
  const secondaryColor = "#00BF56";

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/categories/`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = new URL(`${API_BASE}/api/projects/`);

        if (catTab !== "All") {
          url.searchParams.append("category", catTab);
        }

        if (subTab !== "All") {
          url.searchParams.append("subcategory", subTab);
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [catTab, subTab]);

  const activeCategoryData = categories.find((c) => c.name === catTab);

  return (
    <>
      <Helmet>
        <title>Our Portfolio | Web Development Projects | WebTrezor</title>
        <meta
          name="description"
          content="View our latest web development and UI/UX design projects built using React, Node.js and modern technologies."
        />
        <meta
          name="keywords"
          content="Web Development Portfolio, React Projects, MERN Stack Portfolio, UI UX Case Studies, Website Design Projects"
        />
      </Helmet>
      <section
        className={`py-12 md:py-24 transition-all duration-500 ${isDarkMode ? "bg-[#051622]" : "bg-[#f8faff]"}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-[#00BF56] font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4">
              Selected Works
            </h2>
            <h3
              className={`text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
            >
              Modern <span className="text-[#00BF56]">Portfolio</span>
            </h3>

            {/* Main Category Tabs */}
            <div
              className={`inline-flex p-1 rounded-2xl border transition-all w-full md:w-auto ${isDarkMode ? "bg-white/5 border-white/10 backdrop-blur-md" : "bg-white border-slate-200"}`}
            >
              <Tabs
                value={catTab}
                onChange={(e, v) => {
                  setCatTab(v);
                  setSubTab("All");
                }}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  width: "100%",
                  "& .MuiTab-root": {
                    color: isDarkMode ? "#94a3b8" : "#64748b",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: { xs: "0.85rem", md: "1rem" },
                    minWidth: { xs: 80, md: 100 },
                    px: { xs: 2, md: 3 },
                  },
                  "& .Mui-selected": { color: `${secondaryColor} !important` },
                  "& .MuiTabs-indicator": { bgcolor: secondaryColor },
                }}
              >
                <Tab label="All Works" value="All" />
                {categories.map((cat) => (
                  <Tab key={cat.id} label={cat.name} value={cat.name} />
                ))}
              </Tabs>
            </div>

            {/* Sub-Category Chips */}
            {catTab !== "All" &&
              activeCategoryData?.subcategories?.length > 0 && (
                <Box className="mt-6 flex justify-center">
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={1.5}
                  >
                    <Chip
                      label="Show All"
                      onClick={() => setSubTab("All")}
                      variant={subTab === "All" ? "filled" : "outlined"}
                      sx={{
                        bgcolor:
                          subTab === "All" ? secondaryColor : "transparent",
                        color: subTab === "All" ? "white" : secondaryColor,
                        borderColor: secondaryColor,
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor:
                            subTab === "All" ? "#009e47" : "rgba(0,191,86,0.1)",
                        },
                      }}
                    />
                    {activeCategoryData.subcategories.map((sub) => (
                      <Chip
                        key={sub.id}
                        label={sub.name}
                        onClick={() => setSubTab(sub.name)}
                        variant={subTab === sub.name ? "filled" : "outlined"}
                        sx={{
                          bgcolor:
                            subTab === sub.name
                              ? secondaryColor
                              : "transparent",
                          color:
                            subTab === sub.name
                              ? "white"
                              : isDarkMode
                                ? "#cbd5e1"
                                : "#475569",
                          borderColor:
                            subTab === sub.name
                              ? secondaryColor
                              : isDarkMode
                                ? "#334155"
                                : "#e2e8f0",
                          fontWeight: "500",
                          "&:hover": { borderColor: secondaryColor },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <CircularProgress sx={{ color: secondaryColor }} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {projects.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  className={`group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-2xl cursor-pointer
                ${isDarkMode ? "bg-[#112240] border border-white/5" : "bg-white border border-slate-200"}`}
                  style={{
                    animation: `fadeUp 0.6s ease-out ${i * 0.1}s forwards`,
                    opacity: 0,
                    transform: "translateY(20px)",
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-60 md:h-72 overflow-hidden">
                    <img
                      src={
                        p.media?.[0]?.file ||
                        "https://via.placeholder.com/600x400"
                      }
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 right-4 md:top-5 md:right-5 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight size={20} md={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <span className="h-[2px] w-4 md:w-6 bg-[#00BF56]"></span>
                      <span className="text-[#00BF56] text-[10px] md:text-[11px] font-black uppercase tracking-widest">
                        {p.category_name}{" "}
                        {p.subcategory_name ? `• ${p.subcategory_name}` : ""}
                      </span>
                    </div>
                    <h4
                      className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 leading-tight ${isDarkMode ? "text-white" : "text-[#0B3C5D]"}`}
                    >
                      {p.title}
                    </h4>
                    <p
                      className={`text-xs md:text-sm opacity-60 line-clamp-2 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                    >
                      {p.location
                        ? `Location: ${p.location}`
                        : "Premium Web Solution"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-20 md:py-32">
              <p className="text-lg md:text-xl opacity-30 font-bold italic px-4">
                No projects found in "{subTab === "All" ? catTab : subTab}"
                category.
              </p>
            </div>
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
          }}
        />
      </section>
    </>
  );
}
