"use client";
import { Package, Phone, ChevronRight, Shield, Truck, CheckCircle, Zap, Star, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, CATEGORY_CARDS, TESTIMONIALS, type Product } from "@/lib/data";

interface HomePageProps {
  go: (page: string, data?: Product) => void;
  addCart: (p: Product) => void;
}

export function HomePage({ go, addCart }: HomePageProps) {
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 55%, ${C.tealDk} 100%)`,
        color: "#fff", padding: "96px 60px 108px",
        position: "relative", overflow: "hidden",
      }}>
        {/* BG decorations */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(circle at 10% 70%, rgba(13,153,204,0.22) 0%,transparent 50%), radial-gradient(circle at 90% 15%, rgba(39,174,96,0.15) 0%,transparent 45%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: -100, top: -100,
          width: 500, height: 500, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 980, margin: "0 auto", position: "relative" }}>
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(13,153,204,0.18)",
            border: "1px solid rgba(13,153,204,0.4)",
            borderRadius: 20, padding: "6px 18px",
            marginBottom: 28, fontSize: 13, color: "#7DD3FA", fontWeight: 500,
          }}>
            🇩🇴 República Dominicana · Distribución Nacional a las 32 provincias
          </div>

          <h1 className="animate-fade-up" style={{
            fontSize: 54, fontWeight: 800, lineHeight: 1.12,
            marginBottom: 22, maxWidth: 700, letterSpacing: "-0.5px",
          }}>
            Insumos Médicos de{" "}
            <span style={{ color: "#38BDF8" }}>Calidad Premium</span>
            {" "}para su Institución
          </h1>

          <p className="animate-fade-up" style={{
            fontSize: 18, color: "rgba(255,255,255,0.72)",
            lineHeight: 1.72, maxWidth: 540, marginBottom: 44,
          }}>
            Distribuimos y vendemos equipamiento e insumos médicos certificados
            a clínicas, hospitales y farmacias en toda la República Dominicana.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => go("catalog")}
              style={{
                background: C.teal, color: "#fff", border: "none",
                borderRadius: 12, padding: "16px 32px",
                fontSize: 15, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 22px rgba(13,153,204,0.45)",
                display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <Package size={18} /> Ver Catálogo Completo
            </button>
            <button
              onClick={() => go("contact")}
              style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 12, padding: "16px 32px",
                fontSize: 15, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.2s",
              }}
            >
              <Phone size={16} /> Solicitar Cotización
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 52, marginTop: 62, flexWrap: "wrap" }}>
            {[
              ["2,000+", "Productos"],
              ["500+",   "Clientes activos"],
              ["32",     "Provincias cubiertas"],
              ["15 años","De experiencia"],
            ].map(([v, l], i) => (
              <div key={i}>
                <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────────── */}
      <section style={{ padding: "72px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
            Nuestras Categorías
          </h2>
          <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 40 }}>
            Más de 2,000 productos médicos certificados
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {CATEGORY_CARDS.map((cat, i) => (
              <button
                key={i}
                onClick={() => go("catalog")}
                style={{
                  background: C.white, borderRadius: 14,
                  border: `1px solid ${C.border}`,
                  padding: "22px 20px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 16,
                  transition: "all 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  fontFamily: "inherit", textAlign: "left", width: "100%",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = C.teal;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 6px 20px rgba(13,153,204,0.15)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = C.border;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: cat.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0,
                }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.txt }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{cat.count} productos</div>
                </div>
                <ChevronRight size={16} color={C.muted} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────── */}
      <section style={{ padding: "72px 60px", background: C.white }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: C.navy, marginBottom: 6 }}>
                Productos Destacados
              </h2>
              <p style={{ color: C.muted, fontSize: 15 }}>Los más solicitados por nuestros clientes</p>
            </div>
            <button
              onClick={() => go("catalog")}
              style={{
                background: "transparent", border: `2px solid ${C.navy}`,
                color: C.navy, borderRadius: 10, padding: "9px 20px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.18s", fontFamily: "inherit",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = C.navy;
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = C.navy;
              }}
            >
              Ver todo <ArrowRight size={15} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {PRODUCTS.filter(p => p.feat).slice(0, 4).map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onView={prod => go("product", prod)}
                onAdd={addCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section style={{
        padding: "72px 60px",
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navyMd} 100%)`,
        color: "#fff",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            ¿Por qué elegir Hospicalfa Medical?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 36 }}>
            {[
              { I: Shield,      t: "Productos Certificados", d: "Cumplimos estándares internacionales de calidad médica y sanitaria en cada producto." },
              { I: Truck,       t: "Entrega Nacional",       d: "Cubrimos las 32 provincias de República Dominicana con envíos en 24–72 horas." },
              { I: CheckCircle, t: "Garantía Total",         d: "Respaldamos cada producto con garantía completa y servicio técnico post-venta." },
              { I: Zap,         t: "Atención Inmediata",     d: "Equipo dedicado para atender sus pedidos y consultas en tiempo real los 7 días." },
            ].map(({ I, t, d }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: "rgba(13,153,204,0.18)",
                  border: "1px solid rgba(13,153,204,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 18px",
                }}>
                  <I size={28} color="#38BDF8" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section style={{ padding: "72px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 40 }}>
            Lo que dicen nuestros clientes
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: C.white, borderRadius: 18,
                border: `1px solid ${C.border}`,
                padding: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[1,2,3,4,5].map(j => <Star key={j} size={15} fill="#F59E0B" color="#F59E0B" />)}
                </div>
                <p style={{
                  color: C.txt, fontSize: 14, lineHeight: 1.8,
                  marginBottom: 22, fontStyle: "italic",
                }}>
                  &ldquo;{t.t}&rdquo;
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  paddingTop: 18, borderTop: `1px solid ${C.border}`,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: C.navyLt,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 800, color: C.navy,
                  }}>
                    {t.n.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: 14 }}>{t.n}</div>
                    <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{t.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHIPPING BANNER ────────────────────────────────── */}
      <section style={{
        padding: "48px 60px",
        background: C.tealLt,
        borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth: 1080, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 24,
        }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
              🚚 Enviamos a todas las provincias de República Dominicana
            </h3>
            <p style={{ color: C.muted, fontSize: 15 }}>
              Tarifas automáticas · Tracking en tiempo real · Entrega 24–72h · Gratis sobre RD$10,000
            </p>
          </div>
          <button
            onClick={() => go("shipping")}
            style={{
              background: C.navy, color: "#fff", border: "none",
              borderRadius: 12, padding: "14px 28px",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap", flexShrink: 0,
              fontFamily: "inherit",
            }}
          >
            Ver Tarifas →
          </button>
        </div>
      </section>
    </div>
  );
}
