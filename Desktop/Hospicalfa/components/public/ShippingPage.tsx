"use client";
import { useState } from "react";
import { MapPin, Clock, Package, CheckCircle, Truck } from "lucide-react";
import { COLORS as C, PROVINCES } from "@/lib/data";
import { fmt } from "@/lib/utils";

export function ShippingPage() {
  const [selected, setSelected] = useState("");
  const [orderAmt, setOrderAmt] = useState(5000);

  const calcShipping = (rate: number) => {
    return orderAmt >= 10000 ? 0 : rate;
  };

  return (
    <div style={{ padding: "40px 60px", background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
            Sistema de Envíos Nacional
          </h1>
          <p style={{ color: C.muted, fontSize: 16 }}>
            Entregamos en las 32 provincias de República Dominicana
          </p>
        </div>

        {/* Info banner */}
        <div style={{
          background: C.tealLt, border: `1px solid rgba(13,153,204,0.25)`,
          borderRadius: 14, padding: "16px 22px", marginBottom: 28,
          display: "flex", alignItems: "center", gap: 12,
          fontSize: 14, color: C.tealDk, fontWeight: 500,
        }}>
          <Truck size={20} color={C.teal} style={{ flexShrink: 0 }} />
          <span>
            🎉 <strong>Envío GRATIS</strong> en pedidos superiores a RD$10,000 ·
            Pedidos antes de las 2:00 PM salen el mismo día ·
            Tracking por WhatsApp incluido
          </span>
        </div>

        {/* Shipping calculator */}
        <div style={{
          background: C.white, borderRadius: 16,
          border: `1px solid ${C.border}`,
          padding: "24px 28px", marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 18 }}>
            🧮 Calculadora de Envío
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: "block", marginBottom: 8 }}>
                Provincia de destino
              </label>
              <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10,
                  border: `1px solid ${C.border}`, fontSize: 14,
                  color: selected ? C.txt : C.muted,
                  background: C.white, outline: "none", fontFamily: "inherit",
                }}
              >
                <option value="">Seleccione provincia...</option>
                {PROVINCES.map(p => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.muted, display: "block", marginBottom: 8 }}>
                Monto del pedido (RD$)
              </label>
              <input
                type="number"
                value={orderAmt}
                onChange={e => setOrderAmt(Number(e.target.value))}
                min={0}
                style={{
                  width: "100%", padding: "12px 14px", borderRadius: 10,
                  border: `1px solid ${C.border}`, fontSize: 14,
                  color: C.txt, background: C.white, outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {selected && (() => {
            const prov = PROVINCES.find(p => p.name === selected);
            if (!prov) return null;
            const cost = calcShipping(prov.rate);
            return (
              <div className="animate-fade-in" style={{
                marginTop: 18, padding: "18px 22px",
                background: cost === 0 ? C.greenLt : C.navyLt,
                borderRadius: 12,
                border: `1px solid ${cost === 0 ? "#86EFAC" : C.border}`,
                display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20,
              }}>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Costo de envío</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: cost === 0 ? C.green : C.navy }}>
                    {cost === 0 ? "🎉 GRATIS" : fmt(cost)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Tiempo de entrega</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.txt }}>
                    {prov.delivery}–{prov.delivery + 1} días hábiles
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Total estimado</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.navy }}>
                    {fmt(orderAmt + cost)}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Province table */}
        <div style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            background: `linear-gradient(135deg, ${C.navy}, ${C.tealDk})`,
            padding: "16px 28px", color: "#fff",
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 16, fontSize: 12, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.4px",
          }}>
            <span>Provincia</span>
            <span>Tarifa Estándar</span>
            <span>Tiempo Entrega</span>
            <span>Disponibilidad</span>
          </div>

          {PROVINCES.map((p, i) => (
            <div
              key={p.name}
              onClick={() => setSelected(p.name)}
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: 16, padding: "14px 28px", alignItems: "center",
                borderBottom: i < PROVINCES.length - 1 ? `1px solid ${C.border}` : "none",
                background: selected === p.name ? C.tealLt : i % 2 === 0 ? C.white : C.bg,
                cursor: "pointer", transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <MapPin size={14} color={selected === p.name ? C.teal : C.muted} />
                <span style={{ fontSize: 14, fontWeight: selected === p.name ? 700 : 500, color: C.txt }}>
                  {p.name}
                </span>
              </div>
              <div style={{
                fontWeight: 700, fontSize: 14,
                color: p.rate === 0 ? C.green : C.navy,
              }}>
                {p.rate === 0 ? "🎁 GRATIS" : fmt(p.rate)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted }}>
                <Clock size={13} />
                {p.delivery}–{p.delivery + 1} días
              </div>
              <span style={{
                background: C.greenLt, color: C.green,
                padding: "4px 12px", borderRadius: 12,
                fontSize: 11, fontWeight: 700, display: "inline-flex",
                alignItems: "center", gap: 5,
              }}>
                <CheckCircle size={11} /> Disponible
              </span>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div style={{
          marginTop: 24, background: C.navyLt,
          border: `1px solid ${C.border}`, borderRadius: 14,
          padding: "22px 26px",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 12 }}>
            📋 Condiciones de Envío
          </h3>
          <ul style={{ color: C.muted, fontSize: 14, lineHeight: 2, paddingLeft: 20 }}>
            <li>Los precios de envío aplican por pedido, sin importar la cantidad de productos.</li>
            <li>Pedidos superiores a <strong style={{ color: C.navy }}>RD$10,000</strong> tienen envío gratuito a todo el país.</li>
            <li>El tracking se envía vía WhatsApp al confirmar el pedido.</li>
            <li>Para pedidos voluminosos o urgentes, contáctenos directamente.</li>
            <li>Los tiempos aplican en días hábiles (lunes a viernes).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
