"use client";
import { useState } from "react";
import {
  Building2, Users, Warehouse, Award, MapPin, TrendingUp,
  CheckCircle, Quote, Star, ArrowRight, Shield,
} from "lucide-react";
import { COLORS as C } from "@/lib/data";
import {
  COMPANY, CERTIFICATIONS, BRANDS, TEAM,
  CASE_STUDIES, TESTIMONIALS_EXT, COVERAGE_REGIONS,
} from "@/lib/config";

// ═══════════════════════════════════════════════════════════════════════════
//  TRUST STATS BAR
// ═══════════════════════════════════════════════════════════════════════════
export function TrustStats() {
  const stats = [
    { v:`${COMPANY.stats.yearsExperience}+`,        l:"Años de experiencia",  icon:"📅" },
    { v:`${COMPANY.stats.products.toLocaleString()}+`,  l:"Productos disponibles", icon:"📦" },
    { v:`${COMPANY.stats.activeClients}+`,          l:"Clientes activos",     icon:"🤝" },
    { v:`${COMPANY.stats.ordersDelivered.toLocaleString()}+`, l:"Pedidos entregados", icon:"🚚" },
    { v:`${COMPANY.stats.provincesCovered}`,        l:"Provincias cubiertas", icon:"🗺️" },
    { v:`${COMPANY.stats.satisfactionRate}%`,       l:"Satisfacción",         icon:"⭐" },
  ];
  return (
    <section aria-label="Estadísticas de confianza" style={{
      background: C.white, padding: "40px 60px",
      borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 24 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.navy, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 5, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  BRANDS / SUPPLIERS
// ═══════════════════════════════════════════════════════════════════════════
export function BrandsSection() {
  return (
    <section aria-labelledby="brands-title" style={{ padding: "64px 60px", background: C.bg }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Distribuidores Autorizados
          </span>
        </div>
        <h2 id="brands-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
          Marcas que Distribuimos
        </h2>
        <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
          Trabajamos con los fabricantes líderes mundiales para garantizar la máxima calidad y autenticidad.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {BRANDS.map((b, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 14, border: `1px solid ${C.border}`,
              padding: "28px 20px", textAlign: "center",
              transition: "all 0.2s", cursor: "default",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(-3px)"; el.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)"; el.style.borderColor=b.color+"55"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(0)"; el.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"; el.style.borderColor=C.border; }}
            >
              <div style={{
                fontSize: 26, fontWeight: 900, color: b.color,
                letterSpacing: "-0.5px", marginBottom: 8, fontFamily: "var(--font-outfit)",
              }}>
                {b.name}
              </div>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>{b.category}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 28, fontStyle: "italic" }}>
          Y muchas más marcas reconocidas internacionalmente en el sector médico.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════
export function CertificationsSection() {
  return (
    <section aria-labelledby="cert-title" style={{ padding: "64px 60px", background: C.white }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Confianza y Legalidad
          </span>
        </div>
        <h2 id="cert-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
          Certificaciones y Acreditaciones
        </h2>
        <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 600, margin: "0 auto 44px" }}>
          Empresa legalmente constituida y certificada, con todos los registros al día.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} style={{
              background: C.bg, borderRadius: 16, border: `1px solid ${C.border}`,
              padding: "26px 24px", display: "flex", gap: 16,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 13, background: C.white,
                border: `1px solid ${C.border}`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 26, flexShrink: 0,
              }}>{c.icon}</div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{c.title}</h3>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 6 }}>{c.detail}</div>
                <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  FACILITIES / WAREHOUSE  (visual placeholders — reemplazar con fotos reales)
// ═══════════════════════════════════════════════════════════════════════════
export function FacilitiesSection() {
  const facilities = [
    { icon:"🏢", title:"Oficinas Centrales",  desc:"Ubicadas en el corazón de Santiago, equipadas para atención corporativa.", tag:"Santiago" },
    { icon:"🏭", title:"Almacén Principal",    desc:"Más de 800m² de almacenamiento con control de temperatura y trazabilidad.", tag:"800+ m²" },
    { icon:"📦", title:"Centro de Distribución", desc:"Sistema logístico que despacha pedidos a todo el país en 24-72 horas.", tag:"Nacional" },
    { icon:"🚛", title:"Flota de Transporte",  desc:"Vehículos propios para garantizar entregas seguras y puntuales.", tag:"Propia" },
  ];
  return (
    <section aria-labelledby="facilities-title" style={{ padding: "64px 60px", background: C.bg }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Infraestructura
          </span>
        </div>
        <h2 id="facilities-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
          Nuestras Instalaciones
        </h2>
        <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 600, margin: "0 auto 44px" }}>
          Contamos con instalaciones modernas que respaldan la calidad de nuestro servicio.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {facilities.map((f, i) => (
            <div key={i} style={{
              background: `linear-gradient(135deg, ${C.navy} 0%, ${C.tealDk} 100%)`,
              borderRadius: 18, padding: "32px 30px", color: "#fff",
              position: "relative", overflow: "hidden",
              minHeight: 160,
            }}>
              <div style={{ position: "absolute", right: -20, bottom: -20, fontSize: 120, opacity: 0.12 }}>{f.icon}</div>
              <span style={{
                display: "inline-block", background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20,
                padding: "3px 12px", fontSize: 11, fontWeight: 700, marginBottom: 14,
              }}>{f.tag}</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, position: "relative" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.6, maxWidth: 340, position: "relative" }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 22, background: "#FFFBEB", border: "1px solid #FDE68A",
          borderRadius: 12, padding: "14px 20px", textAlign: "center",
          fontSize: 13, color: "#92400E",
        }}>
          📸 <strong>Galería de fotos:</strong> Las imágenes reales de nuestras instalaciones se cargarán próximamente. Contáctenos para agendar una visita.
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  TEAM
// ═══════════════════════════════════════════════════════════════════════════
export function TeamSection() {
  return (
    <section aria-labelledby="team-title" style={{ padding: "64px 60px", background: C.white }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Nuestro Equipo
          </span>
        </div>
        <h2 id="team-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
          Profesionales a su Servicio
        </h2>
        <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
          Un equipo experimentado y comprometido con la salud de la República Dominicana.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {TEAM.map((m, i) => (
            <div key={i} style={{
              background: C.bg, borderRadius: 16, border: `1px solid ${C.border}`,
              padding: "28px 24px", display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.navy}, ${C.teal})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 800, color: "#fff", flexShrink: 0,
              }}>{m.initials}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{m.name}</h3>
                <div style={{ fontSize: 13, color: C.teal, fontWeight: 600, marginTop: 2 }}>{m.role}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{m.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  NATIONAL COVERAGE
// ═══════════════════════════════════════════════════════════════════════════
export function CoverageSection() {
  return (
    <section aria-labelledby="coverage-title" style={{
      padding: "64px 60px",
      background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 100%)`,
      color: "#fff",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", letterSpacing: "1px" }}>
            Logística Nacional
          </span>
        </div>
        <h2 id="coverage-title" style={{ fontSize: 34, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>
          Cobertura en Todo el País
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 560, margin: "0 auto 44px" }}>
          Llegamos a las 32 provincias de la República Dominicana con tiempos de entrega garantizados.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
          {COVERAGE_REGIONS.map((r, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 16, padding: "24px 22px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <MapPin size={20} color="#38BDF8"/>
                <span style={{
                  background: "rgba(56,189,248,0.2)", color: "#7DD3FA",
                  padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700,
                }}>{r.time}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{r.region}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {r.provinces.slice(0, 4).map((p, j) => (
                  <div key={j} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle size={11} color="#38BDF8"/> {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  CASE STUDIES
// ═══════════════════════════════════════════════════════════════════════════
export function CaseStudiesSection() {
  return (
    <section aria-labelledby="cases-title" style={{ padding: "64px 60px", background: C.bg }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Resultados Reales
          </span>
        </div>
        <h2 id="cases-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 10 }}>
          Casos de Éxito
        </h2>
        <p style={{ color: C.muted, fontSize: 16, textAlign: "center", marginBottom: 44, maxWidth: 600, margin: "0 auto 44px" }}>
          Historias de instituciones que confían en nosotros para su abastecimiento.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={i} style={{
              background: C.white, borderRadius: 18, border: `1px solid ${C.border}`,
              overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.tealDk})`, padding: "26px 26px 22px", color: "#fff" }}>
                <div style={{ fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{cs.metric}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>{cs.metricLabel}</div>
              </div>
              <div style={{ padding: "22px 26px 26px" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{cs.client}</h3>
                <div style={{ fontSize: 12, color: C.teal, fontWeight: 600, marginBottom: 14 }}>{cs.sector}</div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>Desafío</div>
                  <p style={{ fontSize: 13, color: C.txt, lineHeight: 1.55 }}>{cs.challenge}</p>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", marginBottom: 4 }}>Resultado</div>
                  <p style={{ fontSize: 13, color: C.txt, lineHeight: 1.55 }}>{cs.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ENHANCED TESTIMONIALS
// ═══════════════════════════════════════════════════════════════════════════
export function TestimonialsSection() {
  return (
    <section aria-labelledby="testi-title" style={{ padding: "64px 60px", background: C.white }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: "1px" }}>
            Lo que dicen de nosotros
          </span>
        </div>
        <h2 id="testi-title" style={{ fontSize: 34, fontWeight: 800, color: C.navy, textAlign: "center", marginBottom: 44 }}>
          Testimonios de Clientes
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {TESTIMONIALS_EXT.map((t, i) => (
            <div key={i} style={{
              background: C.bg, borderRadius: 18, border: `1px solid ${C.border}`,
              padding: "32px 30px", position: "relative",
            }}>
              <Quote size={32} color={C.teal} style={{ opacity: 0.25, marginBottom: 12 }}/>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={15} fill="#F59E0B" color="#F59E0B"/>
                ))}
              </div>
              <p style={{ color: C.txt, fontSize: 14.5, lineHeight: 1.8, marginBottom: 22, fontStyle: "italic" }}>
                {t.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.navy}, ${C.teal})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800, color: "#fff", flexShrink: 0,
                }}>{t.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: C.muted, fontSize: 12 }}>{t.role} · {t.company}</div>
                  <div style={{ color: C.teal, fontSize: 11, fontWeight: 600, marginTop: 2 }}>{t.years}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
