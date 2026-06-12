// Demo-mode fetch interceptor. The 2023 components fetch
// http://localhost:4000 directly; instead of touching all of them, this
// module hijacks window.fetch and answers those calls with static fixtures.
import * as data from "./demoData";

const json = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

const byId = (rows, key, id) =>
  rows.find((row) => row[key] === Number(id)) ?? rows[0];

const tareasColumna = () => ({
  tareasPendientes: data.tareas.filter((t) => t.estado_tarea === 1),
  tareasEnProgreso: data.tareas.filter((t) => t.estado_tarea === 2),
  tareasFinalizadas: data.tareas.filter((t) => t.estado_tarea === 3),
});

const detalleProyecto = (id) => ({
  ...data.detallesProyecto,
  detallesProyecto: [
    {
      ...data.detallesProyecto.detallesProyecto[0],
      ...byId(data.proyectos, "proyecto_id", id),
    },
  ],
});

const detalleTarea = (id) => {
  const tarea = byId(data.tareas, "tarea_id", id);
  return {
    detallesTarea: [tarea],
    encargados: data.encargadosPorTarea.filter(
      (e) => e.tarea_id === tarea.tarea_id
    ),
    adjuntos: [{ nombre_adjunto: "especificacion.pdf", adjunto_link: "#" }],
  };
};

const detalleTareaCas = (id) => {
  const t = byId(data.tareas, "tarea_id", id);
  return {
    detallesTarea: [
      {
        ...t,
        fecha_creacion_tarea: t.fecha_creacion.slice(0, 10),
        hora_creacion_tarea: t.fecha_creacion.slice(13),
        fecha_limite_tarea: t.fecha_entrega.slice(0, 10),
        hora_limite_tarea: t.fecha_entrega.slice(13),
      },
    ],
    encargados: data.encargadosPorTarea.filter((e) => e.tarea_id === t.tarea_id),
    adjuntos: [],
  };
};

// Pattern segments starting with ":" capture the value at that position.
const routes = [
  ["mostrar-lista-proyectos", () => data.proyectos],
  ["mostrar-proyecto/:id", (p) => [byId(data.proyectos, "proyecto_id", p.id)]],
  ["mostrar-detalles-proyecto/:id", (p) => detalleProyecto(p.id)],
  ["mostrar-lista-reunion/:id", () => data.reuniones],
  ["mostrar-tarea-columna/:id", tareasColumna],
  ["mostrar-tarea-columnaCas", tareasColumna],
  ["mostrar-detalles-tarea/:id", (p) => detalleTarea(p.id)],
  ["mostrar-detalles-tareaCas/:id", (p) => detalleTareaCas(p.id)],
  ["empleados/:id", () => data.empleadosProyecto],
  ["mostrar-asignaciones-empleados/:id", () => data.asignacionesEmpleados],
  ["mostrar-empleados-disponibles", () => data.empleadosDisponibles],
  ["mostrar-asignaciones-recursos/:id", () => data.asignacionesRecursos],
  ["mostrar-recursos-disponibles", () => data.recursosDisponibles],
  ["presupuestos", () => data.presupuestos],
  ["partidas", () => data.partidas],
  ["gastos", () => data.gastos],
  ["proyectos", () => data.proyectos],
  ["objetivos/:id", () => data.reporteObjetivos],
  ["empxpro/:id", () => data.reporteEmpxPro],
  ["planivsrepo/:fecha1/:fecha2", () => data.reportePlanivsRepo],
  ["tareas/:id", () => data.reporteTareas],
  ["recursos/:id", () => data.reporteRecursos],
  ["sobrantes/:id", () => data.reporteSobrantes],
  ["progreso/:fecha", () => data.reporteProgreso],
  ["presuxproyecto/:id", () => data.reportePresuxPro],
  ["cuadro2/:id", () => data.cuadro2],
  ["cuadro3/:id", () => data.cuadro3],
  ["cuadro4/:id", () => data.cuadro4],
];

export function resolveRoute(method, path) {
  if (method !== "GET") {
    return { message: "Modo demo: los cambios no se guardan." };
  }
  const segments = path.split("/").filter(Boolean);
  for (const [pattern, handler] of routes) {
    const parts = pattern.split("/");
    if (parts.length !== segments.length) continue;
    const params = {};
    const matches = parts.every((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = decodeURIComponent(segments[i]);
        return true;
      }
      return part === segments[i];
    });
    if (matches) return handler(params);
  }
  console.warn(`[demo] Endpoint sin fixture: ${method} ${path}`);
  return {};
}

export function installMockApi() {
  const realFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;
    if (!url.includes("localhost:4000")) return realFetch(input, init);
    const method = (init.method || "GET").toUpperCase();
    const path = new URL(url).pathname;
    const body = resolveRoute(method, path);
    if (method === "PUT" && typeof init.body === "string") {
      // /tarea/:id echoes the new state back, like the real API
      try {
        body.estado_tarea = JSON.parse(init.body).estado_tarea;
      } catch {
        // non-JSON body: nothing to echo
      }
    }
    return Promise.resolve(json(body));
  };
}
