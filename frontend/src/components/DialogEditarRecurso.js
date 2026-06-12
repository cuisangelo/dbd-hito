import React, { useState } from 'react';
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

const DialogEditarRecurso = ({ open, handleClose, proyecto, recurso }) => {
    const [nuevaCantidad, setNuevaCantidad] = useState('');
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/editar-cantidad-asignada-recurso/${proyecto.proyecto_id}/${recurso.recurso_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad_asignada: nuevaCantidad })
            });
            if (!response.ok) throw new Error('Error al agregar el recurso asignado')
            else window.location.reload()
        } catch (error) {
            setError(error.message)
        }
        handleClose();
    };
    const handleCantidadChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setNuevaCantidad(value);
        }
    };
    return (
        <Dialog open={ open } onClose={ handleClose } fullWidth maxWidth="xs">
            <DialogTitle>Editar cantidad asignada</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mb: 2 }}>
                    Estás editando la cantidad de <strong>{recurso.nombre}</strong> asignada
                    al proyecto <strong>{proyecto.nombre_proyecto}</strong>.
                </DialogContentText>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Cantidad"
                        type="number"
                        value = { nuevaCantidad }
                        onChange = { handleCantidadChange }
                        inputProps={{ min: 0 }}
                    />
                </Box>
                {error && <DialogContentText color="error" sx={{ mt: 2 }}>{error}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick = { handleClose }>
                    Cancelar
                </Button>
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick = { handleConfirm }
                >
                    Guardar cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogEditarRecurso;