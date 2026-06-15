"use client";
import { useState } from "react";
import { Send, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { COLORS as C, CATEGORIES } from "@/lib/data";
import { COMPANY } from "@/lib/config";

interface QuickQuoteSectionProps {
  onToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
}

export function QuickQuoteSection({ onToast }: QuickQuoteSectionProps) {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "",
    product: "", quantity: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const upd = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Requerido";
    if (!form.phone.trim())   e.phone   = "Requerido";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email válido requerido";
    if (!form.product.trim()) e.product = "Indique el producto";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) { onToast("Complete los campos requeridos.", "error"); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1100));
    setSending(false);
    setSent(true);
    onToast("✅ Solicitud de presupuesto enviada con éxito.", "success");
    setForm({ name:"", company:"", phone:"", email:"", product:"", quantity:"", message:"" });
    setTimeout(() => setSent(false), 5000);
  };

  const fieldStyle = (err?: string): React.CSSProperties => ({
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: `1.5px solid ${err ? C.red : "rgba(255,255,255,0.25)"}`,
    fontSize: 14, color: "#fff", background: "rgba(255,255,255,0.1)",
    outline: "none", fontFamily: "inherit",
  });

  return (
    <section
      id="cotizacion-rapida"
      aria-labelledby="quote-title"
      style={{
        padding: "72px 60px",
        background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 50%, ${C.tealDk} 100%)`,
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 15% 80%, rgba(13,153,204,0.2) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(39,174,96,0.13) 0%, transparent 45%)",
      }}/>
      <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }}>
        {/* LEFT — Pitch */}
        <div style={{ color: "#fff" }}>
          <span style={{
            display: "inline-block", background: "rgba(13,153,204,0.2)",
            border: "1px solid rgba(13,153,204,0.4)", borderRadius: 20,
            padding: "5px 16px", fontSize: 13, color: "#7DD3FA", fontWeight: 600, marginBottom: 22,
          }}>
            ⚡ Respuesta en 2–4 horas hábiles
          </span>
          <h2 id="quote-title" style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 18 }}>
            Solicite su Presupuesto Sin Compromiso
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 30 }}>
            Cuéntenos qué necesita y nuestro equipo le preparará una cotización personalizada con los mejores precios del mercado.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { I: CheckCircle, t: "Precios competitivos garantizados" },
              { I: CheckCircle, t: "Productos certificados y de calidad" },
              { I: CheckCircle, t: "Entrega a las 32 provincias del país" },
              { I: CheckCircle, t: "Atención personalizada y profesional" },
            ].map(({ I, t }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "rgba(255,255,255,0.9)" }}>
                <I size={18} color="#38BDF8" style={{ flexShrink: 0 }}/> {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, display: "flex", gap: 14, alignItems: "center" }}>
            <a href={`tel:${COMPANY.phoneRaw}`} style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600,
            }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={18} color="#38BDF8"/>
              </div>
              {COMPANY.phone}
            </a>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: 22, padding: "32px 34px",
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(39,174,96,0.25)", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={38} color="#27AE60"/>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 10 }}>¡Solicitud Recibida!</h3>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Le contactaremos en las próximas 2–4 horas hábiles con su presupuesto personalizado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 20 }}>
                Solicitud Rápida de Presupuesto
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <input placeholder="Nombre completo *" value={form.name}    onChange={e => upd("name", e.target.value)}    style={fieldStyle(errors.name)}/>
                <input placeholder="Empresa"            value={form.company} onChange={e => upd("company", e.target.value)} style={fieldStyle()}/>
                <input placeholder="Teléfono *"         value={form.phone}   onChange={e => upd("phone", e.target.value)}   type="tel"   style={fieldStyle(errors.phone)}/>
                <input placeholder="Correo *"           value={form.email}   onChange={e => upd("email", e.target.value)}   type="email" style={fieldStyle(errors.email)}/>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
                <input placeholder="Producto solicitado *" value={form.product}  onChange={e => upd("product", e.target.value)} style={fieldStyle(errors.product)}/>
                <input placeholder="Cantidad"              value={form.quantity} onChange={e => upd("quantity", e.target.value)} style={fieldStyle()}/>
              </div>
              <textarea placeholder="Mensaje o detalles adicionales..." value={form.message} onChange={e => upd("message", e.target.value)} rows={3}
                style={{ ...fieldStyle(), resize: "vertical", marginBottom: 16 }}/>
              <button type="submit" disabled={sending} style={{
                width: "100%", padding: "14px", borderRadius: 12, border: "none",
                background: sending ? "rgba(255,255,255,0.3)" : C.teal,
                color: "#fff", fontSize: 15, fontWeight: 700,
                cursor: sending ? "wait" : "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 4px 18px rgba(13,153,204,0.4)",
              }}>
                {sending ? "Enviando..." : <><Send size={17}/> Enviar Solicitud</>}
              </button>
              <p style={{ textAlign: "center", fontSize: 11.5, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
                🔒 Sus datos están protegidos · Sin compromiso de compra
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
