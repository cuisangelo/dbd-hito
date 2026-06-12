import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Select, MenuItem, Button, Box, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ESTADO_CHIP_COLORS = { 1: "default", 2: "info", 3: "success" };

const Campo = ({ etiqueta, children }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {etiqueta}
    </Typography>
    <Box sx={{ backgroundColor: "#f4f6fa", borderRadius: 2, p: 1.5 }}>
      {children}
    </Box>
  </Box>
);

const DetallesTareaComponent = ({id}) => {
    const [detallesTarea, setDetallesTarea] = useState(null);
    const [encargados, setEncargados] = useState([]);
    const [adjuntos, setAdjuntos] = useState([]);
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [estado_tarea, setEstado_Tarea] = useState('');
    const [estadoTarea, setEstadoTarea] = useState('');
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const handleEstadoTareaChange = (event) => {
      setEstado_Tarea(event.target.value);
    };

    const handleEditarEstadoTarea = () => {
      const confirmar = window.confirm('¿Estás seguro de editar el estado?');
        if (confirmar){
        fetch(`http://localhost:4000/tarea/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado_tarea }),
        })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', data);
          setMostrarMenu(false);
          })
          .catch(error => {
            console.error('Error al enviar la petición POST:', error);
          });
          window.location.reload();
        }
    };

    const handleImagenClick = () => {
      setMostrarMenu(!mostrarMenu);
    };

    useEffect(() => {
      const obtenerDetallesTarea = async () => {
        try {
          const response = await fetch(`http://localhost:4000/mostrar-detalles-tarea/${id}`);
          const data = await response.json();
          setDetallesTarea(data.detallesTarea[0]);
          setEncargados(data.encargados);
          setAdjuntos(data.adjuntos);

          const { fecha_realizada_tarea, hora_realizada_tarea, estado_tarea } = data.detallesTarea[0];

          if (fecha_realizada_tarea && hora_realizada_tarea) {
            const fechaFinalizacion = `${fecha_realizada_tarea.substring(0, 10)} - ${hora_realizada_tarea.substring(0, 8)}`;
              setFechaFinalizacion(fechaFinalizacion);
          } else {
              setFechaFinalizacion('---');
          }
          if (estado_tarea === 1) {const estadoTarea = "Pendiente"; setEstadoTarea(estadoTarea);}
          else if (estado_tarea === 2) {const estadoTarea = "En Progreso"; setEstadoTarea(estadoTarea);}
          else if (estado_tarea === 3) {const estadoTarea = "Finalizada"; setEstadoTarea(estadoTarea);}
        } catch (error) {
          console.log(error);
        }
      };

      obtenerDetallesTarea();
    }, [id]);

    return (
      <div>
        {detallesTarea && (
          <>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {detallesTarea.nombre_tarea}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Encargados
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                    {encargados.map((encargado, index) => (
                      <Chip key={index} label={encargado.encargado} />
                    ))}
                  </Box>
                </Box>
                <Campo etiqueta="Fecha creación">
                  <Typography variant="body1">{detallesTarea.fecha_creacion}</Typography>
                </Campo>
                <Campo etiqueta="Fecha entrega">
                  <Typography variant="body1">{detallesTarea.fecha_entrega}</Typography>
                </Campo>
                <Campo etiqueta="Descripción">
                  <Typography variant="body1">{detallesTarea.descripcion_tarea}</Typography>
                </Campo>
                <Campo etiqueta="Fecha realizada">
                  <Typography variant="body1">{fechaFinalizacion}</Typography>
                </Campo>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Estado de tarea
                    </Typography>
                    <IconButton
                      size="small"
                      color="primary"
                      aria-label="Editar estado tarea"
                      onClick={handleImagenClick}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {mostrarMenu && (
                    <Select
                      size="small"
                      value={estado_tarea}
                      onChange={handleEstadoTareaChange}
                    >
                      <MenuItem value="1">Pendiente</MenuItem>
                      <MenuItem value="2">En Progreso</MenuItem>
                      <MenuItem value="3">Finalizada</MenuItem>
                    </Select>
                  )}
                  {estadoTarea && mostrarMenu && (
                    <Button type="submit" onClick={handleEditarEstadoTarea} color="primary">
                      Guardar
                    </Button>
                  )}
                  {!mostrarMenu && (
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        size="small"
                        label={estadoTarea}
                        color={ESTADO_CHIP_COLORS[detallesTarea.estado_tarea] || "default"}
                      />
                    </Box>
                  )}
                </Box>
                <Campo etiqueta="Jefe de proyecto">
                  <Typography variant="body1">{detallesTarea.jefe_proyecto}</Typography>
                </Campo>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Adjuntos
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 0.5 }}>
                    {adjuntos.map((adjuntos, index) => (
                      <Link
                        key={index}
                        to={adjuntos.adjunto_link}
                        target="_blank"
                        download={adjuntos.nombre_adjunto}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="body1" color="primary">
                          {adjuntos.nombre_adjunto}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
        </>
        )}
      </div>
    );
  };

  export default DetallesTareaComponent;
