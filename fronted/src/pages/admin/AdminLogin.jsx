import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Loader2, Moon, Sun, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const navigate = useNavigate();

  // Theme Toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // ✅ Store token
        localStorage.setItem("adminToken", data.token);

        // ✅ Redirect properly (NO trailing slash)
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Server connection failed. Is Django running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#051622]">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-2xl bg-white dark:bg-[#0a1f2e] shadow-xl border border-slate-200 dark:border-white/5 text-[#0B3C5D] dark:text-[#00BF56] hover:scale-110 transition-transform"
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-[#0a1f2e] p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/5">
        {/* Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#00BF56] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl font-black italic text-white">W</span>
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter text-[#0B3C5D] dark:text-white">
            WEB<span className="text-[#00BF56]">TREZOR</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 mt-2">
            Admin Secure Access
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-600 dark:text-red-400 text-sm font-bold text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <User size={20} />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-slate-50 dark:bg-[#051622] dark:text-white focus:border-[#00BF56] outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 bg-slate-50 dark:bg-[#051622] dark:text-white focus:border-[#00BF56] outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00BF56] hover:bg-[#00a34a] text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ShieldCheck size={20} />
            )}
            {loading ? "Verifying..." : "Login Dashboard"}
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest">
          © 2026 Webtrezor Admin Panel
        </p>
      </div>
    </div>
  );
}
