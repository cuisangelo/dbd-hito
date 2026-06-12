import { useEffect, useState, useRef } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Chip,
  Typography
} from "@mui/material";

import {useParams, useNavigate } from "react-router-dom";

export default function ListaPartidas() {
  const { id, id_pre} = useParams();
  const [listaPartidas, setListaPartidas] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaPartidas = async () => {
    const response = await fetch("http://localhost:4000/partidas");
    const data = await response.json();
    setListaPartidas(data);
  };

  useEffect(() => {
    cargarListaPartidas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/partidas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaPartidas();
    formRef.current.reset();
  };

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${anio}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;
  };


  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Partidas
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Gestión de partidas por presupuesto
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nueva partida
        </Typography>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              name="descripcion"
              label="Descripción"
              placeholder="Ingrese la descripción"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="fecha_estimacion"
              label="Fecha estimación"
              defaultValue={obtenerFechaActual()}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="monto"
              label="Monto"
              type="number"
              placeholder="Ingrese el monto"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="divisa"
              label="Divisa"
              placeholder="Ingrese la divisa"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="estado_partida"
              label="Estado"
              placeholder="Ingrese el estado de la partida"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="presupuesto_id"
              label="Presupuesto Id"
              placeholder="Ingrese el ID del presupuesto"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="tipo_partida"
              label="Tipo Partida"
              placeholder="Ingrese el tipo de partida"
              sx={{ flex: "1 1 240px" }}
            />
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Agregar Partida
          </Button>
        </form>
      </Paper>
      {/* Tabla de partidas */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partida Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha estimación</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Presupuesto Id</TableCell>
              <TableCell>Tipo Partida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPartidas.map((row) => (
              <TableRow
                key={row.partida_id}
                sx={{
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                onClick={() => navigate(`/proyecto/${id}/presupuestos/${id_pre}/partidas/${row.partida_id}/gastos`)}
              >
                <TableCell>{row.partida_id}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.fecha_estimacion}</TableCell>
                <TableCell align="right">
                  {row.monto} {row.divisa}
                </TableCell>
                <TableCell>
                  <Chip size="small" label={row.estado_partida} />
                </TableCell>
                <TableCell>{row.presupuesto_id}</TableCell>
                <TableCell>{row.tipo_partida}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ mt: 2, display: "flex", gap: 1.5 }}>
        <Button variant="outlined">
          Quitar Partida
        </Button>
        <Button variant="outlined">
          Editar Partida
        </Button>
      </Box>
    </Container>
  );
}
