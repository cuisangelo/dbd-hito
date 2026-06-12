import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";

const NAV_ITEMS = [
  { label: "Proyectos", icon: <FolderOpenRoundedIcon />, to: "/lista-proyectos" },
  { label: "Reportes", icon: <AssessmentRoundedIcon />, to: "/reportes" },
];

export default function NavBarra() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        backgroundColor: "#232a3b",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/">
        <Box
          sx={{
            m: 2,
            p: 1.5,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Tech Innovation"
            style={{ width: "100%", maxWidth: 150 }}
          />
        </Box>
      </Link>
      <List component="nav" sx={{ px: 1.5 }}>
        {NAV_ITEMS.map((item) => {
          const selected = pathname.startsWith(item.to);
          return (
            <ListItemButton
              key={item.to}
              onClick={() => navigate(item.to)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: selected ? "#ffffff" : "rgba(255,255,255,0.7)",
                backgroundColor: selected
                  ? "rgba(54,169,220,0.25)"
                  : "transparent",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 38 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: "auto", p: 2 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
          Tech Innovation · DBD 2023
        </Typography>
      </Box>
    </Box>
  );
}
