"use client";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";
import { COMPANY } from "@/lib/config";

interface FooterProps {
  onNav: (p: string) => void;
}

export function Footer({ onNav }: FooterProps) {
  const COLS: { t: string; links: { label: string; page?: string }[] }[] = [
    { t: "Productos", links: [
      { label: "Catálogo completo", page: "catalog" },
      { label: "Protección", page: "catalog" },
      { label: "Diagnóstico", page: "catalog" },
      { label: "Curación", page: "catalog" },
      { label: "Equipamiento", page: "catalog" },
    ]},
    { t: "Empresa", links: [
      { label: "Sobre Nosotros", page: "about" },
      { label: "Blog", page: "blog" },
      { label: "Contacto", page: "contact" },
      { label: "Envíos", page: "shipping" },
    ]},
    { t: "Soporte", links: [
      { label: "Solicitar cotización", page: "contact" },
      { label: "Seguimiento de pedido" },
      { label: "Preguntas frecuentes" },
      { label: "Política de privacidad" },
    ]},
  ];

  return (
    <footer style={{ background: C.navyDk, color: "#fff", padding: "56px 60px 32px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1fr", gap: 44, marginBottom: 44 }}>
          {/* Brand */}
          <div>
            <Logo white/>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.75, marginTop: 18, maxWidth: 300 }}>
              Distribuidores y vendedores de insumos y equipamiento médico certificado.
              Cubriendo toda la República Dominicana desde {COMPANY.foundedYear}.
            </p>
            <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`tel:${COMPANY.phoneRaw}`} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                <Phone size={14} color="#38BDF8" style={{ flexShrink: 0 }}/> {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                <Mail size={14} color="#38BDF8" style={{ flexShrink: 0 }}/> {COMPANY.email}
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <MapPin size={14} color="#38BDF8" style={{ flexShrink: 0 }}/> {COMPANY.city}, {COMPANY.country}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                <Clock size={14} color="#38BDF8" style={{ flexShrink: 0 }}/> Lun–Vie 8am–6pm
              </div>
            </div>
            {/* Social */}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { icon: "📘", url: COMPANY.social.facebook },
                { icon: "📸", url: COMPANY.social.instagram },
                { icon: "💼", url: COMPANY.social.linkedin },
                { icon: "🐦", url: COMPANY.social.twitter },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" aria-label="Red social" style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: 16, textDecoration: "none", transition: "background 0.15s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,153,204,0.3)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                {col.t}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map((link, j) => (
                  <span key={j} onClick={() => link.page && onNav(link.page)} style={{
                    fontSize: 14, color: "rgba(255,255,255,0.55)",
                    cursor: link.page ? "pointer" : "default", transition: "color 0.15s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.55)"; }}
                  >{link.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "rgba(255,255,255,0.38)", flexWrap: "wrap", gap: 10,
        }}>
          <span>© {new Date().getFullYear()} {COMPANY.legalName} · Todos los derechos reservados · RNC {COMPANY.rnc}</span>
          <div style={{ display: "flex", gap: 18 }}>
            {["Privacidad", "Términos", "Cookies"].map((l, i) => (
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
