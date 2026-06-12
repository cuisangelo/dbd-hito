import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';


const CrearTarea = ({proyecto_id}) => {
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

        const response = await fetch('http://localhost:4000/crear-tarea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nombre: nombre,
              descripcion: descripcion,
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
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
    >
      <TextField
        label="Nombre"
        required
        fullWidth
        value={nombre}
        onChange={handleNombreChange}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          select
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
          label="Encargados"
          fullWidth
          value={selectedEmpleado}
          onChange={handleEmpleadoChange}
        >
          <option value=""></option>
          {empleados.map((empleado, index) => (
            <option key={index} value={empleado.usuario_id}>
              {empleado.empleado}
            </option>
          ))}
        </TextField>
        <Button type="button" variant="outlined" onClick={handleAgregarEmpleado}>
          Agregar
        </Button>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Empleados seleccionados
        </Typography>
        {selectedEmpleados.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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
      <TextField
        label="Día de entrega"
        type="date"
        required
        InputLabelProps={{ shrink: true }}
        value={dia}
        onChange={handleDiaChange}
      />
      <TextField
        label="Hora de entrega"
        type="time"
        required
        InputLabelProps={{ shrink: true }}
        value={hora}
        onChange={handleHoraChange}
      />
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
    </Box>
  );
};

export default CrearTarea;
