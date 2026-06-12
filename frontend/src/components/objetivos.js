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

export default function Objetivos() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [objetivos, setObjetivos] = useState([]);

  const cargarObjetivos = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/objetivos/${proyecto_id}`
    );
    const data = await response.json();
    setObjetivos(data);
  };
  useEffect(() => {
    if (id) {
      cargarObjetivos(id);
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
        <Typography variant="h4">Reporte de objetivos</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Hitos del proyecto con sus fechas y observaciones
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre del hito</TableCell>
              <TableCell>Descripción del hito</TableCell>
              <TableCell>Fecha inicio del hito</TableCell>
              <TableCell>Fecha final del hito</TableCell>
              <TableCell>Observación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {objetivos.map((objetivo) => (
              <TableRow key={objetivo.id}>
                <TableCell>{objetivo["ID"]}</TableCell>
                <TableCell>{objetivo["Nombre del hito"]}</TableCell>
                <TableCell>{objetivo["Descripcion del hito"]}</TableCell>
                <TableCell>{objetivo["Fecha inicio del hito"]}</TableCell>
                <TableCell>{objetivo["Fecha final del hito"]}</TableCell>
                <TableCell>{objetivo.Observacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
