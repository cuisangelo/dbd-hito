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

const DialogQuitarRecurso = ({ open, handleClose, proyecto, recurso }) => {
    const navigate = useNavigate();
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/quitar-recurso-asignado/${proyecto.proyecto_id}/${recurso.recurso_id}`, {
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
        <Dialog open={ open } onClose={ handleClose } fullWidth maxWidth="xs">
            <DialogTitle>Quitar recurso</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ¿Seguro que deseas quitar el recurso <strong>{recurso.nombre}</strong>{' '}
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

export default DialogQuitarRecurso;