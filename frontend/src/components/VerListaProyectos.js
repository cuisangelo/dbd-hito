import { useEffect, useState } from "react";
import {
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

const ESTADOS = {
  1: { label: "Planificado", color: "default" },
  2: { label: "En curso", color: "info" },
  3: { label: "Finalizado", color: "success" },
};

export default function ListaProyectos() {
  const navigate = useNavigate();
  const [listaProyectos, setListaProyectos] = useState([]);

  const cargarListaProyectos = async () => {
    const response = await fetch(
      "http://localhost:4000/mostrar-lista-proyectos"
    );
    const data = await response.json();
    setListaProyectos(data);
  };

  useEffect(() => {
    cargarListaProyectos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Proyectos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Cartera de proyectos en desarrollo de Tech Innovation
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Proyecto</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Inicio</TableCell>
              <TableCell>Fin estimado</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProyectos.map((row) => {
              const estado = ESTADOS[row.estado_proyecto];
              return (
                <TableRow
                  key={row.proyecto_id}
                  onClick={() => navigate(`/proyecto/${row.proyecto_id}`)}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ maxWidth: 360 }}>
                    <Typography variant="subtitle2">
                      {row.nombre_proyecto}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {row.descripcion_proyecto}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.nombre_cliente}</TableCell>
                  <TableCell>{row.fecha_creacion}</TableCell>
                  <TableCell>{row.fecha_finalizacion_estimada}</TableCell>
                  <TableCell>
                    {estado ? (
                      <Chip
                        size="small"
                        label={estado.label}
                        color={estado.color}
                      />
                    ) : (
                      row.estado_proyecto
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
