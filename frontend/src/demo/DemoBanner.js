import { Alert } from "@mui/material";

export default function DemoBanner() {
  if (process.env.REACT_APP_DEMO !== "true") return null;
  return (
    <Alert severity="warning" sx={{ borderRadius: 0, justifyContent: "center" }}>
      Hito · maqueta académica (2023) — curso Diseño de Bases de Datos. Datos
      ficticios de demostración, sin backend: los cambios no se guardan.
    </Alert>
  );
}
