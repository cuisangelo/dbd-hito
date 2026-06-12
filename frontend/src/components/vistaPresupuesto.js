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

import { useParams, useNavigate } from "react-router-dom";

export default function ListaPresupuestos() {

  const { id} = useParams();
  const [listaPresupuestos, setListaPresupuestos] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaPresupuestos = async () => {
    const response = await fetch("http://localhost:4000/presupuestos");
    const data = await response.json();
    setListaPresupuestos(data);
  };

  useEffect(() => {
    cargarListaPresupuestos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/presupuestos/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaPresupuestos();
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
        Presupuestos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Gestión de presupuestos por proyecto
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Nuevo presupuesto
        </Typography>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              name="descripcion_presupuesto"
              label="Descripción"
              placeholder="Ingrese la descripción"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="fecha_creacion_presupuesto"
              label="Fecha creación"
              defaultValue={obtenerFechaActual()}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="monto_presupuesto"
              label="Monto"
              type="number"
              placeholder="Ingrese el monto"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="divisa_presupuesto"
              label="Divisa"
              placeholder="Ingrese la divisa"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="porcentaje_usado"
              label="Uso"
              placeholder="Ingrese el porcentaje de uso"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="estado_presupuesto"
              label="Estado"
              placeholder="Ingrese el estado"
              sx={{ flex: "1 1 240px" }}
            />
            <TextField
              name="proyecto_id"
              label="Proyecto Id"
              placeholder="Ingrese el ID del proyecto"
              sx={{ flex: "1 1 240px" }}
            />
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Agregar Presupuesto
          </Button>
        </form>
      </Paper>
      {/* Tabla de presupuestos */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Presupuesto Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Uso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Proyecto Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPresupuestos.map((row) => (
              <TableRow
                key={row.presupuesto_id}
                sx={{
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                onClick={() => navigate(`/proyecto/${id}/presupuestos/${row.presupuesto_id}/partidas`)}
              >
                <TableCell>{row.presupuesto_id}</TableCell>
                <TableCell>{row.descripcion_presupuesto}</TableCell>
                <TableCell>{row.fecha_creacion_presupuesto}</TableCell>
                <TableCell align="right">
                  {row.monto_presupuesto} {row.divisa_presupuesto}
                </TableCell>
                <TableCell>{row.porcentaje_usado}</TableCell>
                <TableCell>
                  <Chip size="small" label={row.estado_presupuesto} />
                </TableCell>
                <TableCell>{row.proyecto_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ mt: 2, display: "flex", gap: 1.5 }}>
        <Button variant="outlined">
          Quitar Presupuesto
        </Button>
        <Button variant="outlined">
          Editar Presupuesto
        </Button>
      </Box>
    </Container>
  );
}
