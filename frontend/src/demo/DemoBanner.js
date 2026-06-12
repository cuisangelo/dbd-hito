import { useState } from "react";

const DISMISS_KEY = "demo-banner-dismissed";

// Light-refraction flow effect, ported from the fumadocs rainbow banner.
const RAINBOW = [
  "rgba(0,149,255,0.56)",
  "rgba(231,77,255,0.77)",
  "rgba(255,0,0,0.73)",
  "rgba(131,255,166,0.66)",
];
const gradientStops = [...RAINBOW, RAINBOW[0]]
  .map((color, i) => `${color} ${(i * 50) / RAINBOW.length}%`)
  .join(", ");
const maskImage =
  "linear-gradient(to bottom, white, transparent), radial-gradient(circle at top center, white, transparent)";

export default function DemoBanner() {
  const [open, setOpen] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) !== "true"
  );

  if (process.env.REACT_APP_DEMO !== "true" || !open) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        height: "2.75rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3rem",
        textAlign: "center",
        fontSize: "0.8125rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: "#f4f4f5",
        backgroundColor: "#09090b",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          maskImage,
          WebkitMaskImage: maskImage,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          animation: "demo-banner-flow 20s linear infinite",
          backgroundImage: `repeating-linear-gradient(70deg, ${gradientStops})`,
          backgroundSize: "200% 100%",
          filter: "saturate(1.8)",
        }}
      />
      <style>{`@keyframes demo-banner-flow { from { background-position: 0% 0; } to { background-position: 100% 0; } }`}</style>
      <span style={{ position: "relative" }}>
        🧪 Hito · maqueta académica (Diseño de Bases de Datos, 2023) — demo con
        datos ficticios: los cambios no se guardan.
      </span>
      <button
        type="button"
        aria-label="Cerrar aviso"
        onClick={dismiss}
        style={{
          position: "absolute",
          right: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#71717a",
          padding: 4,
          lineHeight: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}
