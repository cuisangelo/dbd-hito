import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const CrearReunion = ({ proyecto_id }) => {
  const [descripcion, setDescripcion] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleados, setSelectedEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState("");

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
        console.error("Error:", error);
      });
  }, [proyecto_id]);

  const handleEmpleadoChange = (event) => {
    setSelectedEmpleado(event.target.value);
  };

  const handleAgregarEmpleado = () => {
    if (selectedEmpleado) {
      setSelectedEmpleados([...selectedEmpleados, selectedEmpleado]);
      setSelectedEmpleado("");

      const updatedEmpleados = empleados.filter(
        (empleado) => empleado.empleado !== selectedEmpleado
      );
      setEmpleados(updatedEmpleados);
    }
  };

  const handleCrearReunion = async () => {
    try {
      const response = await fetch("http://localhost:4000/crear-reunion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dia: dia,
          hora: hora,
          descripcion: descripcion,
          proyectoId: proyecto_id,
          empleados: selectedEmpleados,
        }),
      });

      if (response.ok) {
        console.log("Reunión creada correctamente.");
        // Reset the form
        setDescripcion("");
        setDia("");
        setHora("");
        setSelectedEmpleados([]);
      } else {
        console.log("Error al crear la reunión.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
    >
      <TextField
        label="Descripción de la reunión"
        required
        fullWidth
        value={descripcion}
        onChange={handleDescripcionChange}
        placeholder="Descripción de la reunión"
      />
      <TextField
        label="Día de la reunión"
        required
        type="date"
        value={dia}
        onChange={handleDiaChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Hora de la reunión"
        required
        type="time"
        value={hora}
        onChange={handleHoraChange}
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <TextField
          select
          label="Lista de participantes"
          fullWidth
          value={selectedEmpleado}
          onChange={handleEmpleadoChange}
        >
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
          {empleados.map((empleado, index) => (
            <MenuItem key={index} value={empleado.empleado}>
              {empleado.empleado}
            </MenuItem>
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
              <Chip key={index} label={empleado} size="small" />
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" onClick={handleCrearReunion}>
          Crear
        </Button>
      </Box>
    </Box>
  );
};

export default CrearReunion;
