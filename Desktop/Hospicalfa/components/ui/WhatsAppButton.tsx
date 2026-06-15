"use client";
import { useState, useEffect } from "react";

const WA_NUMBER = "18095550001";
const WA_MSG    = encodeURIComponent("Hola, me interesa recibir información sobre sus productos y precios. ¿Me pueden ayudar?");
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

export function WhatsAppButton() {
  const [visible, setVisible]   = useState(false);
  const [tooltip, setTooltip]   = useState(true);
  const [pulse, setPulse]        = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    const t2 = setTimeout(() => setTooltip(false), 6000);
    const t3 = setInterval(() => setPulse(p => !p), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearInterval(t3); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9998,
      display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10,
    }}>
      {/* Tooltip */}
      {tooltip && (
        <div style={{
          background: "#fff", borderRadius: 12, padding: "10px 16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)", fontSize: 13, fontWeight: 600,
          color: "#1A202C", whiteSpace: "nowrap", position: "relative",
          animation: "fadeIn 0.3s ease",
        }}>
          ¿Necesita ayuda? Chateemos
          <button
            onClick={() => setTooltip(false)}
            aria-label="Cerrar"
            style={{
              marginLeft: 8, background: "none", border: "none",
              cursor: "pointer", color: "#94A3B8", fontSize: 16, lineHeight: 1,
            }}
          >×</button>
          {/* Arrow */}
          <div style={{
            position: "absolute", bottom: -6, right: 22,
            width: 12, height: 12, background: "#fff",
            transform: "rotate(45deg)",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.06)",
          }}/>
        </div>
      )}

      {/* Button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          width: 60, height: 60, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(37,211,102,0.55)",
          transition: "transform 0.2s, box-shadow 0.2s",
          textDecoration: "none", position: "relative",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "scale(1.12)";
          el.style.boxShadow = "0 8px 32px rgba(37,211,102,0.7)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.transform = "scale(1)";
          el.style.boxShadow = "0 6px 24px rgba(37,211,102,0.55)";
        }}
      >
        {/* Pulse ring */}
        <div style={{
          position: "absolute", inset: -4,
          borderRadius: "50%",
          border: "3px solid rgba(37,211,102,0.45)",
          animation: "pulse-ring 2s ease-in-out infinite",
        }}/>
        {/* WhatsApp SVG icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M16 2C8.268 2 2 8.268 2 16c0 2.492.65 4.83 1.79 6.856L2 30l7.338-1.76A13.935 13.935 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.46 11.46 0 01-5.84-1.596l-.42-.25-4.355 1.044 1.072-4.248-.273-.437A11.461 11.461 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5z"
            fill="#fff"/>
          <path d="M22.003 18.77c-.315-.158-1.862-.919-2.151-1.024-.29-.104-.5-.157-.71.158-.21.315-.815 1.024-1 1.234-.183.21-.367.237-.682.079-.315-.158-1.33-.49-2.534-1.563-.937-.835-1.57-1.866-1.754-2.181-.184-.315-.02-.484.138-.64.142-.14.315-.367.473-.55.157-.184.21-.315.315-.526.105-.21.052-.394-.026-.552-.079-.158-.71-1.71-.972-2.34-.256-.614-.516-.53-.71-.54l-.604-.01c-.21 0-.55.079-.838.394-.289.316-1.103 1.078-1.103 2.628 0 1.55 1.13 3.047 1.287 3.257.157.21 2.224 3.394 5.388 4.76.753.325 1.34.52 1.797.665.755.24 1.443.206 1.987.125.606-.09 1.866-.762 2.13-1.498.263-.736.263-1.366.184-1.498-.079-.132-.289-.21-.604-.368z" fill="#fff"/>
        </svg>
      </a>
    </div>
  );
}
