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

const DialogAsignarRecurso = ({ open, handleClose, proyecto, recurso }) => {
    const [cantidadAsignada, setCantidadAsignada] = useState('');
    const [tiempoAsignado, setTiempoAsignado] = useState('');
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/agregar-recurso-asignado/${proyecto.proyecto_id}/${recurso.recurso_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cantidad_asignada: cantidadAsignada,
                    tiempo_asignado: tiempoAsignado
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
    const handleCantidadChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setCantidadAsignada(value);
        }
    };
    const handleTiempoChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setTiempoAsignado(value);
        }
    };
    useEffect(() => {
        setError(null);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Asignar recurso</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Estás asignando el recurso <strong>{recurso.nombre}</strong> al proyecto{' '}
                    <strong>{proyecto.nombre_proyecto}</strong>.
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Cantidad"
                        type="number"
                        value = { cantidadAsignada }
                        onChange = { handleCantidadChange }
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        label="Tiempo"
                        type="number"
                        value = { tiempoAsignado }
                        onChange={ handleTiempoChange }
                        inputProps={{ min: 0 }}
                    />
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