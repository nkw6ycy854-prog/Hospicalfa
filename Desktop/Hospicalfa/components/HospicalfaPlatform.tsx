"use client";
import { useCallback } from "react";
import { Toasts } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { HomePage } from "@/components/public/HomePage";
import { CatalogPage } from "@/components/public/CatalogPage";
import { ProductDetailPage } from "@/components/public/ProductDetailPage";
import { ShippingPage } from "@/components/public/ShippingPage";
import { AdminLayout, type AdminSection } from "@/components/admin/AdminLayout";
import { Dashboard } from "@/components/admin/Dashboard";
import { AdminProducts } from "@/components/admin/AdminProducts";
import {
  AdminOrders, AdminInventory, AdminFinance,
  AdminCustomers, AdminSettings,
} from "@/components/admin/AdminModules";
import { COLORS as C, type Product } from "@/lib/data";
import { cartCount } from "@/lib/utils";
import { useCart, useDarkMode, useToast } from "@/lib/store";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

type PublicPage = "home" | "catalog" | "product" | "shipping" | "about" | "contact";

export function HospicalfaPlatform() {
  const [page, setPage]         = useState<PublicPage>("home");
  const [isAdmin, setIsAdmin]   = useState(false);
  const [adminSection, setAdminSection] = useState<AdminSection>("dashboard");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cart      = useCart();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { toasts, addToast } = useToast();

  // Scroll to top on page change
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, isAdmin]);

  const go = useCallback((to: string, data?: Product) => {
    if (to === "admin") { setIsAdmin(true); setAdminSection("dashboard"); return; }
    if (to === "product" && data) setSelectedProduct(data);
    setIsAdmin(false);
    setPage(to as PublicPage);
  }, []);

  const addCart = useCallback((product: Product, qty = 1) => {
    cart.addItem(product, qty);
    addToast(`✓ ${product.name} añadido al carrito`, "success");
  }, [cart, addToast]);

  const goAdmin  = useCallback(() => { setIsAdmin(true); setAdminSection("dashboard"); }, []);
  const exitAdmin = useCallback(() => { setIsAdmin(false); setPage("home"); }, []);

  // ── ADMIN ─────────────────────────────────────────────────────────────────
  if (isAdmin) {
    return (
      <>
        <Toasts toasts={toasts} />
        <AdminLayout section={adminSection} setSection={setAdminSection} onHome={exitAdmin}>
          {adminSection === "dashboard"  && <Dashboard />}
          {adminSection === "products"   && <AdminProducts />}
          {adminSection === "orders"     && <AdminOrders />}
          {adminSection === "inventory"  && <AdminInventory />}
          {adminSection === "customers"  && <AdminCustomers />}
          {adminSection === "finance"    && <AdminFinance />}
          {adminSection === "settings"   && <AdminSettings />}
        </AdminLayout>
      </>
    );
  }

  // ── PUBLIC ────────────────────────────────────────────────────────────────
  return (
    <div style={{
      fontFamily: "var(--font-outfit), system-ui, sans-serif",
      minHeight: "100vh", background: C.bg,
    }}>
      <Toasts toasts={toasts} />

      <CartDrawer
        items={cart.items}
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        onRemove={cart.removeItem}
        onUpdate={cart.updateQty}
        onClear={cart.clearCart}
      />

      <Navbar
        page={page}
        cartCount={cartCount(cart.items)}
        dark={dark}
        onNav={go}
        onAdmin={goAdmin}
        onCartOpen={cart.openCart}
        onDarkToggle={toggleDark}
      />

      {/* ── PAGES ────────────────────────────────────────── */}
      {page === "home"    && <HomePage go={go} addCart={addCart} />}
      {page === "catalog" && <CatalogPage go={go} addCart={addCart} />}
      {page === "product" && <ProductDetailPage product={selectedProduct} go={go} addCart={addCart} />}
      {page === "shipping"&& <ShippingPage />}

      {/* ABOUT */}
      {page === "about" && (
        <div style={{ padding: "72px 60px", background: C.bg, minHeight: "70vh" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div style={{ fontSize: 72, marginBottom: 20 }}>🏥</div>
              <h1 style={{ fontSize: 44, fontWeight: 800, color: C.navy, marginBottom: 14 }}>
                Sobre Hospicalfa Medical
              </h1>
              <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.75, maxWidth: 580, margin: "0 auto" }}>
                Empresa dominicana especializada en distribución y venta de insumos y equipamiento
                médico certificado desde 2010, con presencia en todas las provincias del país.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
              {[
                { t: "Nuestra Misión",   i: "🎯", d: "Proveer insumos y equipamiento médico de alta calidad a todas las instituciones de salud de la República Dominicana, garantizando productos certificados a precios competitivos y con servicio de excelencia." },
                { t: "Nuestra Visión",   i: "🌟", d: "Ser la empresa líder en distribución de insumos médicos en el Caribe, reconocida por su excelencia en servicio, calidad de productos y compromiso con la salud de los dominicanos." },
                { t: "Nuestros Valores", i: "⚖️", d: "Integridad, calidad, compromiso y servicio al cliente. Operamos con transparencia y nos guiamos por los más altos estándares éticos del sector salud." },
                { t: "Nuestra Historia", i: "📖", d: "Fundada en 2010 en Santiago de los Caballeros, hemos crecido de una pequeña distribuidora local a una empresa con cobertura nacional y más de 500 clientes institucionales activos." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: C.white, borderRadius: 16, border: `1px solid ${C.border}`,
                  padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{item.i}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{item.t}</h3>
                  <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{item.d}</p>
                </div>
              ))}
            </div>
            <div style={{
              background: `linear-gradient(135deg,${C.navy},${C.tealDk})`,
              borderRadius: 20, padding: "44px 56px",
              display: "grid", gridTemplateColumns: "repeat(4,1fr)",
              gap: 24, color: "#fff",
            }}>
              {[["15+","Años de experiencia"],["2,000+","Productos"],["500+","Clientes"],["32","Provincias"]].map(([v,l],i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ padding: "60px 60px", background: C.bg, minHeight: "70vh" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📞</div>
              <h1 style={{ fontSize: 44, fontWeight: 800, color: C.navy, marginBottom: 12 }}>Contáctenos</h1>
              <p style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
                Estamos listos para atender su solicitud de productos, cotizaciones o consultas.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 24 }}>
                  Información de Contacto
                </h2>
                {[
                  { I: Phone,  t: "Teléfono",  v: "+1 (809) 555-0001"           },
                  { I: Mail,   t: "Email",      v: "ventas@hospicalfa.do"         },
                  { I: MapPin, t: "Dirección",  v: "Santiago de los Caballeros, RD" },
                ].map(({ I, t, v }, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: 26 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 12, background: C.tealLt,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <I size={20} color={C.teal} />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.txt }}>{v}</div>
                    </div>
                  </div>
                ))}
                <div style={{ background: C.navyLt, borderRadius: 14, padding: "18px 22px", marginTop: 8 }}>
                  <div style={{ fontSize: 13, color: C.navy, fontWeight: 700, marginBottom: 10 }}>⏰ Horario de Atención</div>
                  {[
                    "Lunes a Viernes: 8:00 AM – 6:00 PM",
                    "Sábado: 8:00 AM – 2:00 PM",
                    "Domingo: Cerrado",
                  ].map((h, i) => (
                    <div key={i} style={{ fontSize: 14, color: C.muted, marginBottom: 5 }}>
                      {i < 2 ? "🟢" : "🔴"} {h}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, padding: "34px" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 24 }}>
                  Envíenos un Mensaje
                </h2>
                {[
                  { id: "name",    label: "Nombre completo",        type: "text",  placeholder: "Dr. Juan Martínez"    },
                  { id: "email",   label: "Correo electrónico",     type: "email", placeholder: "juan@clinica.do"       },
                  { id: "company", label: "Empresa / Institución",  type: "text",  placeholder: "Clínica San Rafael"   },
                  { id: "phone",   label: "Teléfono",               type: "tel",   placeholder: "+1 809 555-0000"       },
                ].map(f => (
                  <div key={f.id} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", padding: "11px 14px", borderRadius: 10,
                        border: `1px solid ${C.border}`, fontSize: 14,
                        color: C.txt, background: C.bg, outline: "none", fontFamily: "inherit",
                      }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = C.teal; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>
                    Mensaje / Productos que necesita
                  </label>
                  <textarea
                    placeholder="Describa los productos que necesita o su consulta..."
                    rows={4}
                    style={{
                      width: "100%", padding: "11px 14px", borderRadius: 10,
                      border: `1px solid ${C.border}`, fontSize: 14, color: C.txt,
                      background: C.bg, outline: "none", fontFamily: "inherit", resize: "vertical",
                    }}
                    onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.teal; }}
                    onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.border; }}
                  />
                </div>
                <button
                  onClick={() => addToast("✅ Mensaje enviado. Le contactaremos pronto.", "success")}
                  style={{
                    width: "100%", background: C.navy, color: "#fff", border: "none",
                    borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.navyDk; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.navy; }}
                >
                  📩 Enviar Mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onNav={go} />
    </div>
  );
}
