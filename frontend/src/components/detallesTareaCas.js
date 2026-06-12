import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Select, MenuItem, Button, Box, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ESTADO_CHIP_COLOR = {
  Pendiente: "default",
  "En Progreso": "info",
  Finalizada: "success",
};

const Campo = ({ label, children }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Box sx={{ backgroundColor: "#f4f6fa", borderRadius: 2, p: 1.5 }}>
      <Typography variant="body1">{children}</Typography>
    </Box>
  </Box>
);

const DetallesTareaCasComponent = ({id}) => {
    const [detallesTarea, setDetallesTarea] = useState(null);
    const [encargados, setEncargados] = useState([]);
    const [adjuntos, setAdjuntos] = useState([]);
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [fecha_creacion, setFechaCreacion] = useState('');
    const [fecha_entrega, setFechaEntrega] = useState('');
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
          const response = await fetch(`http://localhost:4000/mostrar-detalles-tareaCas/${id}`);
          const data = await response.json();
          setDetallesTarea(data.detallesTarea[0]);
          setEncargados(data.encargados);
          setAdjuntos(data.adjuntos);

          const { fecha_creacion_tarea, hora_creacion_tarea, fecha_limite_tarea, hora_limite_tarea,
            fecha_realizada_tarea, hora_realizada_tarea, estado_tarea } = data.detallesTarea[0];
            const fecha_creacion = `${fecha_creacion_tarea.substring(0, 10)} - ${hora_creacion_tarea.substring(0, 8)}`;
            setFechaCreacion(fecha_creacion);
            const fecha_entrega = `${fecha_limite_tarea.substring(0, 10)} - ${hora_limite_tarea.substring(0, 8)}`;
            setFechaEntrega(fecha_entrega);

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
            <Typography variant="h6" sx={{ mb: 2 }}>
              {detallesTarea.nombre_tarea}
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Campo label="Fecha Creación">{fecha_creacion}</Campo>
                <Campo label="Fecha Entrega">{fecha_entrega}</Campo>
                <Campo label="Descripción">{detallesTarea.descripcion_tarea}</Campo>
                <Campo label="Fecha Realizada">{fechaFinalizacion}</Campo>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Estado de Tarea
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="Editar estado tarea"
                      onClick={handleImagenClick}
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                  {mostrarMenu && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Select
                        size="small"
                        value={estado_tarea}
                        onChange={handleEstadoTareaChange}
                      >
                        <MenuItem value="1">Pendiente</MenuItem>
                        <MenuItem value="2">En Progreso</MenuItem>
                        <MenuItem value="3">Finalizada</MenuItem>
                      </Select>
                      {estadoTarea && (
                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          onClick={handleEditarEstadoTarea}
                          color="primary"
                        >
                          Guardar
                        </Button>
                      )}
                    </Box>
                  )}
                  {!mostrarMenu && (
                    <Box>
                      <Chip
                        size="small"
                        label={estadoTarea}
                        color={ESTADO_CHIP_COLOR[estadoTarea] || "default"}
                      />
                    </Box>
                  )}
                </Box>
                <Campo label="Jefe de Proyecto">{detallesTarea.jefe_proyecto}</Campo>
                {/* <Typography variant="h6" marginTop='12px'>Adjuntos:</Typography> */}
              </Box>
            </Box>
        </>
        )}
      </div>
    );
  };

  export default DetallesTareaCasComponent;
