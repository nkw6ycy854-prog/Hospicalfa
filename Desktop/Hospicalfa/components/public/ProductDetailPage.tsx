"use client";
import { useState } from "react";
import {
  ChevronRight, Star, CheckCircle, AlertTriangle,
  ShoppingCart, FileText, Share2, Heart, Package,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { COLORS as C, PRODUCTS, type Product } from "@/lib/data";
import { fmt } from "@/lib/utils";

interface ProductDetailPageProps {
  product: Product | null;
  go: (page: string, data?: Product) => void;
  addCart: (p: Product, qty?: number) => void;
  onQuote: (p: Product) => void;
}

export function ProductDetailPage({ product, go, addCart, onQuote }: ProductDetailPageProps) {
  const [qty, setQty]           = useState(1);
  const [tab, setTab]           = useState<"desc" | "specs">("desc");
  const [wishlist, setWishlist] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "80px 60px", background: C.bg, minHeight: "60vh" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}><Package size={64} color={C.muted}/></div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
          Producto no encontrado
        </h2>
        <p style={{ color: C.muted, marginBottom: 24 }}>
          El producto que busca no existe o fue eliminado.
        </p>
        <button
          onClick={() => go("catalog")}
          style={{
            background: C.navy, color: "#fff", border: "none",
            borderRadius: 10, padding: "12px 24px",
            fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          ← Ver Catálogo
        </button>
      </div>
    );
  }

  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);
  const images  = [product.icon, product.icon, product.icon]; // In production: real URLs

  return (
    <div style={{ padding: "40px 60px", background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" style={{
          display: "flex", gap: 8, alignItems: "center",
          marginBottom: 28, fontSize: 13, color: C.muted, flexWrap: "wrap",
        }}>
          <span onClick={() => go("home")}    style={{ cursor: "pointer", color: C.teal, fontWeight: 500 }}>Inicio</span>
          <ChevronRight size={14}/>
          <span onClick={() => go("catalog")} style={{ cursor: "pointer", color: C.teal, fontWeight: 500 }}>Catálogo</span>
          <ChevronRight size={14}/>
          <span style={{ color: C.muted }}>{product.cat}</span>
          <ChevronRight size={14}/>
          <span style={{ color: C.txt, fontWeight: 500 }}>{product.name}</span>
        </nav>

        {/* MAIN CARD */}
        <div style={{
          background: C.white, borderRadius: 20,
          border: `1px solid ${C.border}`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          padding: "44px", marginBottom: 32,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52,
        }}>

          {/* LEFT — Gallery */}
          <div>
            {/* Main image */}
            <div style={{
              background: C.bg, borderRadius: 18, height: 340,
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 120,
              marginBottom: 14, border: `1px solid ${C.border}`,
              transition: "transform 0.3s",
            }}>
              {images[activeImg]}
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 10 }}>
              {images.map((img, j) => (
                <button
                  key={j}
                  onClick={() => setActiveImg(j)}
                  style={{
                    flex: 1, height: 72, background: C.bg,
                    borderRadius: 10,
                    border: `2px solid ${activeImg === j ? C.teal : C.border}`,
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 30,
                    cursor: "pointer", transition: "border-color 0.15s",
                  }}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div>
            {/* Category + SKU */}
            <div style={{
              fontSize: 11, color: C.teal, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>{product.cat}</span>
              <span style={{ color: C.muted, fontFamily: "monospace", fontSize: 12 }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 style={{ fontSize: 28, fontWeight: 800, color: C.navy, marginBottom: 14, lineHeight: 1.25 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1,2,3,4,5].map(j => (
                  <Star key={j} size={15}
                    fill={j <= Math.floor(product.rating) ? "#F59E0B" : "none"}
                    color="#F59E0B"
                  />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.txt }}>{product.rating}/5</span>
              <span style={{ color: C.muted, fontSize: 13 }}>({product.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div style={{
              background: C.navyLt, borderRadius: 14,
              padding: "18px 20px", marginBottom: 18,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Precio unitario</div>
                <div style={{ fontSize: 40, fontWeight: 900, color: C.navy, lineHeight: 1 }}>
                  {fmt(product.price)}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>+ ITBIS según aplique</div>
              </div>
              {qty > 1 && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Total ({qty} uds)</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.teal }}>
                    {fmt(product.price * qty)}
                  </div>
                </div>
              )}
            </div>

            {/* Stock badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 22,
              padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              background: product.stock > 50 ? C.greenLt : product.stock > 0 ? "#FEF3C7" : "#FEE2E2",
              color: product.stock > 50 ? "#065F46" : product.stock > 0 ? "#92400E" : C.red,
            }}>
              {product.stock > 50
                ? <><CheckCircle size={15}/> En stock — {product.stock} unidades</>
                : product.stock > 0
                  ? <><AlertTriangle size={15}/> Solo {product.stock} unidades disponibles</>
                  : <><AlertTriangle size={15}/> Agotado — Consultar disponibilidad</>
              }
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 0 }}>
                {(["desc", "specs"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      padding: "9px 18px", border: "none",
                      background: "transparent", fontSize: 13, fontWeight: 600,
                      color: tab === t ? C.navy : C.muted,
                      borderBottom: tab === t ? `2.5px solid ${C.navy}` : "2.5px solid transparent",
                      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                    }}
                  >
                    {t === "desc" ? "Descripción" : "Especificaciones"}
                  </button>
                ))}
              </div>
            </div>

            {tab === "desc" ? (
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 22 }}>
                {product.description}
              </p>
            ) : (
              <div style={{ marginBottom: 22 }}>
                {product.specs.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "9px 0",
                    borderBottom: i < product.specs.length - 1 ? `1px solid ${C.border}` : "none",
                    fontSize: 13,
                  }}>
                    <span style={{ color: C.muted, flex: 1 }}>{s.label}</span>
                    <span style={{ fontWeight: 600, color: C.txt }}>{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
              {/* Qty */}
              <div style={{
                display: "flex", alignItems: "center",
                border: `1.5px solid ${C.border}`, borderRadius: 10,
                overflow: "hidden", flexShrink: 0, background: C.bg,
              }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Reducir"
                  style={{ width: 40, height: 46, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: C.muted }}
                >−</button>
                <div style={{ width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: C.txt }}>
                  {qty}
                </div>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  aria-label="Aumentar"
                  style={{ width: 40, height: 46, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: C.muted }}
                >+</button>
              </div>

              {/* Add to cart */}
              <button
                onClick={() => addCart(product, qty)}
                disabled={product.stock === 0}
                style={{
                  flex: 1, background: product.stock === 0 ? C.muted : C.navy,
                  color: "#fff", border: "none", borderRadius: 10,
                  padding: "13px", fontSize: 14, fontWeight: 700,
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8, fontFamily: "inherit",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => {
                  if (product.stock > 0)
                    (e.currentTarget as HTMLButtonElement).style.background = C.navyDk;
                }}
                onMouseLeave={e => {
                  if (product.stock > 0)
                    (e.currentTarget as HTMLButtonElement).style.background = C.navy;
                }}
              >
                <ShoppingCart size={17}/>
                {product.stock === 0 ? "Sin stock" : "Agregar al Carrito"}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(w => !w)}
                title={wishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
                style={{
                  width: 46, height: 46, borderRadius: 10,
                  border: `1.5px solid ${wishlist ? C.red : C.border}`,
                  background: wishlist ? "#FEF2F2" : C.white,
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                <Heart size={18} fill={wishlist ? C.red : "none"} color={wishlist ? C.red : C.muted}/>
              </button>
            </div>

            {/* Quote button — fully functional */}
            <button
              onClick={() => onQuote(product)}
              style={{
                width: "100%", background: C.tealLt, color: C.tealDk,
                border: `1.5px solid rgba(13,153,204,0.3)`,
                borderRadius: 10, padding: "12px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, fontFamily: "inherit",
                marginBottom: 12, transition: "background 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#C7EBF8"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.tealLt; }}
            >
              <FileText size={16}/> Solicitar Cotización Formal
            </button>

            {/* Share */}
            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              style={{
                width: "100%", background: "transparent",
                color: C.muted, border: "none", padding: "8px",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 6, fontFamily: "inherit",
              }}
            >
              <Share2 size={14}/> Compartir producto
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {related.length > 0 && (
          <div>
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
          </div>
        )}
      </div>
    </div>
  );
}
