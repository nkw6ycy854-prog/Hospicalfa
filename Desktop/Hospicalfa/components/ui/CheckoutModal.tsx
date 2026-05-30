"use client";
import { useState } from "react";
import { X, CreditCard, CheckCircle, MapPin, AlertCircle } from "lucide-react";
import { type CartItem, COLORS as C, PROVINCES } from "@/lib/data";
import { fmt, cartTotal } from "@/lib/utils";

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onSuccess: (orderNum: string) => void;
}

type Step = "shipping" | "payment" | "confirm" | "success";

export function CheckoutModal({ isOpen, items, onClose, onSuccess }: CheckoutModalProps) {
  const [step, setStep]       = useState<Step>("shipping");
  const [province, setProv]   = useState("");
  const [address, setAddress] = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry]   = useState("");
  const [cvv, setCvv]         = useState("");
  const [payMethod, setPay]   = useState<"tarjeta"|"transferencia"|"efectivo">("transferencia");
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [processing, setProc] = useState(false);
  const [orderNum]            = useState(`ORD-${Date.now().toString().slice(-8)}`);

  const total    = cartTotal(items);
  const prov     = PROVINCES.find(p => p.name === province);
  const shipping = total >= 10000 ? 0 : (prov?.rate ?? 0);
  const grand    = total + shipping;

  const validateShipping = () => {
    const e: Record<string,string> = {};
    if (!name.trim())    e.name    = "Requerido";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Email inválido";
    if (!phone.trim())   e.phone   = "Requerido";
    if (!province)       e.province= "Seleccione provincia";
    if (!address.trim()) e.address = "Requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    if (payMethod !== "tarjeta") return true;
    const e: Record<string,string> = {};
    if (cardNum.replace(/\s/g,"").length < 16) e.cardNum = "Número inválido";
    if (!expiry.match(/^\d{2}\/\d{2}$/))       e.expiry  = "Formato MM/AA";
    if (cvv.length < 3)                         e.cvv     = "CVV inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextShipping = () => { if (validateShipping()) { setErrors({}); setStep("payment"); } };
  const handleNextPayment  = () => { if (validatePayment())  { setErrors({}); setStep("confirm");  } };
  const handlePlace = async () => {
    setProc(true);
    await new Promise(r => setTimeout(r, 1500));
    setProc(false);
    setStep("success");
    onSuccess(orderNum);
  };

  const reset = () => { setStep("shipping"); setErrors({}); };
  const handleClose = () => { reset(); onClose(); };

  const STEPS = ["shipping","payment","confirm","success"] as const;
  const stepIdx = STEPS.indexOf(step);

  if (!isOpen) return null;

  const Field = ({ id, label, value, onChange, placeholder, type = "text", half = false, error }: {
    id: string; label: string; value: string;
    onChange: (v: string) => void;
    placeholder?: string; type?: string; half?: boolean; error?: string;
  }) => (
    <div style={{ gridColumn: half ? "span 1" : "span 2" }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>{label}</label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 13px", borderRadius: 9,
          border: `1.5px solid ${error ? C.red : C.border}`,
          fontSize: 13, color: C.txt, background: C.bg,
          outline: "none", fontFamily: "inherit",
        }}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = error ? C.red : C.teal; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = error ? C.red : C.border; }}
      />
      {error && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{error}</div>}
    </div>
  );

  return (
    <>
      <div className="overlay" onClick={handleClose}/>
      <div className="animate-scale-in" role="dialog" aria-modal="true" style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        background: C.white, borderRadius: 22,
        border: `1px solid ${C.border}`,
        boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
        width: "min(580px, 96vw)", maxHeight: "92vh", overflowY: "auto",
        zIndex: 400,
      }}>
        <div style={{ height: 4, background: `linear-gradient(90deg,${C.navy},${C.teal})`, borderRadius: "22px 22px 0 0" }}/>
        <div style={{ padding: "28px 32px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.navy }}>
              {step === "shipping" ? "🚚 Datos de Envío"
                : step === "payment" ? "💳 Método de Pago"
                : step === "confirm" ? "✅ Confirmar Pedido"
                : "🎉 Pedido Confirmado"}
            </h2>
            {step !== "success" && (
              <button onClick={handleClose} style={{ background: C.bg, border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} color={C.muted}/>
              </button>
            )}
          </div>

          {/* Progress bar */}
          {step !== "success" && (
            <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
              {["Envío","Pago","Confirmar"].map((s, i) => (
                <div key={s} style={{ flex: 1 }}>
                  <div style={{
                    height: 4, borderRadius: 2,
                    background: i <= stepIdx - (stepIdx === 3 ? 1 : 0)
                      ? C.teal : C.border,
                    transition: "background 0.3s",
                  }}/>
                  <div style={{ fontSize: 10, color: i < stepIdx ? C.teal : C.muted, marginTop: 4, fontWeight: 600 }}>{s}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── STEP 1: SHIPPING ─────────────────────────── */}
          {step === "shipping" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <Field id="name" label="Nombre completo *" value={name} onChange={setName} placeholder="Dr. Juan Martínez" error={errors.name}/>
                <Field id="email" label="Email *" value={email} onChange={setEmail} placeholder="juan@clinica.do" type="email" half error={errors.email}/>
                <Field id="phone" label="Teléfono *" value={phone} onChange={setPhone} placeholder="+1 809 555-0000" type="tel" half error={errors.phone}/>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>
                  Provincia *
                </label>
                <div style={{ position: "relative" }}>
                  <MapPin size={13} color={C.muted} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
                  <select value={province} onChange={e => setProv(e.target.value)} style={{ width: "100%", padding: "10px 13px 10px 30px", borderRadius: 9, border: `1.5px solid ${errors.province ? C.red : C.border}`, fontSize: 13, color: province ? C.txt : C.muted, background: C.bg, outline: "none", fontFamily: "inherit" }}>
                    <option value="">Seleccione provincia...</option>
                    {PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name} — {p.rate === 0 ? "Gratis" : `RD$${p.rate}`}</option>)}
                  </select>
                </div>
                {errors.province && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.province}</div>}
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Dirección completa *</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Calle, número, sector, referencias..." rows={2}
                  style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `1.5px solid ${errors.address ? C.red : C.border}`, fontSize: 13, color: C.txt, background: C.bg, outline: "none", fontFamily: "inherit", resize: "none" }}
                  onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.teal; }}
                  onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = errors.address ? C.red : C.border; }}
                />
                {errors.address && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.address}</div>}
              </div>
              <button onClick={handleNextShipping} style={{ width: "100%", padding: "13px", background: C.navy, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Continuar con el Pago →
              </button>
            </>
          )}

          {/* ── STEP 2: PAYMENT ──────────────────────────── */}
          {step === "payment" && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {([["transferencia","🏦 Transferencia"],["tarjeta","💳 Tarjeta"],["efectivo","💵 Efectivo"]] as const).map(([v, l]) => (
                  <button key={v} onClick={() => setPay(v)} style={{
                    flex: 1, padding: "11px 8px", borderRadius: 10, cursor: "pointer",
                    background: payMethod === v ? C.navy : C.white,
                    color: payMethod === v ? "#fff" : C.txt,
                    border: `1.5px solid ${payMethod === v ? C.navy : C.border}`,
                    fontSize: 13, fontWeight: 600, fontFamily: "inherit",
                  }}>{l}</button>
                ))}
              </div>

              {payMethod === "tarjeta" && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Número de tarjeta</label>
                    <input value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g,"").replace(/(\d{4})/g,"$1 ").trim().slice(0,19))} placeholder="0000 0000 0000 0000" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `1.5px solid ${errors.cardNum ? C.red : C.border}`, fontSize: 14, fontFamily: "monospace", letterSpacing: 1, background: C.bg, outline: "none" }}/>
                    {errors.cardNum && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.cardNum}</div>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>Vencimiento</label>
                      <input value={expiry} onChange={e => { const v = e.target.value.replace(/\D/g,""); setExpiry(v.length>=2?v.slice(0,2)+"/"+v.slice(2,4):v); }} placeholder="MM/AA" maxLength={5} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `1.5px solid ${errors.expiry ? C.red : C.border}`, fontSize: 14, fontFamily: "monospace", background: C.bg, outline: "none" }}/>
                      {errors.expiry && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.expiry}</div>}
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: C.txt, display: "block", marginBottom: 5 }}>CVV</label>
                      <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="•••" maxLength={4} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: `1.5px solid ${errors.cvv ? C.red : C.border}`, fontSize: 14, fontFamily: "monospace", background: C.bg, outline: "none" }}/>
                      {errors.cvv && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{errors.cvv}</div>}
                    </div>
                  </div>
                </div>
              )}

              {payMethod === "transferencia" && (
                <div style={{ background: C.navyLt, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 10 }}>Datos para Transferencia</div>
                  {[["Banco","Banco Popular Dominicano"],["Cuenta","123-456789-0"],["Tipo","Corriente"],["A nombre de","Hospicalfa Medical SRL"],["RNC","1-23-45678-9"]].map(([l,v],i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span style={{ color: C.muted }}>{l}</span>
                      <strong style={{ color: C.txt }}>{v}</strong>
                    </div>
                  ))}
                </div>
              )}

              {payMethod === "efectivo" && (
                <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "14px 16px", marginBottom: 20, fontSize: 13, color: "#92400E" }}>
                  <AlertCircle size={15} style={{ display: "inline", marginRight: 7 }}/>
                  El pago en efectivo se realiza al momento de la entrega. Un representante le confirmará la orden.
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep("shipping")} style={{ flex: 1, padding: "12px", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.txt, fontFamily: "inherit" }}>← Atrás</button>
                <button onClick={handleNextPayment} style={{ flex: 2, padding: "12px", background: C.navy, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Revisar Pedido →</button>
              </div>
            </>
          )}

          {/* ── STEP 3: CONFIRM ──────────────────────────── */}
          {step === "confirm" && (
            <>
              <div style={{ background: C.bg, borderRadius: 12, padding: "14px 16px", marginBottom: 16, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: "uppercase" }}>Resumen del Pedido</div>
                {items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 7 }}>
                    <span>{item.product.icon} {item.product.name} <span style={{ color: C.muted }}>×{item.qty}</span></span>
                    <strong>{fmt(item.product.price * item.qty)}</strong>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5, color: C.muted }}>
                    <span>Envío a {province}</span>
                    <span style={{ color: shipping === 0 ? C.green : C.txt, fontWeight: 600 }}>{shipping === 0 ? "GRATIS" : fmt(shipping)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: C.navy }}>
                    <span>Total a Pagar</span>
                    <span>{fmt(grand)}</span>
                  </div>
                </div>
              </div>
              <div style={{ background: C.navyLt, borderRadius: 12, padding: "12px 14px", marginBottom: 18, fontSize: 13 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[["Cliente", name],["Email", email],["Teléfono", phone],["Pago", payMethod],["Provincia", province]].map(([l,v]) => (
                    <div key={l}><div style={{ fontSize: 11, color: C.muted }}>{l}</div><div style={{ fontWeight: 600, color: C.txt }}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep("payment")} style={{ flex: 1, padding: "12px", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.txt, fontFamily: "inherit" }}>← Atrás</button>
                <button onClick={handlePlace} disabled={processing} style={{ flex: 2, padding: "12px", background: processing ? C.muted : C.green, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: processing ? "wait" : "pointer", fontFamily: "inherit" }}>
                  {processing ? "Procesando..." : "✅ Confirmar Pedido"}
                </button>
              </div>
            </>
          )}

          {/* ── STEP 4: SUCCESS ──────────────────────────── */}
          {step === "success" && (
            <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.greenLt, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={42} color={C.green}/>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 10 }}>¡Pedido Confirmado!</h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>Su pedido ha sido procesado exitosamente.</p>
              <p style={{ color: C.muted, fontSize: 14, marginBottom: 20 }}>Recibirá un correo de confirmación a <strong style={{ color: C.navy }}>{email}</strong>.</p>
              <div style={{ background: C.navyLt, borderRadius: 12, padding: "14px 20px", display: "inline-block", marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 3 }}>Número de pedido</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, fontFamily: "monospace" }}>{orderNum}</div>
              </div>
              <button onClick={() => { reset(); onClose(); }} style={{ width: "100%", padding: "13px", background: C.navy, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
