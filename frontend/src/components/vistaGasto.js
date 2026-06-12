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
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function ListaGastos() {
  const [listaGastos, setListaGastos] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaGastos = async () => {
    const response = await fetch("http://localhost:4000/gastos");
    const data = await response.json();
    setListaGastos(data);
  };

  useEffect(() => {
    cargarListaGastos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/gastos/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaGastos();
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
        Gastos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Gestión de gastos por partida
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nuevo gasto
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
              name="fecha"
              label="Fecha"
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
              name="partida_id"
              label="Partida Id"
              placeholder="Ingrese el ID de la partida"
              sx={{ flex: "1 1 240px" }}
            />
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Agregar Gasto
          </Button>
        </form>
      </Paper>
      {/* Tabla de gastos */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gasto Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Partida Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaGastos.map((row) => (
              <TableRow
                key={row.gasto_id}
                sx={{
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                onClick={() => navigate(`/gastos/${row.gasto_id}`)}
              >
                <TableCell>{row.gasto_id}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell align="right">
                  {row.monto} {row.divisa}
                </TableCell>
                <TableCell>{row.partida_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ mt: 2, display: "flex", gap: 1.5 }}>
        <Button variant="outlined">
          Quitar Gasto
        </Button>
        <Button variant="outlined">
          Editar Gasto
        </Button>
      </Box>
    </Container>
  );
}
