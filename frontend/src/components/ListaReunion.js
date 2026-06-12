import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CrearReunion from "./crearReunion";

const ListaReuion = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [reunion, setReunion] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCrearReunion = () => {
    // Lógica adicional si es necesario antes o después de crear la reunión
    handleCloseDialog(); // Cerrar el diálogo después de crear la reunión
  };

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
    fetch(`http://localhost:4000/mostrar-lista-reunion/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReunion(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!proyecto) {
    return <div>Cargando...</div>;
  }
  const { detallesProyecto } = proyecto;
  const { proyecto_id, nombre_proyecto } = detallesProyecto[0];

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Reuniones
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Reuniones del proyecto {nombre_proyecto}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" onClick={handleOpenDialog}>
          Agregar Reunion
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Día y hora</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reunion.map((reunionItem, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{reunionItem.dia_hora}</TableCell>
                <TableCell>{reunionItem.descripcion_reunion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Crear Reunión</DialogTitle>
        <DialogContent>
          <CrearReunion proyecto_id={proyecto_id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListaReuion;
