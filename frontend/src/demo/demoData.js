// Static dataset for demo mode. Key names mirror the 2023 Express API
// responses (see backend/src/controllers), including pg's lowercased and
// quoted SQL aliases, so the legacy components render unchanged.

export const proyectos = [
  {
    proyecto_id: 1,
    fecha_creacion: "2023-03-01",
    fecha_finalizacion_estimada: "2023-07-15",
    nombre_proyecto: "Sistema de Gestión de Inventarios",
    descripcion_proyecto:
      "Implementación de un sistema web para el control de inventarios y almacenes de Comercial Andina.",
    estado_proyecto: 2,
    nombre_cliente: "Comercial Andina S.A.C.",
  },
  {
    proyecto_id: 2,
    fecha_creacion: "2023-04-10",
    fecha_finalizacion_estimada: "2023-08-30",
    nombre_proyecto: "Plataforma de Ventas Online",
    descripcion_proyecto:
      "Desarrollo de una tienda virtual con pasarela de pagos y panel administrativo.",
    estado_proyecto: 1,
    nombre_cliente: "Retail Express E.I.R.L.",
  },
  {
    proyecto_id: 3,
    fecha_creacion: "2023-02-15",
    fecha_finalizacion_estimada: "2023-06-30",
    nombre_proyecto: "Migración de Base de Datos",
    descripcion_proyecto:
      "Migración del core transaccional desde Oracle hacia PostgreSQL con réplicas de lectura.",
    estado_proyecto: 3,
    nombre_cliente: "Banco del Sur",
  },
];

export const detallesProyecto = {
  detallesProyecto: [
    {
      proyecto_id: 1,
      nombre_proyecto: "Sistema de Gestión de Inventarios",
      nombre_cliente: "Comercial Andina S.A.C.",
      fecha_creacion: "2023-03-01",
      fecha_finalizacion_estimada: "2023-07-15",
      descripcion_proyecto:
        "Implementación de un sistema web para el control de inventarios y almacenes de Comercial Andina.",
      jefe_proyecto: "Luis Rodríguez",
    },
  ],
  desarrolladores: [
    { desarrolladores: "María Torres" },
    { desarrolladores: "Jorge Quispe" },
    { desarrolladores: "Ana Castillo" },
  ],
  hardware: [
    { recurso_hardware: "Laptop Dell Latitude 5530" },
    { recurso_hardware: "Servidor HP ProLiant" },
  ],
  software: [
    { recurso_software: "Licencia IntelliJ IDEA" },
    { recurso_software: "PostgreSQL 15" },
  ],
  adjuntos: [
    { nombre_adjunto: "acta-constitucion.pdf", adjunto_link: "#" },
    { nombre_adjunto: "cronograma-v2.xlsx", adjunto_link: "#" },
  ],
};

export const tareas = [
  {
    tarea_id: 1,
    nombre_tarea: "Modelar esquema de base de datos",
    descripcion_tarea:
      "Diseñar el modelo entidad-relación y normalizar hasta 3FN.",
    fecha_hora: "2023-04-14 18:00:00",
    estado_tarea: 3,
    fecha_creacion: "2023-03-06 - 09:00:00",
    fecha_entrega: "2023-04-14 - 18:00:00",
    fecha_realizada_tarea: "2023-04-12",
    hora_realizada_tarea: "16:45:00",
    jefe_proyecto: "Luis Rodríguez",
  },
  {
    tarea_id: 2,
    nombre_tarea: "Configurar entorno de desarrollo",
    descripcion_tarea:
      "Preparar contenedores, base de datos local y scripts de carga inicial.",
    fecha_hora: "2023-03-20 18:00:00",
    estado_tarea: 3,
    fecha_creacion: "2023-03-06 - 09:30:00",
    fecha_entrega: "2023-03-20 - 18:00:00",
    fecha_realizada_tarea: "2023-03-17",
    hora_realizada_tarea: "11:20:00",
    jefe_proyecto: "Luis Rodríguez",
  },
  {
    tarea_id: 3,
    nombre_tarea: "Implementar API de inventario",
    descripcion_tarea:
      "Endpoints REST para productos, almacenes y movimientos de stock.",
    fecha_hora: "2023-06-30 18:00:00",
    estado_tarea: 2,
    fecha_creacion: "2023-05-02 - 10:00:00",
    fecha_entrega: "2023-06-30 - 18:00:00",
    fecha_realizada_tarea: null,
    hora_realizada_tarea: null,
    jefe_proyecto: "Luis Rodríguez",
  },
  {
    tarea_id: 4,
    nombre_tarea: "Maquetar vista de almacenes",
    descripcion_tarea: "Pantallas de listado y detalle de almacenes con MUI.",
    fecha_hora: "2023-07-07 18:00:00",
    estado_tarea: 2,
    fecha_creacion: "2023-05-15 - 10:00:00",
    fecha_entrega: "2023-07-07 - 18:00:00",
    fecha_realizada_tarea: null,
    hora_realizada_tarea: null,
    jefe_proyecto: "Luis Rodríguez",
  },
  {
    tarea_id: 5,
    nombre_tarea: "Diseñar módulo de reportes",
    descripcion_tarea:
      "Definir reportes de rotación de stock y valorización de inventario.",
    fecha_hora: "2023-07-12 18:00:00",
    estado_tarea: 1,
    fecha_creacion: "2023-06-01 - 09:00:00",
    fecha_entrega: "2023-07-12 - 18:00:00",
    fecha_realizada_tarea: null,
    hora_realizada_tarea: null,
    jefe_proyecto: "Luis Rodríguez",
  },
  {
    tarea_id: 6,
    nombre_tarea: "Configurar respaldos automáticos",
    descripcion_tarea: "Backups diarios con retención de 30 días.",
    fecha_hora: "2023-07-14 18:00:00",
    estado_tarea: 1,
    fecha_creacion: "2023-06-05 - 09:00:00",
    fecha_entrega: "2023-07-14 - 18:00:00",
    fecha_realizada_tarea: null,
    hora_realizada_tarea: null,
    jefe_proyecto: "Luis Rodríguez",
  },
];

export const encargadosPorTarea = [
  { tarea_id: 1, encargado: "Ana Castillo" },
  { tarea_id: 2, encargado: "María Torres" },
  { tarea_id: 3, encargado: "María Torres" },
  { tarea_id: 4, encargado: "Jorge Quispe" },
  { tarea_id: 5, encargado: "Ana Castillo" },
  { tarea_id: 6, encargado: "María Torres" },
];

export const reuniones = [
  {
    dia_hora: "2023-03-06 09:00:00",
    descripcion_reunion: "Kickoff del proyecto con el cliente",
  },
  {
    dia_hora: "2023-05-08 10:00:00",
    descripcion_reunion: "Revisión del sprint 3 y demo de avances",
  },
  {
    dia_hora: "2023-06-19 15:30:00",
    descripcion_reunion: "Planificación del módulo de reportes",
  },
];

export const empleadosProyecto = [
  { usuario_id: 1, empleado: "Luis Rodríguez" },
  { usuario_id: 2, empleado: "María Torres" },
  { usuario_id: 3, empleado: "Jorge Quispe" },
  { usuario_id: 4, empleado: "Ana Castillo" },
];

export const asignacionesEmpleados = [
  {
    empleado_id: 2,
    concat: "María Torres",
    horas_asignadas_trabajo: 120,
    especialidad: "Backend",
  },
  {
    empleado_id: 3,
    concat: "Jorge Quispe",
    horas_asignadas_trabajo: 100,
    especialidad: "Frontend",
  },
  {
    empleado_id: 4,
    concat: "Ana Castillo",
    horas_asignadas_trabajo: 80,
    especialidad: "Análisis de datos",
  },
];

export const empleadosDisponibles = [
  {
    empleado_id: 5,
    concat: "Pedro Salas",
    especialidad: "QA",
    total_horas_disponibles: 160,
    salario_hora: 35,
  },
  {
    empleado_id: 6,
    concat: "Carla Mendoza",
    especialidad: "DBA",
    total_horas_disponibles: 160,
    salario_hora: 45,
  },
];

export const asignacionesRecursos = [
  {
    recurso_id: 1,
    nombre: "Laptop Dell Latitude 5530",
    tipo_recurso: 1,
    cantidad_asignada: 4,
  },
  {
    recurso_id: 2,
    nombre: "Servidor HP ProLiant",
    tipo_recurso: 1,
    cantidad_asignada: 1,
  },
  {
    recurso_id: 3,
    nombre: "Licencia IntelliJ IDEA",
    tipo_recurso: 2,
    cantidad_asignada: 5,
  },
];

export const recursosDisponibles = [
  {
    recurso_id: 4,
    nombre: "Monitor LG 27''",
    tipo_recurso: 1,
    cantidad_disponible: 6,
  },
  {
    recurso_id: 5,
    nombre: "Licencia Figma",
    tipo_recurso: 2,
    cantidad_disponible: 10,
  },
];

export const presupuestos = [
  {
    presupuesto_id: 1,
    descripcion_presupuesto: "Presupuesto general 2023",
    fecha_creacion_presupuesto: "2023-03-05",
    monto_presupuesto: 45000,
    divisa_presupuesto: "PEN",
    porcentaje_usado: 39,
    estado_presupuesto: 1,
    proyecto_id: 1,
  },
  {
    presupuesto_id: 2,
    descripcion_presupuesto: "Presupuesto plataforma de ventas",
    fecha_creacion_presupuesto: "2023-04-12",
    monto_presupuesto: 80000,
    divisa_presupuesto: "PEN",
    porcentaje_usado: 18,
    estado_presupuesto: 1,
    proyecto_id: 2,
  },
  {
    presupuesto_id: 3,
    descripcion_presupuesto: "Presupuesto migración core",
    fecha_creacion_presupuesto: "2023-02-20",
    monto_presupuesto: 30000,
    divisa_presupuesto: "PEN",
    porcentaje_usado: 90,
    estado_presupuesto: 2,
    proyecto_id: 3,
  },
];

export const partidas = [
  {
    partida_id: 1,
    estado_partida: 1,
    divisa: "PEN",
    descripcion: "Licencias de software",
    monto: 12000,
    fecha_estimacion: "2023-03-10",
    presupuesto_id: 1,
    tipo_partida: 1,
  },
  {
    partida_id: 2,
    estado_partida: 1,
    divisa: "PEN",
    descripcion: "Equipos de cómputo",
    monto: 18000,
    fecha_estimacion: "2023-03-10",
    presupuesto_id: 1,
    tipo_partida: 2,
  },
  {
    partida_id: 3,
    estado_partida: 1,
    divisa: "PEN",
    descripcion: "Servicios cloud",
    monto: 9000,
    fecha_estimacion: "2023-04-15",
    presupuesto_id: 2,
    tipo_partida: 3,
  },
  {
    partida_id: 4,
    estado_partida: 2,
    divisa: "PEN",
    descripcion: "Consultoría externa",
    monto: 15000,
    fecha_estimacion: "2023-02-25",
    presupuesto_id: 3,
    tipo_partida: 3,
  },
];

export const gastos = [
  {
    gasto_id: 1,
    descripcion: "Licencias JetBrains (5 anuales)",
    monto: 4500,
    fecha: "2023-04-02",
    divisa: "PEN",
    partida_id: 1,
  },
  {
    gasto_id: 2,
    descripcion: "Laptop Dell Latitude 5530",
    monto: 5200,
    fecha: "2023-03-22",
    divisa: "PEN",
    partida_id: 2,
  },
  {
    gasto_id: 3,
    descripcion: "Monitor LG 27''",
    monto: 1100,
    fecha: "2023-03-22",
    divisa: "PEN",
    partida_id: 2,
  },
  {
    gasto_id: 4,
    descripcion: "AWS EC2 — abril",
    monto: 850,
    fecha: "2023-05-02",
    divisa: "PEN",
    partida_id: 3,
  },
  {
    gasto_id: 5,
    descripcion: "Consultor Cassandra (40 h)",
    monto: 6000,
    fecha: "2023-03-15",
    divisa: "PEN",
    partida_id: 4,
  },
];

// ---- Reportes (las claves replican los alias SQL citados del backend) ----

export const reporteObjetivos = [
  {
    ID: 1,
    "Nombre del hito": "Análisis y diseño",
    "Descripcion del hito": "Levantamiento de requerimientos y modelo de datos",
    "Fecha inicio del hito": "2023-03-01",
    "Fecha final del hito": "2023-04-15",
    Observacion: "Completado sin observaciones",
  },
  {
    ID: 2,
    "Nombre del hito": "Desarrollo del núcleo",
    "Descripcion del hito": "API de inventario y pantallas principales",
    "Fecha inicio del hito": "2023-04-16",
    "Fecha final del hito": "2023-06-30",
    Observacion: "En curso",
  },
  {
    ID: 3,
    "Nombre del hito": "Pruebas y despliegue",
    "Descripcion del hito": "QA, capacitación y puesta en producción",
    "Fecha inicio del hito": "2023-07-01",
    "Fecha final del hito": "2023-07-15",
    Observacion: "Pendiente",
  },
];

export const reporteEmpxPro = [
  { Empleado: "María Torres", "Horas empleadas": 120 },
  { Empleado: "Jorge Quispe", "Horas empleadas": 100 },
  { Empleado: "Ana Castillo", "Horas empleadas": 80 },
];

export const reportePlanivsRepo = [
  {
    Proyecto: "Migración de Base de Datos",
    "Fecha Inicio": "2023-02-15",
    "Fecha fin estimada": "2023-06-30",
    "Fecha fin": "2023-06-22",
    "Horas empleadas": 540,
  },
  {
    Proyecto: "Sistema de Gestión de Inventarios",
    "Fecha Inicio": "2023-03-01",
    "Fecha fin estimada": "2023-07-15",
    "Fecha fin": "2023-07-10",
    "Horas empleadas": 300,
  },
];

export const reporteTareas = [
  {
    Tarea: 1,
    Encargado: "Ana Castillo",
    "Fecha inicio": "2023-03-06",
    "Fecha límite": "2023-04-14",
    "Fecha fin": "2023-04-12",
    Descripcion: "Diseñar el modelo entidad-relación y normalizar hasta 3FN.",
    Estado: 3,
  },
  {
    Tarea: 3,
    Encargado: "María Torres",
    "Fecha inicio": "2023-05-02",
    "Fecha límite": "2023-06-30",
    "Fecha fin": "—",
    Descripcion: "Endpoints REST para productos, almacenes y movimientos.",
    Estado: 2,
  },
  {
    Tarea: 5,
    Encargado: "Ana Castillo",
    "Fecha inicio": "2023-06-01",
    "Fecha límite": "2023-07-12",
    "Fecha fin": "—",
    Descripcion: "Definir reportes de rotación y valorización de inventario.",
    Estado: 1,
  },
];

export const reporteRecursos = [
  {
    id: 1,
    recurso: "Laptop Dell Latitude 5530",
    tipo: "Hardware",
    proveedor: "Dell Perú",
    "Cant. asig.": 4,
    costo: 5200,
    "Cant. disp.": 2,
  },
  {
    id: 2,
    recurso: "Servidor HP ProLiant",
    tipo: "Hardware",
    proveedor: "HP Inc.",
    "Cant. asig.": 1,
    costo: 9800,
    "Cant. disp.": 0,
  },
  {
    id: 3,
    recurso: "Licencia IntelliJ IDEA",
    tipo: "Software",
    proveedor: "JetBrains",
    "Cant. asig.": 5,
    costo: 900,
    "Cant. disp.": 0,
  },
];

export const reporteSobrantes = [
  {
    id: 4,
    recurso: "Monitor LG 27''",
    tipo: "Hardware",
    proveedor: "LG Electronics",
    "Cant. disp": 6,
    costo: 1100,
    "Cant.total": 8,
  },
  {
    id: 5,
    recurso: "Licencia Figma",
    tipo: "Software",
    proveedor: "Figma Inc.",
    "Cant. disp": 10,
    costo: 144,
    "Cant.total": 12,
  },
];

export const reporteProgreso = [
  {
    Proyecto: 1,
    "Tot.reuniones": 3,
    "Tareas a tiempo(%)": 33,
    "Tareas a destiempo(%)": 33,
    "Tareas no entregadas(%)": 33,
    Presupuesto: 45000,
    Gastos: 12000,
    "Fecha creación": "2023-03-01",
    "Fecha final est.": "2023-07-15",
    "Tiempo trans.(sem)": 15,
    Estado: 2,
  },
  {
    Proyecto: 2,
    "Tot.reuniones": 1,
    "Tareas a tiempo(%)": 60,
    "Tareas a destiempo(%)": 20,
    "Tareas no entregadas(%)": 20,
    Presupuesto: 80000,
    Gastos: 9000,
    "Fecha creación": "2023-04-10",
    "Fecha final est.": "2023-08-30",
    "Tiempo trans.(sem)": 9,
    Estado: 1,
  },
];

export const reportePresuxPro = [
  {
    Id: 1,
    "Nombre de recurso": "Laptop Dell Latitude 5530",
    "Costo de recurso (S/.)": 5200,
    "Fecha de adquisición": "2023-03-22",
  },
  {
    Id: 2,
    "Nombre de recurso": "Servidor HP ProLiant",
    "Costo de recurso (S/.)": 9800,
    "Fecha de adquisición": "2023-03-28",
  },
  {
    Id: 3,
    "Nombre de recurso": "Licencia IntelliJ IDEA",
    "Costo de recurso (S/.)": 900,
    "Fecha de adquisición": "2023-04-02",
  },
];

export const cuadro2 = { monto_presupuesto: 45000 };
export const cuadro3 = { sum: 17650 };
export const cuadro4 = { "Porcentaje usado del presupuesto(%)": 39 };
