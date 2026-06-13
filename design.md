# Sistema de diseño — Hito

> **Norte:** una *consola operativa serena*. Hito es una herramienta interna de gestión
> de proyectos para una consultora (Tech Innovation): mucha tabla, mucho estado, mucho número.
> El objetivo de diseño 2026 no es "decorar", es hacer que **datos densos se lean sin esfuerzo
> y la app se sienta cara** — el rango de Linear, Vercel Dashboard, Stripe y Height.
>
> **Codename:** *Atlas*. **Audiencia:** gerentes de proyecto y analistas. **Plataforma:** desktop-first, responsive.
> **Stack real:** React 18 (CRA) + MUI 5 + React Router 6 → todo lo de aquí se realiza vía `theme.js`
> y un puñado de overrides, **no** reescribiendo pantallas.

---

## 1. Principios

1. **El dato es el héroe.** El cromo (bordes, sombras, fondos) se calla para que la información hable. Tinte + hairline antes que sombras pesadas.
2. **Densidad con aire.** Tablas y tableros son densos a propósito, pero con un ritmo de 8 px que evita el agobio. Nada apretado, nada disperso.
3. **Una sola acción primaria por vista.** El azul de marca se reserva para *la* acción que importa; todo lo demás es neutro o fantasma.
4. **El color significa, no adorna.** Cada color de estado (éxito, riesgo, atención) tiene un único trabajo. Nunca color sin un segundo canal (icono/punto/texto).
5. **Movimiento que confirma, no que entretiene.** Micro-interacciones de 120–240 ms que dan feedback; respetan `prefers-reduced-motion`.
6. **Calma confiada.** Sin gradientes por todas partes, sin esquinas burbuja, sin sombras flotantes. La sofisticación viene de la consistencia, no del efecto.

---

## 2. Tendencias 2026 que adoptamos (y por qué encajan aquí)

| Tendencia | Cómo la usamos en Hito |
|---|---|
| **Superficies en capas + profundidad suave** | Elevación por tinte y hairline de 1 px; sombras de baja difusión solo en menús/diálogos. |
| **Tipografía variable y numerales tabulares** | Inter Variable + cifras tabulares con cero rebanado para columnas de dinero/fechas alineadas. |
| **Bento dashboards** | Un *home* tipo bento con KPIs, sparklines y un anillo de ejecución presupuestal. |
| **Command palette (⌘K)** | Saltar a proyecto/reporte sin navegar. Señal inmediata de "app seria". |
| **Color perceptual (OKLCH) + dark mode de primera clase** | Rampas uniformes; tema oscuro como meta, no como parche. |
| **Data-viz sobria** | Paleta categórica balanceada para presupuestos, progreso y kanban. |
| **View Transitions API** | Transiciones de ruta como mejora progresiva. |

---

## 3. Tokens de color

Fuente de verdad en HEX (implementable directo en MUI); OKLCH como referencia perceptual.

### 3.1 Neutros (slate frío) — el lienzo

| Token | HEX | Uso |
|---|---|---|
| `canvas` | `#f6f8fb` | Fondo de la app |
| `surface` | `#ffffff` | Paper, cards, tablas |
| `surface-subtle` | `#eef2f8` | Filas alternas suaves, hover de fondo, chips neutros |
| `border-hairline` | `#e4e9f2` | Borde por defecto de Paper/celdas |
| `border-strong` | `#d3dae6` | Separadores marcados, inputs |
| `ink` | `#11182a` | Texto primario (slate profundo) |
| `ink-secondary` | `#5a6478` | Texto secundario, labels |
| `ink-muted` | `#8a93a6` | Placeholder, metadatos, deshabilitado |

### 3.2 Marca — azul Tech Innovation (acción)

Rampa derivada del logo (letras navy + rampa cian de la "T").

| Paso | HEX | | Paso | HEX |
|---|---|---|---|---|
| `brand/50` | `#eef7fc` | | `brand/500` | `#2389c0` |
| `brand/100` | `#d6ecf8` | | `brand/600` | `#1f7fb5` ← **primary** |
| `brand/200` | `#aedaf1` | | `brand/700` | `#185f8a` |
| `brand/300` | `#7cc3e6` | | `brand/800` | `#154d6f` |
| `brand/400` | `#46a6d6` | | `brand/900` | `#133f5b` |

**Accent cian** (foco activo, highlights puntuales, glow del sidebar): `#22c8e6`.

### 3.3 Semánticos (estado)

Cada uno con par texto/fondo para chips y alertas.

| Rol | Sólido | Fondo tenue | Uso |
|---|---|---|---|
| `success` | `#0f9d6e` | `#e6f7f0` | Finalizado, dentro de presupuesto |
| `info` | `#1f7fb5` | `#e7f1f9` | En curso, informativo |
| `warning` | `#d98a04` | `#fdf3e2` | Cerca del límite, por vencer |
| `danger` | `#e0445b` | `#fdecef` | Sobre-ejecutado, vencido |
| `neutral` | `#5a6478` | `#eef2f8` | Planificado, sin estado |

### 3.4 Data-viz (categórico, perceptualmente balanceado)

Para presupuestos→partidas→gastos, planificado vs reportado, kanban y reportes:

`#1f7fb5` azure · `#22c8e6` cian · `#7b6ef0` violeta · `#0f9d6e` esmeralda · `#d98a04` ámbar · `#e0445b` rosa · `#13a3a3` teal

> Regla: máximo 6 series visibles; más que eso, agrupar en "Otros".

### 3.5 Dark mode (meta P3)

| Token | HEX |
|---|---|
| `canvas` | `#0c1020` |
| `surface` | `#141a2c` |
| `surface-subtle` | `#1b2236` |
| `border` | `#27304a` |
| `ink` | `#e7ebf3` |
| `ink-secondary` | `#9aa3b8` |

Marca y semánticos: subir ~1 paso de luminosidad (`brand/400–500`, accent `#3ad6f0`).

---

## 4. Tipografía

**Cambio estrella (bajo costo, alto impacto):** migrar de Roboto a **Inter Variable**
(`@fontsource-variable/inter`). Numerales **tabulares** con cero rebanado en toda celda de datos.
Para IDs/códigos/⌘K: **JetBrains Mono**.

```
font-family: "Inter", system-ui, "Segoe UI", Roboto, sans-serif;
font-feature-settings: "tnum" 1, "zero" 1, "cv05" 1;  /* tabular + 0 rebanado en datos */
```

### Escala (base 16 px)

| Rol | Tamaño | Peso | Tracking | Uso |
|---|---|---|---|---|
| `display` | 32 / 2rem | 700 | −0.02em | Cifras hero del bento |
| `page-title` | 24 / 1.5rem | 700 | −0.01em | Título de página (h4 MUI) |
| `section` | 20 / 1.25rem | 650 | −0.005em | Encabezado de tarjeta/sección |
| `subtitle` | 17 / 1.06rem | 600 | 0 | Subtítulos, headers de grupo |
| `body` | 15 / 0.94rem | 400 | 0 | Texto base (denso) |
| `body-strong` | 15 | 600 | 0 | Énfasis en celdas |
| `caption` | 13 / 0.81rem | 400 | 0 | Metadatos, ayudas |
| `overline` | 11 / 0.69rem | 600 | 0.08em · UPPER | Etiquetas de columna/sección |

> Regla anti-2023: el `UPPERCASE` solo vive en `overline`. Títulos en *Title case*.

---

## 5. Espaciado, radio, elevación, motion

### Espaciado — rejilla de 8 (con medio paso de 4)

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`. Padding de card: 20–24. Gap de bento: 16–20. Densidad de fila de tabla: 12 vertical.

### Radio

| Token | px | Uso |
|---|---|---|
| `xs` | 6 | Chips, inputs pequeños |
| `sm` | 8 | Botones, inputs |
| `md` | 12 | Cards, Paper (sube desde el 10 actual) |
| `lg` | 16 | Paneles, diálogos, bento tiles |
| `full` | 999 | Pills de estado, avatares |

### Elevación — suave y en capas (la profundidad nace del tinte, no de la sombra)

```
e0  none                                              /* superficie plana + hairline */
e1  0 1px 2px rgba(16,24,42,.05)                      /* card en reposo */
e2  0 4px 12px -2px rgba(16,24,42,.08),
    0 2px 6px -2px rgba(16,24,42,.06)                 /* hover de card, menús */
e3  0 16px 40px -8px rgba(16,24,42,.16)               /* diálogos, command palette */
focus  0 0 0 3px rgba(31,127,181,.35)                 /* anillo de foco accesible */
```

### Motion

| Token | Valor |
|---|---|
| `dur/tap` | 120 ms |
| `dur/enter` | 180 ms |
| `dur/panel` | 240 ms |
| `dur/page` | 320 ms (View Transition) |
| `ease/standard` | `cubic-bezier(.2,.8,.2,1)` |
| `ease/emphasized` | `cubic-bezier(.16,1,.3,1)` |

Drag del kanban con física de resorte. **Siempre** bajo `@media (prefers-reduced-motion: reduce)` → sin transform, solo opacidad.

---

## 6. Componentes clave

- **Botones.** Primary = `brand/600` sólido, sin elevación, radio `sm`, peso 600, sin uppercase (ya en el tema). Secondary = contorno `border-strong`. Tertiary = fantasma (texto `brand/700`, hover `surface-subtle`). Una sola primary por vista.
- **Tabla de datos** (núcleo de la app). Header sticky `#2b3245` blanco (ya existe) → mantener. Filas con hairline, **sin** zebra agresivo; hover `surface-subtle`. Números a la derecha, tabulares. Acciones por fila reveladas en hover. Toggle de densidad (cómoda/compacta).
- **Chip de estado.** Punto de color + label, fondo tenue del semántico, radio `full`. Nunca solo color.
- **Card / Paper.** `surface`, hairline `border-hairline`, radio `md`, sombra `e1`; `e2` en hover si es clickeable.
- **Sidebar.** Mantener navy `#232a3b`. Ítem activo = pill con fondo `rgba(34,200,230,.16)` + barra/`glow` cian a la izquierda. Agrupar por sección cuando crezca el menú. Logo en card blanca (ya está).
- **Inputs.** Radio `sm`, borde `border-strong`, foco = anillo `focus` + borde `brand/500`. Label flotante MUI estándar.
- **Diálogos.** Radio `lg`, sombra `e3`, overlay `rgba(11,16,32,.45)`, entrada `dur/panel`/`ease/emphasized`.
- **Empty states.** Icono fino + una línea de copy útil + CTA. Nunca una tabla vacía a secas.

---

## 7. Pantallas — aplicación concreta

| Pantalla actual | Movida 2026 |
|---|---|
| `VerListaProyectos` (tabla) | Header de página + filtros en chips; tabla refinada con chip de estado (punto+label), cliente con avatar/inicial, fechas tabulares, progreso inline. |
| **Nuevo: Home/Resumen** | **Bento**: KPIs (cartera activa, % presupuesto ejecutado con anillo, tareas por estado, próximas reuniones) + sparklines. Es el "wow" para presumir. |
| `tareas` / kanban | Columnas con badge de conteo, cards con borde izquierdo por prioridad, drag con resorte, scroll horizontal suave. |
| `vistaPresupuesto → partida → gasto` | Barras apiladas planificado vs ejecutado con la paleta data-viz; chip de riesgo cuando se excede. |
| `planivsRepo` / reportes | Tarjetas de gráfico con título `section`, leyenda con puntos, números tabulares. |
| Navbar superior (`NavBar.js`) | Search global + ⌘K, campana/calendario como `IconButton` consistentes, menú de usuario con avatar e inicial. |

### Momentos "presumibles" (orden de impacto)
1. **Home bento con anillo de ejecución presupuestal.**
2. **Command palette ⌘K.**
3. **Kanban con drag de resorte y prioridad por color.**
4. **Tabla con densidad conmutar + chips de estado pulidos.**

---

## 8. Accesibilidad (WCAG 2.2 AA, no negociable)

- Contraste ≥ 4.5:1 texto, ≥ 3:1 UI/iconos. (`ink` sobre `surface` ≈ 15:1; `brand/600` sobre blanco ≈ 4.6:1.)
- `:focus-visible` con anillo `focus` en todo control. Nunca quitar outline sin reemplazo.
- Estado siempre con **punto/icono + texto**, jamás solo color.
- Touch targets ≥ 44 px. `prefers-reduced-motion` respetado.
- Tablas con `<caption>`/`scope`; orden de tabulación lógico; ⌘K operable por teclado.

---

## 9. Anti-patrones a eliminar (deudas 2023)

- ❌ Estilos inline y `Menu.js` con `#1E1E1E`/`Trebuchet MS` → usar tokens del tema.
- ❌ `UPPERCASE` y `box-shadow: inset` por todos lados → reservar uppercase a `overline`, sombras a `e1–e3`.
- ❌ Texto de usuario quemado ("Luigui Layme") y colores sueltos (`#D9D9D9`) → tokens + datos del demo.
- ❌ Sombras duras / bordes inconsistentes → hairline + elevación de la escala.

---

## 10. Realización en MUI (centralizada, sin reescribir pantallas)

Todo vive en `theme.js` + un `tokens.js`. Orden de adopción:

- **P0 — Tokens.** Volcar §3–5 a `palette`, `typography`, `shape.borderRadius: 12`, `shadows` y `components` overrides (`MuiButton`, `MuiPaper`, `MuiChip`, `MuiTableCell`, `MuiTableRow`). Añadir `@fontsource-variable/inter`. *Sin tocar componentes de pantalla — heredan del tema.*
- **P1 — Shell + tablas.** Pill activo del sidebar, chip de estado reutilizable, toggle de densidad.
- **P2 — Home bento + ⌘K.** Una ruta nueva `/` con el bento; command palette con `Dialog` + lista filtrable.
- **P3 — Dark mode + View Transitions.** `colorSchemes` de MUI y transición de ruta.

```js
// theme.js (extracto del objetivo)
palette: {
  primary:   { main: "#1f7fb5", light: "#46a6d6", dark: "#185f8a" },
  secondary: { main: "#22c8e6" },
  success:   { main: "#0f9d6e" },
  warning:   { main: "#d98a04" },
  error:     { main: "#e0445b" },
  background:{ default: "#f6f8fb", paper: "#ffffff" },
  text:      { primary: "#11182a", secondary: "#5a6478" },
  divider:   "#e4e9f2",
},
shape: { borderRadius: 12 },
typography: { fontFamily: '"Inter", system-ui, sans-serif' },
```

> **Filosofía de cambio:** este es un repo-maqueta preservado. La dirección se logra
> tocando **tokens y overrides**, no las 40 pantallas. Si un cambio exige editar muchos
> archivos, probablemente debería ser un token.

---

### Referencias 2026
Linear (densidad serena) · Vercel Dashboard (neutros + un acento) · Stripe (data-viz sobria) · Height (kanban) · Tremor / shadcn-charts (KPIs bento).
