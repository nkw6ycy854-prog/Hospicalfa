"use client";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

const COLS = [
  { t:"Productos", l:["Protección","Diagnóstico","Curación","Inyectables","Equipamiento"] },
  { t:"Empresa",   l:["Sobre Nosotros","Contacto","Blog","Trabaja con Nosotros"]          },
  { t:"Soporte",   l:["FAQ","Seguimiento","Devoluciones","Privacidad","Términos"]          },
];

export function Footer({ onNav }: { onNav: (p: string) => void }) {
  return (
    <footer style={{ background:C.navyDk, color:"#fff", padding:"52px 60px 32px" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <Logo white />
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:14, lineHeight:1.7, marginTop:16, maxWidth:280 }}>
              Distribuidores y vendedores de insumos y equipamiento médico certificado.
              Cubriendo toda la República Dominicana con más de 2,000 productos.
            </p>
            <div style={{ display:"flex", gap:12, marginTop:18 }}>
              {["📘","📸","💬"].map((s,i) => (
                <div key={i} style={{
                  width:36, height:36, borderRadius:8,
                  background:"rgba(255,255,255,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", fontSize:16,
                }}>{s}</div>
              ))}
            </div>
          </div>

          {COLS.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize:12, fontWeight:700, color:"#fff", marginBottom:16, textTransform:"uppercase", letterSpacing:"0.7px" }}>
                {col.t}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {col.l.map((link, j) => (
                  <span
                    key={j}
                    onClick={() => {}}
                    style={{ fontSize:14, color:"rgba(255,255,255,0.55)", cursor:"pointer", transition:"color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:22,
          display:"flex", justifyContent:"space-between",
          fontSize:12, color:"rgba(255,255,255,0.4)",
          flexWrap:"wrap", gap:10,
        }}>
          <span>© 2026 Hospicalfa Medical · Todos los derechos reservados.</span>
          <span>📍 Santiago de los Caballeros, República Dominicana</span>
        </div>
      </div>
    </footer>
  );
}
