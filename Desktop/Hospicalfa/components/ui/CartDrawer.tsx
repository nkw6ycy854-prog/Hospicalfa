"use client";
import { X, ShoppingCart, Trash2, Plus, Minus, MapPin, CreditCard } from "lucide-react";
import { type CartItem } from "@/lib/data";
import { fmt, cartTotal } from "@/lib/utils";
import { COLORS as C } from "@/lib/data";

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, qty: number) => void;
  onClear: () => void;
}

export function CartDrawer({
  items, isOpen, onClose, onRemove, onUpdate, onClear,
}: CartDrawerProps) {
  const total = cartTotal(items);
  const shipping = total >= 10000 ? 0 : 350;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="animate-slide-in"
        style={{
          position: "fixed", right: 0, top: 0, bottom: 0,
          width: 420, maxWidth: "100vw",
          background: C.white,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.18)",
          zIndex: 300,
          display: "flex", flexDirection: "column",
          overflowY: "hidden",
        }}
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: C.white,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart size={20} color={C.navy} />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>Carrito</h2>
            {items.length > 0 && (
              <span style={{
                background: C.teal, color: "#fff",
                borderRadius: 20, padding: "2px 8px",
                fontSize: 12, fontWeight: 700,
              }}>
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {items.length > 0 && (
              <button
                onClick={onClear}
                style={{
                  fontSize: 12, color: C.red, fontWeight: 600,
                  background: "transparent", border: "none", cursor: "pointer",
                }}
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: C.bg, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={17} color={C.muted} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <p style={{ fontWeight: 700, color: C.navy, fontSize: 17, marginBottom: 8 }}>
                Su carrito está vacío
              </p>
              <p style={{ color: C.muted, fontSize: 14 }}>
                Explore nuestro catálogo y añada productos
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.product.id} style={{
                display: "flex", gap: 14, paddingBottom: 16, marginBottom: 16,
                borderBottom: `1px solid ${C.border}`,
              }}>
                {/* Icon */}
                <div style={{
                  width: 60, height: 60, borderRadius: 10,
                  background: C.bg, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 30, flexShrink: 0,
                }}>
                  {item.product.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: C.txt,
                    marginBottom: 4, lineHeight: 1.3,
                  }} className="line-clamp-2">
                    {item.product.name}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>
                    SKU: {item.product.sku}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/* Qty controls */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden",
                    }}>
                      <button
                        onClick={() => onUpdate(item.product.id, item.qty - 1)}
                        style={{ width: 28, height: 28, border: "none", background: C.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ width: 28, textAlign: "center", fontSize: 13, fontWeight: 700 }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdate(item.product.id, item.qty + 1)}
                        style={{ width: 28, height: 28, border: "none", background: C.bg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: 15, fontWeight: 800, color: C.navy }}>
                      {fmt(item.product.price * item.qty)}
                    </div>

                    <button
                      onClick={() => onRemove(item.product.id)}
                      style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
                    >
                      <Trash2 size={15} color={C.red} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: "20px 24px",
            borderTop: `1px solid ${C.border}`,
            background: C.white,
            flexShrink: 0,
          }}>
            {/* Shipping note */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, color: C.muted, marginBottom: 14,
              padding: "10px 14px", background: C.bg, borderRadius: 10,
            }}>
              <MapPin size={14} color={C.teal} />
              {shipping === 0
                ? <span style={{ color: C.green, fontWeight: 700 }}>🎉 ¡Envío gratis incluido!</span>
                : <span>Envío estándar: <strong style={{ color: C.txt }}>{fmt(shipping)}</strong> — Gratis sobre RD$10,000</span>
              }
            </div>

            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: C.muted }}>
              <span>Subtotal</span>
              <span>{fmt(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 14, color: C.muted }}>
              <span>Envío</span>
              <span style={{ color: shipping === 0 ? C.green : C.txt, fontWeight: 600 }}>
                {shipping === 0 ? "GRATIS" : fmt(shipping)}
              </span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 18, fontWeight: 800, color: C.navy,
              borderTop: `1px solid ${C.border}`, paddingTop: 14, marginBottom: 16,
            }}>
              <span>Total</span>
              <span>{fmt(total + shipping)}</span>
            </div>

            <button style={{
              width: "100%", background: C.navy, color: "#fff",
              border: "none", borderRadius: 12, padding: "14px",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 10,
            }}>
              <CreditCard size={18} /> Proceder al Pago
            </button>
            <button style={{
              width: "100%", background: C.tealLt, color: C.tealDk,
              border: "none", borderRadius: 12, padding: "12px",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>
              Solicitar Cotización
            </button>
          </div>
        )}
      </div>
    </>
  );
}
