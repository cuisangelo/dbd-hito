import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DetallesTareaComponent from "./detallesTarea";
import CrearTarea from './CrearTarea';
import DetallesTareaCasComponent from "./detallesTareaCas";
import CrearTareaCas from "./CrearTareaCas";

const SECCIONES = [
  "Detalles",
  "Hitos",
  "Asignaciones",
  "Presupuesto",
  "Gastos",
  "Reuniones",
  "Tareas",
];

const TareasCas = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [tareas, setTareas] = useState({
    tareasPendientes: [],
    tareasEnProgreso: [],
    tareasFinalizadas: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openAgregarTareaDialog, setOpenAgregarTareaDialog] = useState(false);

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

  useEffect(() => {
    fetch(`http://localhost:4000/mostrar-tarea-columnaCas`)
      .then((response) => response.json())
      .then((data) => {
        const tareasPendientes = data.tareasPendientes.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });

        const tareasEnProgreso = data.tareasEnProgreso.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });

        const tareasFinalizadas = data.tareasFinalizadas.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });
        setTareas({ tareasPendientes, tareasEnProgreso, tareasFinalizadas });
      })
      .catch((error) => {
        console.error("Error al obtener las tareas de la columna:", error);
      });
  }, []);

  if (!proyecto) {
    return <div>Cargando...</div>;
  }

  const { detallesProyecto } = proyecto;
  const { nombre_proyecto } = detallesProyecto[0];

  const handleOpenDialog = (tareaId) => {
    setOpenDialog(tareaId);
  };

  const handleCloseDialog = () => {
    setOpenDialog();
  };

  const handleOpenAgregarTareaDialog = () => {
    setOpenAgregarTareaDialog(true);
  };

  // Función para cerrar el diálogo "Agregar Tarea"
  const handleCloseAgregarTareaDialog = () => {
    setOpenAgregarTareaDialog(false);
  };

  const columnas = [
    {
      titulo: "Tareas Pendientes",
      lista: tareas.tareasPendientes,
      color: "default",
    },
    {
      titulo: "Tareas en Progreso",
      lista: tareas.tareasEnProgreso,
      color: "info",
    },
    {
      titulo: "Tareas Finalizadas",
      lista: tareas.tareasFinalizadas,
      color: "success",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        {nombre_proyecto}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Tablero de tareas del proyecto
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Tabs value="Tareas">
          {SECCIONES.map((seccion) => (
            <Tab key={seccion} label={seccion} value={seccion} />
          ))}
        </Tabs>
        <Button variant="contained" onClick={handleOpenAgregarTareaDialog}>
          Agregar Tarea
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        {columnas.map(({ titulo, lista, color }) => (
          <Paper key={titulo} sx={{ p: 2, flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography variant="h6">{titulo}</Typography>
              <Chip size="small" color={color} label={lista.length} />
            </Box>
            {lista.map((tarea) => (
              <React.Fragment key={tarea.tarea_id}>
                <Box
                  onClick={() => handleOpenDialog(tarea.tarea_id)}
                  sx={{
                    p: 1.5,
                    mb: 1.5,
                    backgroundColor: "#f4f6fa",
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="subtitle2">
                    {tarea.nombre_tarea}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tarea.descripcion_tarea}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                    sx={{ textAlign: "right", mt: 1 }}
                  >
                    {tarea.fecha_hora}
                  </Typography>
                </Box>
                <Dialog
                  open={openDialog === tarea.tarea_id}
                  onClose={handleCloseDialog}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle>Tarea</DialogTitle>
                  <DialogContent>
                    <DetallesTareaCasComponent id={tarea.tarea_id} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      Cerrar
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            ))}
          </Paper>
        ))}
      </Box>

      <Dialog
        open={openAgregarTareaDialog}
        onClose={handleCloseAgregarTareaDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Agregar Tarea</DialogTitle>
        <DialogContent>
          <CrearTareaCas proyecto_id = {id}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAgregarTareaDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TareasCas;
