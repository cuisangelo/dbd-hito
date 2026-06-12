import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";

const REPORTES = [
  { label: "Presupuesto", to: (id) => `/presuxpro/${id}` },
  { label: "Objetivos", to: (id) => `/objetivos/${id}` },
  { label: "Planificado vs Reportado", to: () => "/planifivsRepor/1/2" },
  { label: "Horas de empleado por proyecto", to: (id) => `/empleadoxProy/${id}` },
  { label: "Tareas por proyecto", to: (id) => `/tareas/${id}` },
  { label: "Recursos", to: (id) => `/repRecurso/${id}` },
  { label: "Progreso", to: (id) => `/progreso/${id}` },
];

export default function Ventana1() {
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [showProjects, setShowProjects] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  const cargarProyectos = async () => {
    try {
      const response = await fetch("http://localhost:4000/proyectos");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };

  const handleToggleProjects = () => {
    setShowProjects(!showProjects);
    if (!showProjects) {
      cargarProyectos();
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const selectedProject = projects.find(
    (p) => p.proyecto_id === selectedProjectId
  );

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Reportes
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Informes gerenciales por proyecto
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Informes por proyecto</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Selecciona un proyecto para habilitar los reportes
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="Proyecto seleccionado"
            variant="outlined"
            fullWidth
            value={selectedProject ? selectedProject.nombre_proyecto : ""}
            InputProps={{ readOnly: true }}
            placeholder="Ninguno"
          />
          <IconButton onClick={handleToggleProjects} color="primary">
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
        {showProjects && (
          <List>
            {projects.map((project) => (
              <ListItemButton
                key={project.proyecto_id}
                selected={project.proyecto_id === selectedProjectId}
                onClick={() => handleSelectProject(project.proyecto_id)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={project.nombre_proyecto} />
              </ListItemButton>
            ))}
          </List>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          Generar reportes
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {REPORTES.map((reporte) => (
            <Button
              key={reporte.label}
              variant="contained"
              component={Link}
              to={reporte.to(selectedProjectId)}
              disabled={!selectedProjectId}
            >
              {reporte.label}
            </Button>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
