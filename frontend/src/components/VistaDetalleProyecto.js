import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Proyecto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/mostrar-detalles-proyecto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProyecto(data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del proyecto:", error);
      });
  }, [id]);

  if (!proyecto) {
    return <div>Cargando...</div>;
  }

  const { detallesProyecto, desarrolladores, hardware, software, adjuntos } =
    proyecto;

  const {
    nombre_proyecto,
    nombre_cliente,
    fecha_creacion,
    fecha_finalizacion_estimada,
    descripcion_proyecto,
    jefe_proyecto,
  } = detallesProyecto[0];
  const fechaCreacionFix = fecha_creacion.substring(0, 10);
  const fechaFinalizacionFix = fecha_finalizacion_estimada.substring(0, 10);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        {nombre_proyecto}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Cliente: {nombre_cliente}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
        <Button variant="outlined" to="/detalles-proyecto">
          Detalles
        </Button>
        <Button variant="outlined" to="/hitos">
          Hitos
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            navigate(`/lista-proyectos/${id}/asignaciones-recursos`)
          }
        >
          Asignaciones
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/proyecto/${id}/presupuestos`)}
        >
          Presupuesto
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/proyecto/${id}/tareas`)}
        >
          Tareas
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/proyecto/${id}/reuniones`)}
        >
          Reuniones
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Información general
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Cliente
            </Typography>
            <Typography variant="body1">{nombre_cliente}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Fecha de creación
            </Typography>
            <Typography variant="body1">{fechaCreacionFix}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Fecha de finalización
            </Typography>
            <Typography variant="body1">{fechaFinalizacionFix}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Jefe de proyecto
            </Typography>
            <Typography variant="body1">{jefe_proyecto}</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="text.secondary">
          Descripción
        </Typography>
        <Typography variant="body1">{descripcion_proyecto}</Typography>
      </Paper>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
        <Paper sx={{ p: 3, flex: 1, minWidth: 280 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Desarrolladores
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {desarrolladores.map((desarrollador, index) => (
              <Chip key={index} label={desarrollador.desarrolladores} />
            ))}
          </Box>
        </Paper>
        <Paper sx={{ p: 3, flex: 1, minWidth: 280 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Recursos
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Hardware
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5, mb: 2 }}>
            {hardware.map((item, index) => (
              <Chip key={index} label={item.recurso_hardware} />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            Software
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
            {software.map((item, index) => (
              <Chip key={index} label={item.recurso_software} />
            ))}
          </Box>
        </Paper>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Adjuntos
        </Typography>
        <List disablePadding>
          {adjuntos.map((adjunto, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={adjunto.adjunto_link}
              target="_blank"
              download={adjunto.nombre_adjunto}
              sx={{ borderRadius: 2 }}
            >
              <ListItemText primary={adjunto.nombre_adjunto} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Proyecto;
