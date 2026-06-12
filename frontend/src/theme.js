import { createTheme } from "@mui/material/styles";

// Palette derived from the Tech Innovation logo: slate navy letters and
// the cyan ramp of the "T".
const theme = createTheme({
  palette: {
    primary: { main: "#1f7fb5", light: "#36a9dc", dark: "#155a8a" },
    secondary: { main: "#36a9dc" },
    background: { default: "#f4f6fa", paper: "#ffffff" },
    text: { primary: "#2b3045", secondary: "#5a627a" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: "1px solid #e3e8f0" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#2b3245",
          color: "#ffffff",
          fontWeight: 600,
          whiteSpace: "nowrap",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "tbody &:hover": { backgroundColor: "#eef3fa" },
        },
      },
    },
  },
});

export default theme;
