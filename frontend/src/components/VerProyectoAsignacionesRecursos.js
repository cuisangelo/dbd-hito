import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Checkbox, FormHelperText } from '@mui/material';
import DialogAsignarRecurso from './DialogAsignarRecurso';
import DialogQuitarRecurso from './DialogQuitarRecurso'
import DialogEditarRecurso from './DialogEditarRecurso';
import { alignProperty } from '@mui/material/styles/cssUtils';

const TIPOS_RECURSO = {
	1: { label: 'Hardware', color: 'default' },
	2: { label: 'Software', color: 'info' },
};

export default function VerProyectoAsignacionesRecursos() {
	const navigate = useNavigate();
	const params = useParams();
	const [proyectoAsignacionesRecursos, setProyectoAsignacionesRecursos] = useState([]);
	const cargarProyectoAsignacionesRecursos = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-asignaciones-recursos/'+id);
		const data = await response.json();
		setProyectoAsignacionesRecursos(data)
	};
	const [recursosDisponibles, setRecursosDisponibles] = useState([]);
	const cargarRecursosDisponibles = async () => {
		const response = await fetch('http://localhost:4000/mostrar-recursos-disponibles');
		const data = await response.json();
		setRecursosDisponibles(data)
	};
	const [datosProyecto, setDatosProyecto] = useState([]);
	const cargarDatosProyecto = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-proyecto/'+id);
		const data = await response.json();
		setDatosProyecto(data)
	};
	useEffect(() => {
		if (params.id) cargarProyectoAsignacionesRecursos(params.id)
		cargarRecursosDisponibles()
		if (params.id) cargarDatosProyecto(params.id)
	}, [params.id])
	const [ selectedRecursoId, setSelectedRecursoId ] = useState(null);
	const handleCheckBoxChange = (recursoId) => {
		setSelectedRecursoId(recursoId)
	};
	const isButtonAsignarDisabled = selectedRecursoId === null || proyectoAsignacionesRecursos.some(recurso => recurso.recurso_id === selectedRecursoId);
	const isButtonQuitarDisabled = selectedRecursoId === null || recursosDisponibles.some(recurso => recurso.recurso_id === selectedRecursoId);
	const [openDialog, setOpenDialog] = useState(false);
	const handleButtonClick = () => {
		setOpenDialog(true);
	};
	const [ selectedRecurso, setSelectedRecurso ] = useState(null);
	const proyectoSeleccionado = datosProyecto.length > 0 ? datosProyecto[0] : null;
	useEffect(() => {
		let selectedRecurso = proyectoAsignacionesRecursos.find(
			(recurso) => recurso.recurso_id === selectedRecursoId
		);
		if (!selectedRecurso) {
			selectedRecurso = recursosDisponibles.find(
				(recurso) => recurso.recurso_id === selectedRecursoId
			)
		}
		setSelectedRecurso(selectedRecurso)
	}, [proyectoAsignacionesRecursos, selectedRecursoId])
	const [openAsignarDialog, setOpenAsignarDialog] = useState(false);
	const [openQuitarDialog, setOpenQuitarDialog] = useState(false);
	const [openEditarDialog, setOpenEditarDialog] = useState(false);
	const handleAsignarButtonClick = () => {
		setOpenAsignarDialog(true);
	};
	const handleQuitarButtonClick = () => {
		setOpenQuitarDialog(true);
	};
	const handleEditarButtonClick = () => {
		setOpenEditarDialog(true);
	};
	const handleDialogClose = () => {
		setOpenAsignarDialog(false);
		setOpenQuitarDialog(false);
		setOpenEditarDialog(false);
	};
	return (
		<Container>
			<Typography variant="h4" sx={{ mt: 4 }}>
				{proyectoSeleccionado ? proyectoSeleccionado.nombre_proyecto : 'Proyecto'}
			</Typography>
			<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
				Gestión de recursos asignados al proyecto
			</Typography>
			<Box sx={{ display: 'flex', gap: 1.5 }}>
				<Button size="small" variant="contained" onClick={() => navigate(`/lista-proyectos/${params.id}/asignaciones-recursos`)}>
					Recursos
				</Button>
				<Button size="small" variant="outlined" onClick={() => navigate(`/lista-proyectos/${params.id}/asignaciones-empleados`)}>
					Empleados
				</Button>
			</Box>
			<Box sx={{ mt: 4 }}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Recursos asignados al proyecto
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Recurso</TableCell>
								<TableCell>Tipo</TableCell>
								<TableCell align="right">Cantidad asignada</TableCell>
								<TableCell padding="checkbox" />
							</TableRow>
						</TableHead>
						<TableBody>
							{
								proyectoAsignacionesRecursos.map(row => {
									const tipo = TIPOS_RECURSO[row.tipo_recurso];
									return (
										<TableRow key={row.recurso_id} sx={
											{'&:last-child td, &:last-child th': { border: 0 }}
										}>
											<TableCell>{row.recurso_id}</TableCell>
											<TableCell>{row.nombre}</TableCell>
											<TableCell>
												{tipo ? (
													<Chip size="small" label={tipo.label} color={tipo.color} />
												) : (
													row.tipo_recurso
												)}
											</TableCell>
											<TableCell align="right">{row.cantidad_asignada}</TableCell>
											<TableCell padding="checkbox">
												<Checkbox
													checked = {selectedRecursoId === row.recurso_id}
													onChange = {() => handleCheckBoxChange(row.recurso_id)}
												/>
											</TableCell>
										</TableRow>
									);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box sx={{ mt: 4 }}>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Recursos disponibles
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Id</TableCell>
								<TableCell>Recurso</TableCell>
								<TableCell>Tipo</TableCell>
								<TableCell align="right">Cantidad disponible</TableCell>
								<TableCell padding="checkbox" />
							</TableRow>
						</TableHead>
						<TableBody>
							{
								recursosDisponibles.map(row => {
									const tipo = TIPOS_RECURSO[row.tipo_recurso];
									return (
										<TableRow key={row.recurso_id} sx={
											{'&:last-child td, &:last-child th': { border: 0 }}
										}>
											<TableCell>{row.recurso_id}</TableCell>
											<TableCell>{row.nombre}</TableCell>
											<TableCell>
												{tipo ? (
													<Chip size="small" label={tipo.label} color={tipo.color} />
												) : (
													row.tipo_recurso
												)}
											</TableCell>
											<TableCell align="right">{row.cantidad_disponible}</TableCell>
											<TableCell padding="checkbox">
												<Checkbox
													checked = {selectedRecursoId === row.recurso_id}
													onChange={() => handleCheckBoxChange(row.recurso_id)}
												/>
											</TableCell>
										</TableRow>
									);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box sx={{ display: 'flex', gap: 1.5, mt: 3, mb: 4 }}>
				<Button
					variant	= "contained"
					color = "success"
					disabled = { isButtonAsignarDisabled }
					onClick = { handleAsignarButtonClick }
				>
					Asignar recurso
				</Button>
				<Button
					variant	= "outlined"
					color = "error"
					disabled = { isButtonQuitarDisabled }
					onClick = { handleQuitarButtonClick }
				>
					Quitar recurso
				</Button>
				<Button
					variant	= "outlined"
					color = 'info'
					disabled = { isButtonQuitarDisabled }
					onClick = { handleEditarButtonClick }
				>
					Editar cantidad
				</Button>
			</Box>
			{
				openAsignarDialog && (
					<DialogAsignarRecurso
						open = { openAsignarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso = { selectedRecurso }
					/>
				)
			}
			{
				openQuitarDialog && (
					<DialogQuitarRecurso
						open = { openQuitarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso = { selectedRecurso }
					/>
				)
			}
			{
				openEditarDialog && (
					<DialogEditarRecurso
						open = { openEditarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso={ selectedRecurso }
					/>
				)
			}
		</Container>
	)
}