import { useEffect, useState } from "react";
import {
  Box,
  Button,
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

export default function PresupuestoxProy() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  // añado esto
  const [presupuesto, setPresupuesto] = useState(null);
  const [totalG, setTotalG] = useState(null);
  const [porcentaje, setPorcentaje] = useState(null);

  useEffect(() => {
    const obtenerPresupuesto = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro2/${id}`);
        const data = await response.json();
        setPresupuesto(data.monto_presupuesto);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPresupuesto();
  }, [id]);

  useEffect(() => {
    const obtenerTotalG = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro3/${id}`);
        const data = await response.json();
        setTotalG(data.sum);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerTotalG();
  }, [id]);

  useEffect(() => {
    const obtenerPorcentaje = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro4/${id}`);
        const data = await response.json();
        setPorcentaje(data["Porcentaje usado del presupuesto(%)"]);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPorcentaje();
  }, [id]);

  const cargarTareas = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/presuxproyecto/${proyecto_id}`
    );
    const data = await response.json();
    setDatos(data);
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
        <Typography variant="h4">
          Reporte del presupuesto por proyecto
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Gastos en recursos y uso del presupuesto del proyecto
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" component="div">
            Presupuesto del proyecto
          </Typography>
          <Typography variant="h5">{presupuesto}</Typography>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" component="div">
            Total de gastos
          </Typography>
          <Typography variant="h5">{totalG}</Typography>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="caption" color="text.secondary" component="div">
            Porcentaje usado del presupuesto %
          </Typography>
          <Typography variant="h5">{porcentaje}</Typography>
        </Paper>
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Gastos
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre de recurso</TableCell>
              <TableCell align="right">Costo de recurso S/.</TableCell>
              <TableCell>Fecha de adquisición</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.Id}</TableCell>
                <TableCell>{dato["Nombre de recurso"]}</TableCell>
                <TableCell align="right">
                  {dato["Costo de recurso (S/.)"]}
                </TableCell>
                <TableCell>{dato["Fecha de adquisición"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
