# dbd-seguimiento-proyectos

**Sistema de Seguimiento de Proyectos** — curso Diseño de Bases de Datos, 2023-1 · Grupo 5

> 🧪 **Maqueta académica (2023).** Proyecto del curso *Diseño de Bases de Datos*, conservado como repo de muestra de mi evolución. El código se mantiene tal como se escribió en el curso; solo se agregaron los arreglos mínimos para poder desplegarlo como demo estática de solo visualización.

Aplicación web para el seguimiento de proyectos de una consultora: proyectos, tareas (tablero por estado), reuniones, objetivos/hitos, presupuestos → partidas → gastos, asignación de empleados y recursos, y reportes gerenciales. Incluyó además un comparativo de rendimiento entre PostgreSQL y Cassandra para la monografía del curso.

## Stack (2023)

| Capa | Tecnología |
|---|---|
| Frontend | React 18 (Create React App), MUI 5, React Router 6 |
| Backend | Node.js + Express 4 |
| Bases de datos | PostgreSQL (principal) y Apache Cassandra (módulo de tareas del comparativo) |
| Benchmark | Python (generación de datasets CSV) |

## Estructura

```
frontend/    SPA React. Tiene modo demo con datos mock — desplegable en Vercel
backend/     API Express original (2023): requiere PostgreSQL y Cassandra locales
monografia/  Scripts del benchmark y muestras de datos de la monografía
```

## Demo (solo visualización)

Con `REACT_APP_DEMO=true` (valor por defecto, en `frontend/.env`) la aplicación no necesita backend: un interceptor de `fetch` ([frontend/src/demo/](frontend/src/demo/)) responde los endpoints del API 2023 con datos ficticios. Se muestra un banner de maqueta y los cambios no se guardan.

```bash
cd frontend
pnpm install
pnpm start
```

### Desplegar en Vercel

1. Importar el repositorio en Vercel.
2. **Root Directory: `frontend`** (preset Create React App; build y output quedan automáticos).
3. Deploy. El modo demo ya viene activo por `frontend/.env`.

## Stack completo 2023 (opcional)

Solo si se quiere correr la aplicación contra las bases de datos reales:

1. PostgreSQL: crear la base `DBD2` y ejecutar `backend/database/db.sql` y `backend/database/Insert_Final.sql`.
2. Cassandra local con keyspace `Prueba` (solo para el módulo "tareas Cassandra").
3. Backend: `cd backend && cp .env.example .env && pnpm install && pnpm dev` (puerto 4000).
4. Frontend: `cd frontend && echo "REACT_APP_DEMO=false" > .env.local && pnpm start`.

## Monografía

El benchmark comparó tiempos de carga y consulta con datasets de 3, 6 y 10 columnas × 1k, 100k y 1M de filas. Los CSV de 100k y 1M se retiraron del repo por su peso; se regeneran con los scripts de [monografia/scripts_csv/](monografia/scripts_csv/) ajustando `numero_filas`.

## Nota histórica

El código 2023 se conserva a propósito (sin autenticación, validaciones mínimas, estilos inline, identificadores en español). Los únicos cambios posteriores son: el modo demo con banner, la configuración por variables de entorno en el backend, la reorganización de carpetas del repo, y la actualización de dependencias dentro de los mismos majors (React 18, MUI 5, Express 4) con migración a pnpm.
