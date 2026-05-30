"use client";
import { X, ShoppingCart, Trash2, Plus, Minus, MapPin, CreditCard, FileText } from "lucide-react";
import { type CartItem, COLORS as C } from "@/lib/data";
import { fmt, cartTotal } from "@/lib/utils";

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, qty: number) => void;
  onClear: () => void;
  onCheckout: () => void;
  onQuote: (items: CartItem[]) => void;
}

export function CartDrawer({
  items, isOpen, onClose, onRemove, onUpdate, onClear, onCheckout, onQuote,
}: CartDrawerProps) {
  const total    = cartTotal(items);
  const shipping = total >= 10000 ? 0 : 350;
  const grandTotal = total + shipping;
  const count    = items.reduce((s, i) => s + i.qty, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={onClose} aria-hidden="true"/>

      {/* Drawer */}
      <div
        className="animate-slide-in"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        style={{
          position: "fixed", right: 0, top: 0, bottom: 0,
          width: 420, maxWidth: "100vw",
          background: C.white,
          boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
          zIndex: 300,
          display: "flex", flexDirection: "column",
        }}
      >
        {/* ── HEADER ───────────────────────────────────────── */}
        <div style={{
          padding: "18px 22px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart size={20} color={C.navy}/>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: C.navy }}>Mi Carrito</h2>
            {count > 0 && (
              <span style={{
                background: C.teal, color: "#fff",
                borderRadius: 20, padding: "2px 9px",
                fontSize: 12, fontWeight: 700,
              }}>{count} {count === 1 ? "item" : "items"}</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {items.length > 0 && (
              <button
                onClick={onClear}
                style={{
                  fontSize: 12, color: C.red, fontWeight: 600,
                  background: "transparent", border: "none", cursor: "pointer",
                  padding: "4px 8px", borderRadius: 6,
                }}
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Cerrar carrito"
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: C.bg, border: "none",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={16} color={C.muted}/>
            </button>
          </div>
        </div>

        {/* ── ITEMS ────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
          {items.length === 0 ? (
            /* Empty state */
            <div style={{ textAlign: "center", paddingTop: 72 }}>
              <div style={{ fontSize: 72, marginBottom: 18, opacity: 0.6 }}>🛒</div>
              <p style={{ fontWeight: 700, color: C.navy, fontSize: 17, marginBottom: 8 }}>
                Su carrito está vacío
              </p>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6 }}>
                Explore nuestro catálogo y encuentre los productos que necesita
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex", gap: 13,
                  paddingBottom: 15, marginBottom: 15,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {/* Product icon */}
                <div style={{
                  width: 60, height: 60, borderRadius: 10,
                  background: C.bg, flexShrink: 0,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 30,
                }}>
                  {item.product.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="line-clamp-2" style={{ fontSize: 13, fontWeight: 700, color: C.txt, marginBottom: 3, lineHeight: 1.3 }}>
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
                    SKU: {item.product.sku} · {fmt(item.product.price)} c/u
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Qty controls */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      border: `1px solid ${C.border}`, borderRadius: 8,
                      overflow: "hidden", background: C.bg,
                    }}>
                      <button
                        onClick={() => onUpdate(item.product.id, item.qty - 1)}
                        aria-label="Reducir cantidad"
                        style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Minus size={12} color={C.muted}/>
                      </button>
                      <span style={{ width: 30, textAlign: "center", fontSize: 13, fontWeight: 700, color: C.txt }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdate(item.product.id, item.qty + 1)}
                        aria-label="Aumentar cantidad"
                        style={{ width: 30, height: 30, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Plus size={12} color={C.muted}/>
                      </button>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: 15, color: C.navy }}>
                      {fmt(item.product.price * item.qty)}
                    </div>

                    <button
                      onClick={() => onRemove(item.product.id)}
                      aria-label={`Eliminar ${item.product.name}`}
                      style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, borderRadius: 6 }}
                    >
                      <Trash2 size={15} color={C.red}/>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── FOOTER ───────────────────────────────────────── */}
        {items.length > 0 && (
          <div style={{
            padding: "18px 22px",
            borderTop: `1px solid ${C.border}`,
            background: C.white, flexShrink: 0,
          }}>
            {/* Shipping note */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, marginBottom: 14,
              padding: "10px 13px", background: C.bg,
              borderRadius: 10, border: `1px solid ${C.border}`,
            }}>
              <MapPin size={13} color={C.teal} style={{ flexShrink: 0 }}/>
              {shipping === 0 ? (
                <span style={{ color: C.green, fontWeight: 700 }}>
                  🎉 ¡Envío gratuito incluido en su pedido!
                </span>
              ) : (
                <span style={{ color: C.muted }}>
                  Envío aprox. <strong style={{ color: C.txt }}>{fmt(shipping)}</strong>
                  {" · "}Gratis sobre{" "}
                  <strong style={{ color: C.green }}>RD$10,000</strong>
                </span>
              )}
            </div>

            {/* Totals */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, color: C.muted }}>
                <span>Subtotal ({count} items)</span>
                <span>{fmt(total)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13, color: C.muted }}>
                <span>Envío estimado</span>
                <span style={{ color: shipping === 0 ? C.green : C.txt, fontWeight: 600 }}>
                  {shipping === 0 ? "GRATIS" : fmt(shipping)}
                </span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontSize: 18, fontWeight: 800, color: C.navy,
                borderTop: `2px solid ${C.border}`, paddingTop: 12,
              }}>
                <span>Total</span>
                <span>{fmt(grandTotal)}</span>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={onCheckout}
              style={{
                width: "100%", background: C.navy, color: "#fff",
                border: "none", borderRadius: 12, padding: "13px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginBottom: 10, fontFamily: "inherit",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.navyDk; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.navy; }}
            >
              <CreditCard size={17}/> Proceder al Pago
            </button>

            <button
              onClick={() => onQuote(items)}
              style={{
                width: "100%", background: C.tealLt, color: C.tealDk,
                border: `1.5px solid rgba(13,153,204,0.25)`,
                borderRadius: 12, padding: "12px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "inherit", transition: "background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#C7EBF8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.tealLt; }}
            >
              <FileText size={16}/> Solicitar Cotización Formal
            </button>

            <p style={{ textAlign: "center", fontSize: 11, color: C.muted, marginTop: 10 }}>
              🔒 Datos protegidos · SSL · Respuesta en 2–4h hábiles
            </p>
          </div>
        )}
      </div>
    </>
  );
}
