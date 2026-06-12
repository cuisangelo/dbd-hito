import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const DialogQuitarEmpleado = ({ open, handleClose, proyecto, empleado }) => {
    const handleConfirm = async () => {
        try {
            console.log(proyecto.proyecto_id)
            console.log(empleado.empleado_id)
            const response = await fetch(`http://localhost:4000/quitar-asignacion-empleado/${proyecto.proyecto_id}/${empleado.empleado_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al quitar el recurso asignado')
            else window.location.reload()
        } catch (error) {
            console.error(error)
        }
        handleClose();
    };
    return (
        <Dialog open = { open } onClose = { handleClose } fullWidth maxWidth="xs">
            <DialogTitle>Quitar empleado</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Seguro que deseas quitar al empleado <strong>{empleado.concat}</strong>{' '}
                    asignado al proyecto <strong>{proyecto.nombre_proyecto}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
                <Button
                    variant = 'contained'
                    color = 'error'
                    onClick={ handleConfirm }
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogQuitarEmpleado;