import { Box, Button, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';


const CrearTareaCas = ({proyecto_id}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleados, setSelectedEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState('');

  const handleNombreChange = (event) => {
      setNombre(event.target.value);
    };

  const handleDescripcionChange = (event) => {
      setDescripcion(event.target.value);
    };

    const handleDiaChange = (event) => {
        setDia(event.target.value);
    };

    const handleHoraChange = (event) => {
        setHora(event.target.value);
    };
    useEffect(() => {
        fetch(`http://localhost:4000/empleados/${proyecto_id}`)
          .then((response) => response.json())
          .then((data) => {
            setEmpleados(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, [proyecto_id]);

      const handleEmpleadoChange = (event) => {
        const selectedEmpleadoId = event.target.value;
        const selectedEmpleadoObj = empleados.find(
          (empleado) => empleado.usuario_id === parseInt(selectedEmpleadoId)
        );

        setSelectedEmpleado(selectedEmpleadoObj);
      };

      const handleAgregarEmpleado = () => {
        if (selectedEmpleado) {
          setSelectedEmpleados([...selectedEmpleados, selectedEmpleado]);
          setSelectedEmpleado(null);

          const updatedEmpleados = empleados.filter(
            (empleado) => empleado.usuario_id !== selectedEmpleado.usuario_id
          );
          setEmpleados(updatedEmpleados);
        }
      };

  const handleCrearReunion = async () => {
    try {
      const empleadoIds = selectedEmpleados.map((empleado) => empleado.usuario_id);

        const response = await fetch('http://localhost:4000/crear-tareaCas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreTarea: nombre,
            descripcionTarea: descripcion,
              dia: dia,
              hora: hora,
              proyectoId: proyecto_id,
              usuarioIds: empleadoIds,
          }),
        });

        if (response.ok) {
          console.log('Reunión creada correctamente.');
          // Reset the form
          setDescripcion('');
          setDia('');
          setHora('');
          setSelectedEmpleados([]);
        } else {
          console.log('Error al crear la tarea.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    // Aumento de etiqueta para añadir la propiedad requiered
    <form>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          label="Nombre"
          required
          fullWidth
          value={nombre}
          onChange={handleNombreChange}
        />
        <Box>
          <Typography variant="caption" color="text.secondary">
            Encargados
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <TextField
              select
              fullWidth
              size="small"
              value={selectedEmpleado ? selectedEmpleado.usuario_id : ""}
              onChange={handleEmpleadoChange}
            >
              <MenuItem value="">
                <em>Seleccionar empleado</em>
              </MenuItem>
              {empleados.map((empleado, index) => (
                <MenuItem key={index} value={empleado.usuario_id}>
                  {empleado.empleado}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" onClick={handleAgregarEmpleado}>
              Agregar
            </Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Empleados seleccionados
          </Typography>
          {selectedEmpleados.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No se han seleccionado empleados.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
              {selectedEmpleados.map((empleado, index) => (
                <Chip key={index} label={empleado.empleado} />
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Día de entrega"
            type="date"
            required
            fullWidth
            value={dia}
            onChange={handleDiaChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora de entrega"
            type="time"
            required
            fullWidth
            value={hora}
            onChange={handleHoraChange}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          label="Descripción de la tarea"
          required
          fullWidth
          value={descripcion}
          onChange={handleDescripcionChange}
          placeholder="Descripción de la reunión"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" onClick={handleCrearReunion}>
            Crear
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default CrearTareaCas;
