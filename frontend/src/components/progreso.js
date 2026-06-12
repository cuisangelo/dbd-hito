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
import { useNavigate } from "react-router-dom";
import "./estilo.css";
// añado useParams

const ESTADOS = {
  1: { label: "Pendiente", color: "default" },
  2: { label: "En progreso", color: "info" },
  3: { label: "Finalizado", color: "success" },
};

export default function Progreso() {
  // añado

  const [fechaCreacion, setFechaCreacion] = useState("");

  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const url = `http://localhost:4000/progreso/${fechaCreacion}`;
      const response = await fetch(url);
      const data = await response.json();
      setDatos(data);
    };

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      if (fechaCreacion) {
        cargarDatos();
      }
    }, 1500);

    setTimeoutId(newTimeoutId);
    return () => clearTimeout(timeoutId);
  }, [fechaCreacion]);

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
        <Typography variant="h4">Reporte de progreso</Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Volver
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Avance de los proyectos según la fecha de creación indicada
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
        <Button
          variant="contained"
          //   component={Link}
          //   to={`/planifivsRepor/${fechaCreacion}`}
        >
          Consultar
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Proyecto</TableCell>
              <TableCell align="right">Tot.reuniones</TableCell>
              <TableCell align="right">Tareas a tiempo %</TableCell>
              <TableCell align="right">Tareas a destiempo %</TableCell>
              <TableCell align="right">Tareas no entregadas %</TableCell>
              <TableCell align="right">Presupuesto</TableCell>
              <TableCell align="right">Gastos</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell>Fecha final est.</TableCell>
              <TableCell align="right">Tiempo trans. "sem"</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((dato) => {
              const estado = ESTADOS[dato["Estado"]];
              return (
                <TableRow key={dato.id}>
                  <TableCell>{dato.Proyecto}</TableCell>
                  <TableCell align="right">{dato["Tot.reuniones"]}</TableCell>
                  <TableCell align="right">
                    {dato["Tareas a tiempo(%)"]}
                  </TableCell>
                  <TableCell align="right">
                    {dato["Tareas a destiempo(%)"]}
                  </TableCell>
                  <TableCell align="right">
                    {dato["Tareas no entregadas(%)"]}
                  </TableCell>
                  <TableCell align="right">{dato["Presupuesto"]}</TableCell>
                  <TableCell align="right">{dato.Gastos}</TableCell>
                  <TableCell>{dato["Fecha creación"]}</TableCell>
                  <TableCell>{dato["Fecha final est."]}</TableCell>
                  <TableCell align="right">
                    {dato["Tiempo trans.(sem)"]}
                  </TableCell>
                  <TableCell>
                    {estado ? (
                      <Chip
                        size="small"
                        label={estado.label}
                        color={estado.color}
                      />
                    ) : (
                      dato["Estado"]
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
