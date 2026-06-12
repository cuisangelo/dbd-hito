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
  Typography,
} from "@mui/material";
import DetallesTareaComponent from "./detallesTarea";
import CrearTarea from './CrearTarea';

const COLUMNAS = [
  { titulo: "Pendientes", key: "tareasPendientes" },
  { titulo: "En progreso", key: "tareasEnProgreso" },
  { titulo: "Finalizadas", key: "tareasFinalizadas" },
];

const Tareas = () => {
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
    fetch(`http://localhost:4000/mostrar-tarea-columna/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTareas(data);
      })
      .catch((error) => {
        console.error("Error al obtener las tareas de la columna:", error);
      });
  }, [id]);

  if (!proyecto) {
    return (
      <Container>
        <Typography sx={{ mt: 4 }}>Cargando...</Typography>
      </Container>
    );
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


  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        {nombre_proyecto}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Tablero de tareas del proyecto
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={handleOpenAgregarTareaDialog}>
          Agregar Tarea
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        {COLUMNAS.map((columna) => {
          const lista = tareas[columna.key];
          return (
            <Paper key={columna.key} sx={{ p: 2, flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="h6">{columna.titulo}</Typography>
                <Chip size="small" label={lista.length} />
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
                      sx={{ mt: 0.5 }}
                    >
                      {tarea.fecha_hora}
                    </Typography>
                  </Box>
                  <Dialog
                    open={openDialog === tarea.tarea_id}
                    onClose={handleCloseDialog}
                    maxWidth="md"
                    fullWidth
                  >
                    <DialogTitle>Tarea</DialogTitle>
                    <DialogContent>
                      <DetallesTareaComponent id={tarea.tarea_id} />
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
          );
        })}
      </Box>

      <Dialog
        open={openAgregarTareaDialog}
        onClose={handleCloseAgregarTareaDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Agregar Tarea</DialogTitle>
        <DialogContent>
          <CrearTarea proyecto_id = {id}/>
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

export default Tareas;
