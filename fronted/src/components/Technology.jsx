import { Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "../css/technology.css";

export default function Technology() {
  const theme = useTheme();

  const techData = [
    { name: "React JS", icon: "⚛️" },

    { name: "Node JS", icon: "🟢" },
    { name: "Express JS", icon: "🚀" },
    { name: "MongoDB", icon: "🍃" },
    { name: "Python", icon: "🐍" },
    { name: "Django", icon: "🟢" },
    { name: "Tailwind CSS", icon: "💨" },
    { name: "MySQL", icon: "🐬" },
    { name: "Figma", icon: "🎨" },
    { name: "Firebase", icon: "🔥" },
    { name: "WordPress", icon: "📰" },
    { name: "Shopify", icon: "🛍️" },
  ];

  return (
    <section
      className={`technologySection ${
        theme.palette.mode === "dark" ? "darkTech" : "lightTech"
      }`}
    >
      <Container maxWidth="xl">
        <div className="techHeader">
          <Typography variant="h3" className="techTitle">
            Technologies We Use
          </Typography>

          <Typography variant="h6" className="techSubtitle">
            We build scalable and future-ready solutions using modern tools.
          </Typography>
        </div>

        <div className="techGrid">
          {techData.map((tech, index) => (
            <div className="techCard" key={index}>
              <div className="techIcon">{tech.icon}</div>
              <h4>{tech.name}</h4>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
