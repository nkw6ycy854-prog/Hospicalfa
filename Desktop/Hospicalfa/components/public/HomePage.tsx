"use client";
import { Package, Phone, ChevronRight, Shield, Truck, CheckCircle, Zap, ArrowRight, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, CATEGORY_CARDS, type Product } from "@/lib/data";
import { COMPANY } from "@/lib/config";
import {
  TrustStats, BrandsSection, CertificationsSection, FacilitiesSection,
  TeamSection, CoverageSection, CaseStudiesSection, TestimonialsSection,
} from "./CredibilitySections";
import { QuickQuoteSection } from "./QuickQuoteSection";

interface HomePageProps {
  go: (page: string, data?: Product) => void;
  addCart: (p: Product) => void;
  onToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
}

export function HomePage({ go, addCart, onToast }: HomePageProps) {
  return (
    <div>
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 55%, ${C.tealDk} 100%)`,
        color: "#fff", padding: "92px 60px 100px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 10% 70%, rgba(13,153,204,0.22) 0%, transparent 50%), radial-gradient(circle at 90% 15%, rgba(39,174,96,0.15) 0%, transparent 45%)",
        }}/>
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(13,153,204,0.18)", border: "1px solid rgba(13,153,204,0.4)",
            borderRadius: 20, padding: "6px 18px", marginBottom: 26,
            fontSize: 13, color: "#7DD3FA", fontWeight: 500,
          }}>
            🇩🇴 {COMPANY.country} · Distribución Nacional a las {COMPANY.stats.provincesCovered} provincias
          </div>

          <h1 className="animate-fade-up" style={{
            fontSize: 54, fontWeight: 800, lineHeight: 1.12,
            marginBottom: 22, maxWidth: 720, letterSpacing: "-0.5px",
          }}>
            Insumos Médicos de <span style={{ color: "#38BDF8" }}>Calidad Premium</span> para su Institución
          </h1>

          <p className="animate-fade-up" style={{
            fontSize: 18, color: "rgba(255,255,255,0.72)",
            lineHeight: 1.72, maxWidth: 560, marginBottom: 40,
          }}>
            Distribuimos y vendemos equipamiento e insumos médicos certificados a clínicas,
            hospitales y farmacias en toda la República Dominicana desde {COMPANY.foundedYear}.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => go("catalog")} style={{
              background: C.teal, color: "#fff", border: "none", borderRadius: 12,
              padding: "16px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 22px rgba(13,153,204,0.45)",
              display: "flex", alignItems: "center", gap: 8, transition: "transform 0.2s", fontFamily: "inherit",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              <Package size={18}/> Ver Catálogo Completo
            </button>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.28)", borderRadius: 12,
              padding: "16px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, textDecoration: "none",
            }}>
              <MessageCircle size={16}/> Cotizar por WhatsApp
            </a>
          </div>

          <div style={{ display: "flex", gap: 52, marginTop: 60, flexWrap: "wrap" }}>
            {[
              [`${COMPANY.stats.products.toLocaleString()}+`, "Productos"],
              [`${COMPANY.stats.activeClients}+`, "Clientes activos"],
              [`${COMPANY.stats.provincesCovered}`, "Provincias"],
              [`${COMPANY.stats.yearsExperience} años`, "De experiencia"],
            ].map(([v, l], i) => (
              <div key={i}>
                <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST STATS BAR ════════════════════════════════ */}
      <TrustStats/>

      {/* ═══ CATEGORIES ═════════════════════════════════════ */}
      <section style={{ padding: "64px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
            Nuestras Categorías
          </h2>
          <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 40 }}>
            Más de {COMPANY.stats.products.toLocaleString()} productos médicos certificados
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {CATEGORY_CARDS.map((cat, i) => (
              <button key={i} onClick={() => go("catalog")} style={{
                background: C.white, borderRadius: 14, border: `1px solid ${C.border}`,
                padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
                transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                fontFamily: "inherit", textAlign: "left", width: "100%",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor=C.teal; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 6px 20px rgba(13,153,204,0.15)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor=C.border; el.style.transform="translateY(0)"; el.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.txt }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{cat.count} productos</div>
                </div>
                <ChevronRight size={16} color={C.muted}/>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ══════════════════════════════ */}
      <section style={{ padding: "64px 60px", background: C.white }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
            <div>
              <h2 style={{ fontSize: 34, fontWeight: 800, color: C.navy, marginBottom: 6 }}>Productos Destacados</h2>
              <p style={{ color: C.muted, fontSize: 15 }}>Los más solicitados por nuestros clientes</p>
            </div>
            <button onClick={() => go("catalog")} style={{
              background: "transparent", border: `2px solid ${C.navy}`, color: C.navy,
              borderRadius: 10, padding: "9px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.18s", fontFamily: "inherit",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.navy; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.navy; }}
            >
              Ver todo <ArrowRight size={15}/>
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {PRODUCTS.filter(p => p.feat).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} onView={prod => go("product", prod)} onAdd={addCart}/>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═════════════════════════════════════════ */}
      <section style={{ padding: "64px 60px", background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navyMd} 100%)`, color: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, textAlign: "center", marginBottom: 50 }}>
            ¿Por qué elegir {COMPANY.name}?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 36 }}>
            {[
              { I: Shield,      t: "Productos Certificados", d: "Cumplimos estándares internacionales de calidad médica y sanitaria en cada producto." },
              { I: Truck,       t: "Entrega Nacional",       d: `Cubrimos las ${COMPANY.stats.provincesCovered} provincias con envíos en 24–72 horas.` },
              { I: CheckCircle, t: "Garantía Total",         d: "Respaldamos cada producto con garantía completa y servicio post-venta." },
              { I: Zap,         t: "Atención Inmediata",     d: "Equipo dedicado para atender sus pedidos y consultas en tiempo real." },
            ].map(({ I, t, d }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(13,153,204,0.18)", border: "1px solid rgba(13,153,204,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <I size={28} color="#38BDF8"/>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t}</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANDS ═════════════════════════════════════════ */}
      <BrandsSection/>

      {/* ═══ CERTIFICATIONS ═════════════════════════════════ */}
      <CertificationsSection/>

      {/* ═══ FACILITIES ═════════════════════════════════════ */}
      <FacilitiesSection/>

      {/* ═══ QUICK QUOTE CTA ════════════════════════════════ */}
      <QuickQuoteSection onToast={onToast}/>

      {/* ═══ COVERAGE ═══════════════════════════════════════ */}
      <CoverageSection/>

      {/* ═══ CASE STUDIES ═══════════════════════════════════ */}
      <CaseStudiesSection/>

      {/* ═══ TEAM ═══════════════════════════════════════════ */}
      <TeamSection/>

      {/* ═══ TESTIMONIALS ═══════════════════════════════════ */}
      <TestimonialsSection/>

      {/* ═══ FINAL CTA BANNER ═══════════════════════════════ */}
      <section style={{ padding: "56px 60px", background: C.tealLt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
              ¿Listo para abastecer su institución?
            </h3>
            <p style={{ color: C.muted, fontSize: 15 }}>
              Contáctenos hoy y reciba una cotización personalizada sin compromiso.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => go("contact")} style={{
              background: C.navy, color: "#fff", border: "none", borderRadius: 12,
              padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer",
              whiteSpace: "nowrap", fontFamily: "inherit",
            }}>
              Solicitar Cotización
            </button>
            <a href={`tel:${COMPANY.phoneRaw}`} style={{
              background: C.white, color: C.navy, border: `1px solid ${C.border}`, borderRadius: 12,
              padding: "14px 28px", fontSize: 14, fontWeight: 700, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
            }}>
              <Phone size={15}/> Llamar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
