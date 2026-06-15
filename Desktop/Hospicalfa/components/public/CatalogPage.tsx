"use client";
import { useState, useMemo } from "react";
import { Search, Grid, List, Download, FileText, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { COLORS as C, PRODUCTS, CATEGORIES, type Product } from "@/lib/data";
import { COMPANY } from "@/lib/config";

interface CatalogPageProps {
  go: (page: string, data?: Product) => void;
  addCart: (p: Product) => void;
}

export function CatalogPage({ go, addCart }: CatalogPageProps) {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("Todas");
  const [sort, setSort]     = useState("name");
  const [view, setView]     = useState<"grid" | "list">("grid");
  const [loading]           = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS
      .filter(p =>
        (cat === "Todas" || p.cat === cat) &&
        (
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase()) ||
          p.cat.toLowerCase().includes(search.toLowerCase())
        )
      )
      .sort((a, b) =>
        sort === "price_asc"   ? a.price - b.price :
        sort === "price_desc"  ? b.price - a.price :
        sort === "rating"      ? b.rating - a.rating :
        a.name.localeCompare(b.name)
      );
  }, [search, cat, sort]);

  return (
    <div style={{ padding: "40px 60px", background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, gap: 20, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: C.navy, marginBottom: 5 }}>
              Catálogo de Productos
            </h1>
            <p style={{ color: C.muted }}>
              {filtered.length} de {PRODUCTS.length} productos
              {cat !== "Todas" && ` en ${cat}`}
              {search && ` para "${search}"`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => window.print()}
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "11px 18px",
                borderRadius: 10, border: `1px solid ${C.border}`, background: C.white,
                fontSize: 13, fontWeight: 700, cursor: "pointer", color: C.navy, fontFamily: "inherit",
              }}
            >
              <Download size={15}/> Descargar Catálogo PDF
            </button>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 7, padding: "11px 18px",
                borderRadius: 10, border: "none", background: "#25D366",
                fontSize: 13, fontWeight: 700, cursor: "pointer", color: "#fff",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15}/> Cotizar por WhatsApp
            </a>
          </div>
        </div>

        {/* Search + controls row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{
            flex: 1, background: C.white,
            border: `1px solid ${C.border}`, borderRadius: 12,
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <Search size={16} color={C.muted} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre, SKU o categoría..."
              style={{
                border: "none", outline: "none",
                fontSize: 14, flex: 1,
                background: "transparent", color: C.txt,
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "none", border: "none",
                  cursor: "pointer", color: C.muted, fontSize: 18,
                }}
              >
                ×
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "12px 16px",
              fontSize: 14, color: C.txt, cursor: "pointer",
              outline: "none", fontFamily: "inherit",
            }}
          >
            <option value="name">A–Z</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
          </select>

          {/* View toggle */}
          <div style={{
            display: "flex", background: C.white,
            border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden",
          }}>
            {([["grid", Grid], ["list", List]] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  width: 44, height: 44, border: "none",
                  background: view === v ? C.navy : "transparent",
                  color: view === v ? "#fff" : C.muted,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Category pills */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                borderRadius: 20, padding: "7px 18px",
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s", fontFamily: "inherit",
                background: cat === c ? C.navy : C.white,
                color:       cat === c ? "#fff" : C.txt,
                border:      cat === c ? `1px solid ${C.navy}` : `1px solid ${C.border}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={prod => go("product", prod)}
                  onAdd={addCart}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map(p => (
                <div
                  key={p.id}
                  style={{
                    background: C.white, borderRadius: 14,
                    border: `1px solid ${C.border}`,
                    padding: "18px 22px",
                    display: "flex", gap: 20, alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.teal; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; }}
                >
                  <div style={{
                    width: 70, height: 70, borderRadius: 12,
                    background: C.bg, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40,
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{p.cat}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.txt, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>SKU: {p.sku} · ⭐ {p.rating} · {p.stock} uds disponibles</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginRight: 12 }}>
                    RD${p.price.toLocaleString()}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => go("product", p)}
                      style={{
                        padding: "9px 16px", borderRadius: 9,
                        border: `1px solid ${C.border}`, background: C.white,
                        fontSize: 13, fontWeight: 600, cursor: "pointer",
                        color: C.txt, fontFamily: "inherit",
                      }}
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => addCart(p)}
                      style={{
                        padding: "9px 18px", borderRadius: 9,
                        border: "none", background: C.navy,
                        color: "#fff", fontSize: 13, fontWeight: 700,
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      + Añadir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty state */
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 72, marginBottom: 18 }}>🔍</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
              No se encontraron productos
            </h3>
            <p style={{ color: C.muted, marginBottom: 24, fontSize: 15 }}>
              Intente con otros términos o limpie los filtros
            </p>
            <button
              onClick={() => { setSearch(""); setCat("Todas"); }}
              style={{
                background: C.navy, color: "#fff", border: "none",
                borderRadius: 10, padding: "11px 24px",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
