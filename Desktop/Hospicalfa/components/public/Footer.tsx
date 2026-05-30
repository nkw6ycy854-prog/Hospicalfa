"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

const COLS = [
  { t: "Productos",  l: ["Protección","Diagnóstico","Curación","Inyectables","Equipamiento"] },
  { t: "Empresa",   l: ["Sobre Nosotros","Contacto","Blog","Trabaja con Nosotros"]           },
  { t: "Soporte",   l: ["FAQ","Seguimiento de Pedido","Devoluciones","Política de Privacidad","Términos"] },
];

export function Footer({ onNav }: { onNav: (p: string) => void }) {
  return (
    <footer style={{ background: C.navyDk, color: "#fff", padding: "56px 60px 32px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr", gap: 44, marginBottom: 44 }}>

          {/* Brand column */}
          <div>
            <Logo white />
            <p style={{
              color: "rgba(255,255,255,0.55)", fontSize: 14,
              lineHeight: 1.75, marginTop: 18, maxWidth: 290,
            }}>
              Distribuidores y vendedores de insumos y equipamiento médico certificado.
              Cubriendo toda la República Dominicana con más de 2,000 productos.
            </p>

            {/* Contact info */}
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { I: Phone,  v: "+1 (809) 555-0001"       },
                { I: Mail,   v: "ventas@hospicalfa.do"     },
                { I: MapPin, v: "Santiago de los Cab., RD" },
              ].map(({ I, v }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  <I size={14} color="#38BDF8" style={{ flexShrink: 0 }} />
                  {v}
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {["📘","📸","💬","🐦"].map((s, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", fontSize: 16,
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(13,153,204,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.1)"; }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map((col, i) => (
            <div key={i}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: "#fff",
                marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.8px",
              }}>
                {col.t}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.l.map((link, j) => (
                  <span
                    key={j}
                    onClick={() => {}}
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", cursor: "pointer", transition: "color 0.15s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "rgba(255,255,255,0.38)",
          flexWrap: "wrap", gap: 10,
        }}>
          <span>© 2026 Hospicalfa Medical · Todos los derechos reservados · RNC 1-23-45678-9</span>
          <div style={{ display: "flex", gap: 18 }}>
            {["Privacidad","Términos","Cookies"].map((l, i) => (
              <span key={i} style={{ cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.38)"; }}
              >{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
