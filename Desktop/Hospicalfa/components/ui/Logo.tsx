"use client";
import { COLORS as C } from "@/lib/data";

interface LogoProps {
  white?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ white = false, size = "md" }: LogoProps) {
  const iconSize = size === "lg" ? 52 : size === "sm" ? 34 : 42;
  const fontSize = size === "lg" ? 18 : size === "sm" ? 13 : 15;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div style={{
        width: iconSize, height: iconSize, borderRadius: 10,
        background: white ? "rgba(255,255,255,0.15)" : C.navyLt,
        border: white ? "1px solid rgba(255,255,255,0.28)" : `1px solid ${C.navyLt}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: iconSize * 0.52, flexShrink: 0,
      }}>+</div>
      <div>
        <div style={{
          fontSize, fontWeight: 800, letterSpacing: "0.4px",
          color: white ? "#fff" : C.navy, lineHeight: 1.1,
          fontFamily: "var(--font-outfit), system-ui, sans-serif",
        }}>
          HOSPICALFA{" "}
          <span style={{ color: white ? "#38BDF8" : C.teal }}>MEDICAL</span>
        </div>
        <div style={{
          fontSize: 9, fontWeight: 500,
          color: white ? "rgba(255,255,255,0.5)" : C.muted,
          letterSpacing: "0.3px", textTransform: "uppercase", marginTop: 2,
        }}>
          Insumos y Equipamiento Médico
        </div>
      </div>
    </div>
  );
}
