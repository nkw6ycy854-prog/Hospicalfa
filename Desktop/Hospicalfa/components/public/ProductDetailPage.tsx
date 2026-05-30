"use client";
import { useState } from "react";
import {
  ChevronRight, Star, CheckCircle, AlertTriangle,
  ShoppingCart, FileText, Share2, Heart,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, type Product } from "@/lib/data";
import { fmt } from "@/lib/utils";

interface ProductDetailPageProps {
  product: Product | null;
  go: (page: string, data?: Product) => void;
  addCart: (p: Product, qty?: number) => void;
}

export function ProductDetailPage({ product, go, addCart }: ProductDetailPageProps) {
  const [qty, setQty]           = useState(1);
  const [tab, setTab]           = useState<"desc" | "specs">("desc");
  const [wishlist, setWishlist] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 60px" }}>
        <p style={{ color: C.muted }}>Producto no encontrado.</p>
        <button onClick={() => go("catalog")} style={{
          marginTop: 16, background: C.navy, color: "#fff",
          border: "none", borderRadius: 10, padding: "10px 20px",
          fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Ir al catálogo
        </button>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  return (
    <div style={{ padding: "40px 60px", background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* BREADCRUMB */}
        <div style={{
          display: "flex", gap: 8, alignItems: "center",
          marginBottom: 28, fontSize: 13, color: C.muted,
        }}>
          <span onClick={() => go("home")}    style={{ cursor: "pointer", color: C.teal, fontWeight: 500 }}>Inicio</span>
          <ChevronRight size={14} />
          <span onClick={() => go("catalog")} style={{ cursor: "pointer", color: C.teal, fontWeight: 500 }}>Catálogo</span>
          <ChevronRight size={14} />
          <span style={{ color: C.muted }}>{product.cat}</span>
          <ChevronRight size={14} />
          <span style={{ color: C.txt, fontWeight: 500 }}>{product.name}</span>
        </div>

        {/* MAIN CARD */}
        <div style={{
          background: C.white, borderRadius: 20,
          border: `1px solid ${C.border}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          padding: "44px", marginBottom: 28,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
        }}>
          {/* LEFT — Image */}
          <div>
            <div style={{
              background: C.bg, borderRadius: 18, height: 360,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 120,
              marginBottom: 16,
            }}>
              {product.icon}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[1,2,3].map(j => (
                <div key={j} style={{
                  flex: 1, height: 72, background: C.bg,
                  borderRadius: 10, border: `2px solid ${j===1 ? C.teal : C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, cursor: "pointer",
                }}>
                  {product.icon}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            <div style={{
              fontSize: 11, color: C.teal, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8,
            }}>
              {product.cat} · SKU: {product.sku}
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, color: C.navy, marginBottom: 14, lineHeight: 1.25 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(j => <Star key={j} size={15} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{product.rating}/5</span>
              <span style={{ color: C.muted, fontSize: 13 }}>({product.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div style={{ fontSize: 40, fontWeight: 900, color: C.navy, marginBottom: 6, lineHeight: 1 }}>
              {fmt(product.price)}
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 18 }}>
              Precio sin incluir ITBIS
            </div>

            {/* Stock */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 24,
              fontSize: 14, fontWeight: 600,
              color: product.stock > 50 ? C.green : product.stock > 0 ? C.amber : C.red,
            }}>
              {product.stock > 50
                ? <><CheckCircle size={16} /> En stock — {product.stock} unidades disponibles</>
                : product.stock > 0
                  ? <><AlertTriangle size={16} /> Pocas unidades — solo {product.stock} disponibles</>
                  : <><AlertTriangle size={16} /> Agotado</>
              }
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 2, marginBottom: 18, borderBottom: `1px solid ${C.border}` }}>
              {(["desc", "specs"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "8px 16px", border: "none",
                    background: "transparent", fontSize: 13, fontWeight: 600,
                    color: tab === t ? C.navy : C.muted,
                    borderBottom: tab === t ? `2px solid ${C.navy}` : "2px solid transparent",
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {t === "desc" ? "Descripción" : "Especificaciones"}
                </button>
              ))}
            </div>

            {tab === "desc" ? (
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
                {product.description}
              </p>
            ) : (
              <div style={{ marginBottom: 24 }}>
                {product.specs.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: i < product.specs.length-1 ? `1px solid ${C.border}` : "none",
                    fontSize: 13,
                  }}>
                    <span style={{ color: C.muted }}>{s.label}</span>
                    <span style={{ fontWeight: 600, color: C.txt }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Qty + Add */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{
                display: "flex", alignItems: "center",
                border: `1px solid ${C.border}`, borderRadius: 10,
                overflow: "hidden", flexShrink: 0,
              }}>
                <button onClick={() => setQty(Math.max(1, qty-1))} style={{ width: 40, height: 46, border: "none", background: C.bg, cursor: "pointer", fontSize: 18 }}>−</button>
                <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700 }}>{qty}</div>
                <button onClick={() => setQty(qty+1)}             style={{ width: 40, height: 46, border: "none", background: C.bg, cursor: "pointer", fontSize: 18 }}>+</button>
              </div>

              <button
                onClick={() => addCart(product, qty)}
                disabled={product.stock === 0}
                style={{
                  flex: 1, background: product.stock === 0 ? C.muted : C.navy,
                  color: "#fff", border: "none", borderRadius: 10,
                  padding: "12px", fontSize: 14, fontWeight: 700,
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontFamily: "inherit",
                }}
              >
                <ShoppingCart size={16} />
                {product.stock === 0 ? "Sin stock" : "Agregar al Carrito"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(w => !w)}
                style={{
                  width: 46, height: 46, borderRadius: 10,
                  border: `1px solid ${wishlist ? C.red : C.border}`,
                  background: wishlist ? "#FEF2F2" : C.white,
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >
                <Heart size={18} fill={wishlist ? C.red : "none"} color={wishlist ? C.red : C.muted} />
              </button>
            </div>

            {/* Quote button */}
            <button style={{
              width: "100%", background: C.tealLt, color: C.tealDk,
              border: "none", borderRadius: 10, padding: "12px",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "inherit",
            }}>
              <FileText size={16} /> Solicitar Cotización Formal
            </button>

            {/* Share */}
            <button
              onClick={() => { if (navigator.share) navigator.share({ title: product.name, url: window.location.href }); }}
              style={{
                width: "100%", background: "transparent", color: C.muted,
                border: "none", marginTop: 10, padding: "8px",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                fontFamily: "inherit",
              }}
            >
              <Share2 size={14} /> Compartir producto
            </button>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: C.navy, marginBottom: 22 }}>
              Productos Relacionados
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {related.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={prod => go("product", prod)}
                  onAdd={addCart}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
