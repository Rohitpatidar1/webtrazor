import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0B3C5D", // Deep Blue
    },
    secondary: {
      main: "#00BFA6", // Teal Accent
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 30,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
