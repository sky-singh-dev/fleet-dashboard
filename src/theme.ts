import { createTheme, type Theme } from "@mui/material";

// 1. Extend the MUI Palette and PaletteOptions interfaces to support custom colors
declare module "@mui/material/styles" {
  interface Palette {
    dash: {
      bg: string;
      border: string;
      navy: string;
      green: string;
      greenLight: string;
      blue: string;
    };
  }
  interface PaletteOptions {
    dash?: {
      bg?: string;
      border?: string;
      navy?: string;
      green?: string;
      greenLight?: string;
      blue?: string;
    };
  }
}

const theme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Blue 600
      light: "#eff6ff", // Blue 50
      dark: "#1d4ed8", // Blue 700
    },
    success: {
      main: "#16a34a", // Green 600
      light: "#dcfce7", // Green 100
      dark: "#15803d", // Green 700
    },
    secondary: {
      main: "#475569", // Slate 600
      light: "#f1f5f9", // Slate 100
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#475569", // Slate 600
    },
    background: {
      default: "#f8fafc", // Slate 50
      paper: "#ffffff",
    },
    divider: "#e2e8f0", // Slate 200

    // Adding the custom dashboard tokens defined in the module declaration above
    dash: {
      bg: "#f8fafc",
      border: "#e2e8f0",
      navy: "#0f172a",
      green: "#16a34a",
      greenLight: "#dcfce7",
      blue: "#2563eb",
    },
  },
  typography: {
    fontFamily: '"Poppins", "system-ui", "-apple-system", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e2e8f0",
        },
      },
    },
  },
});

export default theme;
