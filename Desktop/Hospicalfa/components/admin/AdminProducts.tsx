"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, X } from "lucide-react";
import { COLORS as C, PRODUCTS, type Product } from "@/lib/data";
import { fmt, stockColor } from "@/lib/utils";

export function AdminProducts() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Todas");
  const [modal, setModal] = useState<Product | null>(null);

  const cats = ["Todas", ...Array.from(new Set(PRODUCTS.map(p => p.cat)))];
  const filtered = PRODUCTS.filter(p =>
    (catFilter === "Todas" || p.cat === catFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
     p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Product view modal */}
      {modal && (
        <>
          <div className="overlay" onClick={() => setModal(null)} />
          <div className="animate-scale-in" style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: C.white, borderRadius: 20,
            border: `1px solid ${C.border}`,
            boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
            width: 520, maxHeight: "80vh", overflowY: "auto",
            zIndex: 300, padding: 32,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 48 }}>{modal.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{modal.cat}</div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>{modal.name}</h2>
                </div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: C.bg, border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} color={C.muted} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {[
                { l: "SKU",    v: modal.sku },
                { l: "Precio", v: fmt(modal.price) },
                { l: "Stock",  v: `${modal.stock} unidades` },
                { l: "Rating", v: `⭐ ${modal.rating} (${modal.reviews} reseñas)` },
              ].map((f, i) => (
                <div key={i} style={{ background: C.bg, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4 }}>{f.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.txt }}>{f.v}</div>
                </div>
              ))}
            </div>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{modal.description}</p>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Especificaciones</h4>
            {modal.specs.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < modal.specs.length - 1 ? `1px solid ${C.border}` : "none", fontSize: 13 }}>
                <span style={{ color: C.muted }}>{s.label}</span>
                <span style={{ fontWeight: 600 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div>
        <div style={{
          padding: "22px 32px", background: C.white,
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>Gestión de Productos</h1>
            <p style={{ fontSize: 13, color: C.muted }}>{filtered.length} de {PRODUCTS.length} productos</p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px",
            borderRadius: 10, border: "none", background: C.navy, color: "#fff",
            fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>
            <Plus size={14} /> Nuevo Producto
          </button>
        </div>

        <div style={{ padding: "24px 32px" }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <div style={{
              flex: 1, background: C.white, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "11px 16px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <Search size={15} color={C.muted} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre o SKU..."
                style={{ border: "none", outline: "none", fontSize: 14, flex: 1, background: "transparent", color: C.txt, fontFamily: "inherit" }}
              />
            </div>
            <select
              value={catFilter} onChange={e => setCatFilter(e.target.value)}
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 16px", fontSize: 14, color: C.txt, cursor: "pointer", outline: "none", fontFamily: "inherit" }}
            >
              {cats.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <table>
              <thead>
                <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                  {["Producto", "Categoría", "SKU", "Precio", "Stock", "Estado", "Acciones"].map(h => (
                    <th key={h} style={{ padding: "11px 18px", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none", transition: "background 0.12s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = C.bg; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "13px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 9, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 }}>
                          {p.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.txt }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: C.muted }}>⭐ {p.rating} · {p.reviews} reseñas</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "13px 18px" }}>
                      <span style={{ background: C.tealLt, color: C.tealDk, padding: "3px 10px", borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
                        {p.cat}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px", fontSize: 12, fontFamily: "monospace", color: C.muted }}>{p.sku}</td>
                    <td style={{ padding: "13px 18px", fontSize: 14, fontWeight: 700, color: C.navy }}>{fmt(p.price)}</td>
                    <td style={{ padding: "13px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: stockColor(p.stock) }} />
                        <span style={{ fontSize: 14, fontWeight: 700, color: stockColor(p.stock) }}>{p.stock}</span>
                      </div>
                    </td>
                    <td style={{ padding: "13px 18px" }}>
                      <span style={{
                        background: p.feat ? "#D1FAE5" : C.bg,
                        color: p.feat ? C.green : C.muted,
                        padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700,
                      }}>
                        {p.feat ? "★ Destacado" : "Regular"}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {[
                          { I: Eye,    bg: C.tealLt,  c: C.tealDk, fn: () => setModal(p) },
                          { I: Edit,   bg: "#EFF6FF",  c: C.navy,   fn: () => {} },
                          { I: Trash2, bg: "#FEF2F2",  c: C.red,    fn: () => {} },
                        ].map(({ I, bg, c: cl, fn }, j) => (
                          <button key={j} onClick={fn} style={{
                            padding: "7px", borderRadius: 7, border: "none",
                            background: bg, cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                          }}>
                            <I size={13} color={cl} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
