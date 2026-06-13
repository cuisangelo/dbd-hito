import { createTheme } from "@mui/material/styles";

// Design system "Atlas" (see design.md). Calm operational console:
// slate neutrals, a single azure brand action, soft layered depth.
const theme = createTheme({
  palette: {
    primary: { main: "#1f7fb5", light: "#46a6d6", dark: "#185f8a" },
    secondary: { main: "#22c8e6" },
    success: { main: "#0f9d6e" },
    warning: { main: "#d98a04" },
    error: { main: "#e0445b" },
    info: { main: "#1f7fb5" },
    background: { default: "#f6f8fb", paper: "#ffffff" },
    text: { primary: "#11182a", secondary: "#5a6478" },
    divider: "#e4e9f2",
  },
  typography: {
    fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 700, letterSpacing: "-0.01em" },
    h5: { fontWeight: 700, letterSpacing: "-0.005em" },
    h6: { fontWeight: 650 },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    overline: { fontWeight: 600, letterSpacing: "0.08em" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 16 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: "1px solid #e4e9f2", backgroundImage: "none" },
        rounded: { borderRadius: 12 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid #e4e9f2",
          boxShadow: "0 1px 2px rgba(16,24,42,.05)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
        sizeSmall: { height: 22 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#2b3245",
          color: "#ffffff",
          fontWeight: 600,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        },
        body: { fontVariantNumeric: "tabular-nums" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "tbody &:hover": { backgroundColor: "#eef2f8" },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { boxShadow: "0 16px 40px -8px rgba(16,24,42,.16)" },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow:
            "0 4px 12px -2px rgba(16,24,42,.08), 0 2px 6px -2px rgba(16,24,42,.06)",
        },
      },
    },
  },
});

export default theme;
