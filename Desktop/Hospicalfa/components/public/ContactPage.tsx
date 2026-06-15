"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Building2 } from "lucide-react";
import { COLORS as C, CATEGORIES } from "@/lib/data";
import { COMPANY } from "@/lib/config";

interface ContactPageProps {
  onToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
}

export function ContactPage({ onToast }: ContactPageProps) {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "",
    product: "", quantity: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const upd = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Requerido";
    if (!form.phone.trim()) e.phone = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email válido requerido";
    if (!form.message.trim()) e.message = "Escriba su mensaje";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { onToast("Complete los campos requeridos.", "error"); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setForm({ name:"", company:"", phone:"", email:"", product:"", quantity:"", message:"" });
    onToast("✅ Mensaje enviado. Le contactaremos en 2–4 horas hábiles.", "success");
  };

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: `1.5px solid ${err ? C.red : C.border}`,
    fontSize: 14, color: C.txt, background: C.bg,
    outline: "none", fontFamily: "inherit",
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 100%)`,
        color: "#fff", padding: "56px 60px", textAlign: "center",
      }}>
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 14 }}>Contáctenos</h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 560, margin: "0 auto" }}>
          Estamos listos para atender su solicitud de productos, cotizaciones o cualquier consulta.
        </p>
      </section>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 60px" }}>
        {/* CONTACT CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 44 }}>
          {[
            { I: Phone,   t: "Teléfono",  v: COMPANY.phone,    href: `tel:${COMPANY.phoneRaw}`,   sub: "Lun–Vie 8am–6pm" },
            { I: MessageCircle, t: "WhatsApp", v: "Chat directo", href: `https://wa.me/${COMPANY.whatsapp}`, sub: "Respuesta inmediata" },
            { I: Mail,    t: "Email",     v: COMPANY.email,    href: `mailto:${COMPANY.email}`,  sub: "Respuesta en 24h" },
            { I: MapPin,  t: "Ubicación", v: COMPANY.city,     href: COMPANY.mapsLinkUrl,        sub: "Ver en el mapa" },
          ].map((c, i) => (
            <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
              background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
              padding: "24px 22px", textDecoration: "none", display: "block",
              transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(-3px)"; el.style.borderColor=C.teal; el.style.boxShadow="0 8px 22px rgba(13,153,204,0.12)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform="translateY(0)"; el.style.borderColor=C.border; el.style.boxShadow="0 1px 3px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 12, background: C.tealLt, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <c.I size={20} color={C.teal}/>
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 3 }}>{c.v}</div>
              <div style={{ fontSize: 12, color: C.teal }}>{c.sub}</div>
            </a>
          ))}
        </div>

        {/* FORM + INFO */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 36, marginBottom: 44 }}>
          {/* ADVANCED FORM */}
          <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, padding: "36px" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 6 }}>
              Solicite una Cotización
            </h2>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 26 }}>
              Complete el formulario y le enviaremos un presupuesto personalizado.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Nombre completo *</label>
                  <input value={form.name} onChange={e => upd("name", e.target.value)} placeholder="Dr. Juan Martínez" style={inputStyle(errors.name)}/>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Empresa / Institución</label>
                  <input value={form.company} onChange={e => upd("company", e.target.value)} placeholder="Clínica San Rafael" style={inputStyle()}/>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Teléfono *</label>
                  <input value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="+1 809 555-0000" type="tel" style={inputStyle(errors.phone)}/>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Correo electrónico *</label>
                  <input value={form.email} onChange={e => upd("email", e.target.value)} placeholder="juan@clinica.do" type="email" style={inputStyle(errors.email)}/>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Producto solicitado</label>
                  <input value={form.product} onChange={e => upd("product", e.target.value)} placeholder="Ej: Guantes, mascarillas..." style={inputStyle()}/>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Cantidad requerida</label>
                  <input value={form.quantity} onChange={e => upd("quantity", e.target.value)} placeholder="Ej: 50 cajas" style={inputStyle()}/>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Mensaje *</label>
                <textarea value={form.message} onChange={e => upd("message", e.target.value)} placeholder="Describa los productos que necesita o su consulta..." rows={4}
                  style={{ ...inputStyle(errors.message), resize: "vertical" }}/>
              </div>
              <button type="submit" disabled={sending} style={{
                width: "100%", background: sending ? C.muted : C.navy, color: "#fff",
                border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700,
                cursor: sending ? "wait" : "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {sending ? "Enviando..." : <><Send size={17}/> Enviar Solicitud</>}
              </button>
            </form>
          </div>

          {/* COMPANY INFO */}
          <div>
            <div style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.border}`, padding: "28px", marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                <Building2 size={18} color={C.teal}/> Datos de la Empresa
              </h3>
              {[
                { l: "Razón social", v: COMPANY.legalName },
                { l: "RNC",          v: COMPANY.rnc },
                { l: "Reg. Mercantil", v: COMPANY.mercantilRegistry },
                { l: "Dirección",    v: `${COMPANY.address}, ${COMPANY.city}` },
              ].map((d, i) => (
                <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 11.5, color: C.muted, fontWeight: 600, marginBottom: 3 }}>{d.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.txt }}>{d.v}</div>
                </div>
              ))}
            </div>

            <div style={{ background: C.navyLt, borderRadius: 18, padding: "24px 26px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={17} color={C.teal}/> Horario Comercial
              </h3>
              {[
                { dot: "🟢", t: COMPANY.schedule.weekdays },
                { dot: "🟢", t: COMPANY.schedule.saturday },
                { dot: "🔴", t: COMPANY.schedule.sunday },
              ].map((s, i) => (
                <div key={i} style={{ fontSize: 14, color: C.txt, marginBottom: 8, display: "flex", gap: 8 }}>
                  <span>{s.dot}</span> {s.t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GOOGLE MAPS */}
        <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "22px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={18} color={C.teal}/> Nuestra Ubicación
              </h3>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
                {COMPANY.address}, {COMPANY.city}, {COMPANY.country}
              </p>
            </div>
            <a href={COMPANY.mapsLinkUrl} target="_blank" rel="noopener noreferrer" style={{
              background: C.navy, color: "#fff", textDecoration: "none",
              padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            }}>
              <MapPin size={14}/> Cómo llegar
            </a>
          </div>
          <iframe
            title="Ubicación de Hospicalfa Medical"
            src={COMPANY.mapsEmbedUrl}
            width="100%" height="400"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
