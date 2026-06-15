"use client";
import { useState, useCallback } from "react";
import { X, FileText, CheckCircle, Send, MapPin, Phone, Mail } from "lucide-react";
import { COLORS as C, PROVINCES, type CartItem } from "@/lib/data";
import { fmt, cartTotal } from "@/lib/utils";

interface QuoteModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "form" | "confirm" | "sent";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  province: string;
  message: string;
  paymentMethod: string;
}

const EMPTY_FORM: FormData = {
  name: "", company: "", email: "",
  phone: "", province: "", message: "",
  paymentMethod: "transferencia",
};

export function QuoteModal({ isOpen, items, onClose, onSuccess }: QuoteModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sending, setSending] = useState(false);

  const total = cartTotal(items);
  const shippingProv = PROVINCES.find(p => p.name === form.province);
  const shippingCost = total >= 10000 ? 0 : (shippingProv?.rate ?? 450);
  const grandTotal   = total + shippingCost;

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  }, []);

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim())     errs.name     = "Nombre requerido";
    if (!form.company.trim())  errs.company  = "Empresa requerida";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email válido requerido";
    if (!form.phone.trim())    errs.phone    = "Teléfono requerido";
    if (!form.province)        errs.province = "Seleccione una provincia";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep("confirm");
  };

  const handleSend = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setStep("sent");
  };

  const handleClose = () => {
    setStep("form");
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleSuccessClose = () => {
    handleClose();
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={step === "sent" ? handleSuccessClose : handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-label="Solicitar cotización"
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: C.white, borderRadius: 22,
          border: `1px solid ${C.border}`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          width: "min(600px, 96vw)",
          maxHeight: "92vh", overflowY: "auto",
          zIndex: 400,
        }}
      >
        {/* Top bar */}
        <div style={{ height: 4, background: `linear-gradient(90deg, ${C.navy}, ${C.teal})`, borderRadius: "22px 22px 0 0" }}/>

        {/* ── STEP: FORM ──────────────────────────────────────── */}
        {step === "form" && (
          <div style={{ padding: "32px 36px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: C.navyLt, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <FileText size={20} color={C.navy}/>
                </div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>Solicitar Cotización</h2>
                  <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
                    {items.length} producto{items.length !== 1 ? "s" : ""} · {fmt(total)}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} style={{
                width: 34, height: 34, borderRadius: 8, background: C.bg,
                border: "none", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <X size={16} color={C.muted}/>
              </button>
            </div>

            {/* Products summary */}
            <div style={{
              background: C.bg, borderRadius: 12, padding: "14px 16px",
              marginBottom: 24, border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                Productos a cotizar
              </div>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: 13, marginBottom: i < items.length - 1 ? 7 : 0,
                  paddingBottom: i < items.length - 1 ? 7 : 0,
                  borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
                }}>
                  <span style={{ color: C.txt }}>
                    {item.product.icon} {item.product.name}
                    <span style={{ color: C.muted, marginLeft: 6 }}>×{item.qty}</span>
                  </span>
                  <span style={{ fontWeight: 700, color: C.navy }}>{fmt(item.product.price * item.qty)}</span>
                </div>
              ))}
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`,
                fontSize: 14, fontWeight: 800, color: C.navy,
              }}>
                <span>Subtotal</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            {/* Form fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[
                { key: "name" as const,    label: "Nombre completo *",       type: "text",  placeholder: "Dr. Juan Martínez"  },
                { key: "company" as const, label: "Empresa / Institución *",  type: "text",  placeholder: "Clínica San Rafael" },
                { key: "email" as const,   label: "Correo electrónico *",    type: "email", placeholder: "juan@clinica.do"    },
                { key: "phone" as const,   label: "Teléfono / WhatsApp *",   type: "tel",   placeholder: "+1 809 555-0000"    },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    style={{
                      width: "100%", padding: "10px 13px", borderRadius: 9,
                      border: `1.5px solid ${errors[f.key] ? C.red : C.border}`,
                      fontSize: 13, color: C.txt, background: C.bg,
                      outline: "none", fontFamily: "inherit",
                    }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = errors[f.key] ? C.red : C.teal; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = errors[f.key] ? C.red : C.border; }}
                  />
                  {errors[f.key] && (
                    <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors[f.key]}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Province */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>
                Provincia de entrega *
              </label>
              <div style={{ position: "relative" }}>
                <MapPin size={14} color={C.muted} style={{
                  position: "absolute", left: 11, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }}/>
                <select
                  value={form.province}
                  onChange={e => update("province", e.target.value)}
                  style={{
                    width: "100%", padding: "10px 13px 10px 32px",
                    borderRadius: 9,
                    border: `1.5px solid ${errors.province ? C.red : C.border}`,
                    fontSize: 13, color: form.province ? C.txt : C.muted,
                    background: C.bg, outline: "none", fontFamily: "inherit",
                  }}
                >
                  <option value="">Seleccione provincia...</option>
                  {PROVINCES.map(p => (
                    <option key={p.name} value={p.name}>
                      {p.name} — {p.rate === 0 ? "Envío gratis" : `RD$${p.rate}`}
                    </option>
                  ))}
                </select>
              </div>
              {errors.province && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.province}</div>}
            </div>

            {/* Payment method */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 8 }}>
                Método de pago preferido
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { v: "transferencia", l: "Transferencia"  },
                  { v: "efectivo",      l: "Efectivo"       },
                  { v: "tarjeta",       l: "Tarjeta"        },
                  { v: "cheque",        l: "Cheque"         },
                ].map(opt => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => update("paymentMethod", opt.v)}
                    style={{
                      padding: "8px 14px", borderRadius: 9, fontSize: 12, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
                      background: form.paymentMethod === opt.v ? C.navy : C.white,
                      color:      form.paymentMethod === opt.v ? "#fff"  : C.txt,
                      border:     `1.5px solid ${form.paymentMethod === opt.v ? C.navy : C.border}`,
                    }}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>
                Comentarios adicionales
              </label>
              <textarea
                value={form.message}
                onChange={e => update("message", e.target.value)}
                placeholder="Ej: Necesito factura a nombre de la empresa, entrega urgente, variante específica..."
                rows={3}
                style={{
                  width: "100%", padding: "10px 13px", borderRadius: 9,
                  border: `1.5px solid ${C.border}`, fontSize: 13, color: C.txt,
                  background: C.bg, outline: "none", fontFamily: "inherit", resize: "vertical",
                }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.teal; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.border; }}
              />
            </div>

            <button
              onClick={handleContinue}
              style={{
                width: "100%", padding: "13px",
                background: C.navy, color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              Continuar y Revisar →
            </button>
          </div>
        )}

        {/* ── STEP: CONFIRM ──────────────────────────────────── */}
        {step === "confirm" && (
          <div style={{ padding: "32px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
              <button onClick={() => setStep("form")} style={{ background: C.bg, border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} color={C.muted} style={{ transform: "rotate(180deg)" }}/>
              </button>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>Confirmar Cotización</h2>
                <p style={{ fontSize: 13, color: C.muted }}>Revise los datos antes de enviar</p>
              </div>
            </div>

            {/* Contact info summary */}
            <div style={{ background: C.navyLt, borderRadius: 12, padding: "16px 18px", marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: C.navy, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                Datos del Solicitante
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { l: "Nombre",   v: form.name     },
                  { l: "Empresa",  v: form.company  },
                  { l: "Email",    v: form.email    },
                  { l: "Teléfono", v: form.phone    },
                  { l: "Provincia",v: form.province },
                  { l: "Pago",     v: form.paymentMethod },
                ].map((f, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{f.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 18, border: `1px solid ${C.border}` }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: i < items.length - 1 ? 8 : 0, paddingBottom: i < items.length - 1 ? 8 : 0, borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span>{item.product.icon} {item.product.name} <span style={{ color: C.muted }}>×{item.qty}</span></span>
                  <span style={{ fontWeight: 700 }}>{fmt(item.product.price * item.qty)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`, fontSize: 13 }}>
                <span style={{ color: C.muted }}>Envío estimado</span>
                <span style={{ color: shippingCost === 0 ? C.green : C.txt, fontWeight: 600 }}>
                  {shippingCost === 0 ? "GRATIS" : fmt(shippingCost)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}`, fontSize: 15, fontWeight: 800, color: C.navy }}>
                <span>Total Estimado</span>
                <span>{fmt(grandTotal)}</span>
              </div>
            </div>

            {form.message && (
              <div style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 18, fontSize: 13, color: C.muted, border: `1px solid ${C.border}` }}>
                <strong style={{ color: C.txt }}>Nota:</strong> {form.message}
              </div>
            )}

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setStep("form")}
                style={{ flex: 1, padding: "12px", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.txt, fontFamily: "inherit" }}
              >
                ← Editar
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                style={{
                  flex: 2, padding: "12px", background: sending ? C.muted : C.teal,
                  border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
                  cursor: sending ? "wait" : "pointer", color: "#fff", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {sending ? "Enviando..." : <><Send size={16}/> Enviar Cotización</>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: SENT ─────────────────────────────────────── */}
        {step === "sent" && (
          <div style={{ padding: "48px 36px", textAlign: "center" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: C.greenLt, margin: "0 auto 20px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckCircle size={40} color={C.green}/>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 10 }}>
              ¡Cotización Enviada!
            </h2>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 6 }}>
              Hemos recibido su solicitud de cotización.
            </p>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>
              Un representante se comunicará con usted a <strong style={{ color: C.navy }}>{form.email}</strong> o al <strong style={{ color: C.navy }}>{form.phone}</strong> dentro de <strong style={{ color: C.navy }}>2–4 horas hábiles</strong>.
            </p>

            {/* Reference number */}
            <div style={{
              background: C.navyLt, borderRadius: 12, padding: "14px 20px",
              marginBottom: 28, display: "inline-block",
            }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Número de referencia</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, fontFamily: "monospace" }}>
                COT-{Date.now().toString().slice(-8)}
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 28 }}>
              {[
                { I: Phone, v: "+1 (809) 555-0001" },
                { I: Mail,  v: "ventas@hospicalfa.do" },
              ].map(({ I, v }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: C.muted }}>
                  <I size={14} color={C.teal}/>{v}
                </div>
              ))}
            </div>

            <button
              onClick={handleSuccessClose}
              style={{
                width: "100%", padding: "13px",
                background: C.navy, color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Entendido — Cerrar
            </button>
          </div>
        )}
      </div>
    </>
  );
}
