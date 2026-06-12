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
import { useNavigate, Link } from "react-router-dom";
import "./estilo.css";
// añado useParams

export default function PlanifivsReportado() {
  // añado

  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  //   const { fecha1, fecha2 } = useParams();

  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const url = `http://localhost:4000/planivsrepo/${fechaCreacion}/${fechaFin}`;
      const response = await fetch(url);
      const data = await response.json();
      setDatos(data);
    };

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      if (fechaCreacion && fechaFin) {
        cargarDatos();
      }
    }, 1500);

    setTimeoutId(newTimeoutId);
    return () => clearTimeout(timeoutId);
  }, [fechaCreacion, fechaFin]);

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
        <Typography variant="h4">Planificado vs Reportado</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Comparación de fechas planificadas y horas reportadas por proyecto
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="fecha-input">
          <label htmlFor="fechaCreacion">Fecha creación:</label>
          <input
            type="text"
            id="fechaCreacion"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
          />
        </div>
        <div className="fecha-input">
          <label htmlFor="fechaFin">Fecha fin:</label>
          <input
            type="text"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          component={Link}
          to={`/planifivsRepor/${fechaCreacion}/${fechaFin}`}
        >
          Consultar
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Proyecto</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha fin estimada</TableCell>
              <TableCell>Fecha fin</TableCell>
              <TableCell align="right">Horas empleadas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((dato) => (
              <TableRow key={dato.id}>
                <TableCell>{dato.Proyecto}</TableCell>
                <TableCell>{dato["Fecha Inicio"]}</TableCell>
                <TableCell>{dato["Fecha fin estimada"]}</TableCell>
                <TableCell>{dato["Fecha fin"]}</TableCell>
                <TableCell align="right">{dato["Horas empleadas"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
