import { useState } from "react";

const DISMISS_KEY = "demo-banner-dismissed";

// Cool monochrome flow effect (white/slate/blue), fumadocs-banner style.
const FLOW_COLORS = [
  "rgba(255,255,255,0.20)",
  "rgba(96,165,250,0.30)",
  "rgba(148,163,184,0.22)",
  "rgba(186,230,253,0.28)",
];
const gradientStops = [...FLOW_COLORS, FLOW_COLORS[0]]
  .map((color, i) => `${color} ${(i * 50) / FLOW_COLORS.length}%`)
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
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 3rem",
        textAlign: "center",
        fontSize: "0.8125rem",
        fontWeight: 500,
        letterSpacing: "0.01em",
        color: "#d4d4d8",
        backgroundColor: "#09090b",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="demo-banner-flow"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.8,
          maskImage,
          WebkitMaskImage: maskImage,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          animation: "demo-banner-flow 9s linear infinite",
          backgroundImage: `repeating-linear-gradient(70deg, ${gradientStops})`,
          backgroundSize: "200% 100%",
        }}
      />
      <style>{`
        @keyframes demo-banner-flow { from { background-position: 0% 0; } to { background-position: 100% 0; } }
        @keyframes demo-dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,200,230,0.55); }
          70% { box-shadow: 0 0 0 6px rgba(34,200,230,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,200,230,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .demo-banner-flow, .demo-dot { animation: none !important; }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.625rem",
        }}
      >
        <span
          aria-hidden="true"
          className="demo-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: 9999,
            backgroundColor: "#22c8e6",
            animation: "demo-dot-pulse 2s ease-out infinite",
          }}
        />
        <span>
          <span style={{ fontWeight: 600, color: "#f4f4f5" }}>
            Entorno de demostración
          </span>{" "}
          · datos simulados, solo de referencia. Los cambios no se guardan.
        </span>
      </div>
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
