import React, { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

const DialogAsignarRecurso = ({ open, handleClose, proyecto, empleado }) => {
    const [horasAsignadas, setHorasAsignadas] = useState('');
    const [fechaFinTrabajo, setFechaFinTrabajo] = useState('');
    const dia = fechaFinTrabajo.$D;
    const mes = fechaFinTrabajo.$M;
    const anio = fechaFinTrabajo.$y;
    const fechaFormateada = `${anio}/${mes}/${dia}`;
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/agregar-asignacion-empleado/${proyecto.proyecto_id}/${empleado.empleado_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha_fin_trabajo: fechaFormateada,
                    horas_asignadas_trabajo: horasAsignadas
                })
            });
            if (!response.ok) throw new Error('Error al agregar el recurso asignado')
            else window.location.reload()
            handleClose()
        } catch (error) {
            setError(error.message);
        }
        handleClose();
    };
    const handleHorasAsignadasChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setHorasAsignadas(value);
        }
    };
    const handleFechaFinTrabajoChange = (date) => {
        setFechaFinTrabajo(date)
    };
    useEffect(() => {
        setError(null);
    }, [open]);
    return (
        <Dialog open={ open } onClose={ handleClose } fullWidth maxWidth="xs">
            <DialogTitle>Asignar empleado</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Estás asignando a <strong>{empleado.concat}</strong> al proyecto{' '}
                    <strong>{proyecto.nombre_proyecto}</strong>.
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Horas de trabajo por semana"
                        type="number"
                        value = { horasAsignadas }
                        onChange = { handleHorasAsignadasChange }
                        inputProps={{ min: 0 }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Fecha de fin del trabajo"
                            value = { fechaFinTrabajo }
                            onChange = { handleFechaFinTrabajoChange }
                            format = 'DD/MM/YYYY'
                        />
                    </LocalizationProvider>
                </Box>
                {error && <DialogContentText color="error" sx={{ mt: 2 }}>{error}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>
                    Cancelar
                </Button>
                <Button
                    variant = 'contained'
                    onClick = { handleConfirm }
                    color = 'primary'
                >
                    Guardar cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAsignarRecurso;