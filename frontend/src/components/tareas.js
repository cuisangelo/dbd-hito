import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
// añado useParams

const ESTADOS = {
  1: { label: "Pendiente", color: "default" },
  2: { label: "En progreso", color: "info" },
  3: { label: "Finalizado", color: "success" },
};

export default function Tareas() {
  // añado

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [tareas, setTareas] = useState([]);

  const cargarTareas = async (proyecto_id) => {
    const response = await fetch(`http://localhost:4000/tareas/${proyecto_id}`);
    const data = await response.json();
    setTareas(data);
  };
  useEffect(() => {
    if (id) {
      cargarTareas(id);
    }
  }, [id]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Reporte de tareas</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Tareas del proyecto con encargados, fechas y estado
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tarea</TableCell>
              <TableCell>Encargado</TableCell>
              <TableCell>Fecha inicio</TableCell>
              <TableCell>Fecha límite</TableCell>
              <TableCell>Fecha fin</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tareas.map((tarea) => {
              const estado = ESTADOS[tarea.Estado];
              return (
                <TableRow key={tarea.id}>
                  <TableCell>{tarea.Tarea}</TableCell>
                  <TableCell>{tarea.Encargado}</TableCell>
                  <TableCell>{tarea["Fecha inicio"]}</TableCell>
                  <TableCell>{tarea["Fecha límite"]}</TableCell>
                  <TableCell>{tarea["Fecha fin"]}</TableCell>
                  <TableCell>{tarea.Descripcion}</TableCell>
                  <TableCell>
                    {estado ? (
                      <Chip
                        size="small"
                        label={estado.label}
                        color={estado.color}
                      />
                    ) : (
                      tarea.Estado
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
