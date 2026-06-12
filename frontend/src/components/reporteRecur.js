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
// añado useParams

export default function ReporteRecursos() {
  // añado

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [sobras, setSobras] = useState([]);

  useEffect(() => {
    const obtenerSobrantes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/sobrantes/${id}`);
        const data = await response.json();
        setSobras(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerSobrantes();
  }, [id]);

  const cargarDatos = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/recursos/${proyecto_id}`
    );
    const data = await response.json();
    setDatos(data);
  };
  useEffect(() => {
    if (id) {
      cargarDatos(id);
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
        <Typography variant="h4">Reporte de recursos</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Recursos asignados al proyecto y sobrantes disponibles
      </Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Recursos asignados
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Recurso</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell align="right">Cant. asig.</TableCell>
              <TableCell align="right">Costo</TableCell>
              <TableCell align="right">Cant. disp.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.id}</TableCell>
                <TableCell>{dato.recurso}</TableCell>
                <TableCell>{dato.tipo}</TableCell>
                <TableCell>{dato.proveedor}</TableCell>
                <TableCell align="right">{dato["Cant. asig."]}</TableCell>
                <TableCell align="right">{dato.costo}</TableCell>
                <TableCell align="right">{dato["Cant. disp."]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
        Recursos sobrantes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Recurso</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell align="right">Cant. disp.</TableCell>
              <TableCell align="right">Costo</TableCell>
              <TableCell align="right">Cant. total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sobras.map((sobra) => (
              <TableRow key={sobra.id}>
                <TableCell>{sobra.id}</TableCell>
                <TableCell>{sobra.recurso}</TableCell>
                <TableCell>{sobra.tipo}</TableCell>
                <TableCell>{sobra.proveedor}</TableCell>
                <TableCell align="right">{sobra["Cant. disp"]}</TableCell>
                <TableCell align="right">{sobra.costo}</TableCell>
                <TableCell align="right">{sobra["Cant.total"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
