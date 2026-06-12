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

export default function EmpleaxProyecto() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);

  const cargarDatos = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/empxpro/${proyecto_id}`
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
        <Typography variant="h4">Horas reportadas por empleado</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Horas reportadas por cada empleado en el proyecto
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Empleado</TableCell>
              <TableCell align="right">Horas empleadas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.Empleado}</TableCell>
                <TableCell align="right">{dato["Horas empleadas"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
