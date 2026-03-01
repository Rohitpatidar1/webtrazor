import React, { useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import {
  Send,
  MapPin,
  Mail,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function Footer() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // ✅ Newsletter Email Send
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    emailjs
      .send(
        "service_nki3n3r",
        "template_y4mvl4h",
        { user_email: email },
        "Fhr9ylLF1x_6i8b80",
      )
      .then(() => {
        setStatus({
          open: true,
          message: "Subscribed Successfully! 🚀",
          type: "success",
        });
        setEmail("");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus({
          open: true,
          message: "Failed to send. Try again!",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const primaryBg = "#0B3C5D";
  const secondary = "#00BF56";
  const darkModeBg = "#000000";

  return (
    <footer
      style={{
        backgroundColor: isDarkMode ? darkModeBg : primaryBg,
        color: "#fff",
        padding: "80px 0 30px",
        borderTop: `4px solid ${secondary}`,
      }}
    >
      <Container maxWidth="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Web<span style={{ color: secondary }}>Trezor</span>
            </Typography>
            <p style={{ opacity: 0.7 }}>
              Building next-generation digital solutions with MERN stack and
              premium UI/UX.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} color={secondary} />
                <span>Indore, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} color={secondary} />
                <span>webtrezor01@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h4 style={{ marginBottom: 20 }}>Expertise</h4>
            {[
              "Web Development",
              "UI/UX Design",
              "Shopify Setup",
              "Branding",
            ].map((item) => (
              <div key={item} style={{ marginBottom: 8 }}>
                <Link
                  to="/services"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <ChevronRight size={14} color={secondary} /> {item}
                </Link>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div>
            <h4 style={{ marginBottom: 20 }}>Technologies</h4>
            {["React", "Node", "MongoDB", "Django", "Tailwind"].map((tech) => (
              <div key={tech}>{tech}</div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ marginBottom: 20 }}>Newsletter</h4>

            <form
              onSubmit={handleNewsletterSubmit}
              style={{ display: "flex", gap: 10 }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                style={{
                  flex: 1,
                  padding: "10px 15px", // Padding thodi badhayi hai mobile touch ke liye
                  borderRadius: 6,
                  border: "none",
                  outline: "none", // Focus outline hatane ke liye
                  backgroundColor: "#fff", // Background fix kiya
                  color: "#000", // 👈 Ye line text ko visible banayegi
                  fontSize: "16px", // 👈 Mobile par zoom prevent karne ke liye 16px best hai
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: secondary,
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                {loading ? <Loader2 size={16} /> : <Send size={16} />}
              </button>
            </form>

            {/* ✅ Social Links */}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <IconButton
                component="a"
                href="https://www.instagram.com/WebTrezor"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.linkedin.com/in/web-trezor-8992093b2/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                component="a"
                href="mailto:webtrezor01@gmail.com"
                sx={{ color: "#fff" }}
              >
                <EmailIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Snackbar */}
        <Snackbar
          open={status.open}
          autoHideDuration={4000}
          onClose={() => setStatus({ ...status, open: false })}
        >
          <Alert severity={status.type} variant="filled">
            {status.message}
          </Alert>
        </Snackbar>

        <div style={{ textAlign: "center", opacity: 0.5 }}>
          © {new Date().getFullYear()} WebTrezor
        </div>
      </Container>
    </footer>
  );
}
