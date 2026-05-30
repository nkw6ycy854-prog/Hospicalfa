"use client";
import { useCallback, useState } from "react";
import { Toasts } from "@/components/ui/Toast";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { QuoteModal } from "@/components/ui/QuoteModal";
import { CheckoutModal } from "@/components/ui/CheckoutModal";
import { AdminLogin } from "@/components/ui/AdminLogin";
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
import { COLORS as C, type Product, type CartItem } from "@/lib/data";
import { cartCount } from "@/lib/utils";
import { useCart, useDarkMode, useToast, useAdminAuth, useQuoteModal } from "@/lib/store";
import { Phone, Mail, MapPin } from "lucide-react";

type PublicPage = "home" | "catalog" | "product" | "shipping" | "about" | "contact";

export function HospicalfaPlatform() {
  const [page, setPage]                   = useState<PublicPage>("home");
  const [isAdmin, setIsAdmin]             = useState(false);
  const [showLogin, setShowLogin]         = useState(false);
  const [adminSection, setAdminSection]   = useState<AdminSection>("dashboard");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout]   = useState(false);

  const cart    = useCart();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { toasts, addToast } = useToast();
  const { authenticated, login, logout } = useAdminAuth();
  const quote = useQuoteModal();

  const go = useCallback((to: string, data?: Product) => {
    if (to === "admin") {
      if (authenticated) { setIsAdmin(true); setAdminSection("dashboard"); }
      else { setShowLogin(true); }
      return;
    }
    if (to === "product" && data) setSelectedProduct(data);
    setIsAdmin(false);
    setShowLogin(false);
    setPage(to as PublicPage);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [authenticated]);

  const addCart = useCallback((product: Product, qty = 1) => {
    cart.addItem(product, qty);
    addToast(`✓ ${product.name} añadido al carrito`, "success");
  }, [cart, addToast]);

  const handleLogin = useCallback((user: string, pass: string): boolean => {
    const ok = login(user, pass);
    if (ok) {
      setShowLogin(false);
      setIsAdmin(true);
      setAdminSection("dashboard");
      addToast("✅ Acceso concedido — Bienvenido al panel", "success");
    }
    return ok;
  }, [login, addToast]);

  const handleLogout = useCallback(() => {
    logout();
    setIsAdmin(false);
    setPage("home");
    addToast("Sesión cerrada correctamente.", "info");
  }, [logout, addToast]);

  const openQuoteFromProduct = useCallback((product: Product) => {
    const item: CartItem = { product, qty: 1 };
    quote.openQuote([item]);
  }, [quote]);

  const handleCheckout = useCallback(() => {
    if (cart.items.length === 0) return;
    cart.closeCart();
    setShowCheckout(true);
  }, [cart]);

  const handleOrderSuccess = useCallback((orderNum: string) => {
    cart.clearCart();
    setShowCheckout(false);
    addToast(`🎉 Pedido ${orderNum} confirmado con éxito`, "success");
  }, [cart, addToast]);

  const handleQuoteSuccess = useCallback(() => {
    addToast("📋 Cotización enviada. Le contactaremos pronto.", "success");
  }, [addToast]);

  // ── ADMIN LOGIN ────────────────────────────────────────────────────────────
  if (showLogin) {
    return (
      <>
        <Toasts toasts={toasts} />
        <AdminLogin onLogin={handleLogin} onCancel={() => setShowLogin(false)} />
      </>
    );
  }

  // ── ADMIN PANEL ────────────────────────────────────────────────────────────
  if (isAdmin && authenticated) {
    return (
      <>
        <Toasts toasts={toasts} />
        <AdminLayout
          section={adminSection}
          setSection={setAdminSection}
          onHome={() => { setIsAdmin(false); setPage("home"); }}
          onLogout={handleLogout}
        >
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

  // ── PUBLIC SITE ────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", minHeight: "100vh", background: C.bg }}>
      <Toasts toasts={toasts} />

      <CartDrawer
        items={cart.items}
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        onRemove={cart.removeItem}
        onUpdate={cart.updateQty}
        onClear={cart.clearCart}
        onCheckout={handleCheckout}
        onQuote={(items) => { cart.closeCart(); quote.openQuote(items); }}
      />

      <QuoteModal
        isOpen={quote.isOpen}
        items={quote.prefillItems}
        onClose={quote.closeQuote}
        onSuccess={handleQuoteSuccess}
      />

      <CheckoutModal
        isOpen={showCheckout}
        items={cart.items}
        onClose={() => setShowCheckout(false)}
        onSuccess={handleOrderSuccess}
      />

      <Navbar
        page={page}
        cartCount={cartCount(cart.items)}
        dark={dark}
        onNav={go}
        onAdmin={() => go("admin")}
        onCartOpen={cart.openCart}
        onDarkToggle={toggleDark}
      />

      {page === "home"     && <HomePage go={go} addCart={addCart} />}
      {page === "catalog"  && <CatalogPage go={go} addCart={addCart} />}
      {page === "product"  && (
        <ProductDetailPage
          product={selectedProduct}
          go={go}
          addCart={addCart}
          onQuote={openQuoteFromProduct}
        />
      )}
      {page === "shipping" && <ShippingPage />}
      {page === "about"    && <AboutPage />}
      {page === "contact"  && <ContactPage addToast={addToast} />}

      <Footer onNav={go} />
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{ padding: "72px 60px", background: C.bg, minHeight: "70vh" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🏥</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: C.navy, marginBottom: 14 }}>Sobre Hospicalfa Medical</h1>
          <p style={{ color: C.muted, fontSize: 17, lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>
            Empresa dominicana especializada en distribución y venta de insumos y equipamiento médico certificado desde 2010.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 40 }}>
          {[
            { i:"🎯", t:"Nuestra Misión",   d:"Proveer insumos y equipamiento médico de alta calidad a todas las instituciones de salud de la República Dominicana, garantizando productos certificados a precios competitivos." },
            { i:"🌟", t:"Nuestra Visión",   d:"Ser la empresa líder en distribución de insumos médicos en el Caribe, reconocida por excelencia en servicio, calidad y compromiso con la salud dominicana." },
            { i:"⚖️", t:"Nuestros Valores", d:"Integridad, calidad, compromiso y servicio al cliente. Operamos con transparencia y los más altos estándares éticos del sector salud." },
            { i:"📖", t:"Nuestra Historia", d:"Fundada en 2010 en Santiago. Hemos crecido de distribuidora local a empresa con cobertura nacional y más de 500 clientes institucionales activos." },
          ].map((item, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{item.i}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: C.navy, marginBottom: 10 }}>{item.t}</h3>
              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{item.d}</p>
            </div>
          ))}
        </div>
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.tealDk})`, borderRadius: 20, padding: "44px 56px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, color: "#fff" }}>
          {[["15+","Años de experiencia"],["2,000+","Productos disponibles"],["500+","Clientes activos"],["32","Provincias cubiertas"]].map(([v,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactPage({ addToast }: {
  addToast: (msg: string, type?: "success" | "error" | "info" | "warning") => void;
}) {
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [company,setComp]   = useState("");
  const [phone,  setPhone]  = useState("");
  const [msg,    setMsg]    = useState("");
  const [sending,setSend]   = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) { addToast("Complete los campos requeridos.", "error"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { addToast("Email inválido.", "error"); return; }
    setSend(true);
    await new Promise(r => setTimeout(r, 900));
    setSend(false);
    setName(""); setEmail(""); setComp(""); setPhone(""); setMsg("");
    addToast("✅ Mensaje enviado. Le contactaremos en 2–4 horas.", "success");
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: `1px solid ${C.border}`, fontSize: 14,
    color: C.txt, background: C.bg, outline: "none", fontFamily: "inherit",
  };

  return (
    <div style={{ padding: "60px 60px", background: C.bg, minHeight: "70vh" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📞</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, color: C.navy, marginBottom: 12 }}>Contáctenos</h1>
          <p style={{ color: C.muted, fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Estamos listos para atender su solicitud de productos, cotizaciones o consultas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Info */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: C.navy, marginBottom: 26 }}>Información de Contacto</h2>
            {[
              { I: Phone,  t: "Teléfono",  v: "+1 (809) 555-0001"             },
              { I: Mail,   t: "Email",      v: "ventas@hospicalfa.do"           },
              { I: MapPin, t: "Dirección",  v: "Santiago de los Caballeros, RD" },
            ].map(({ I, t, v }, i) => (
              <div key={i} style={{ display: "flex", gap: 16, marginBottom: 26 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: C.tealLt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I size={20} color={C.teal}/>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.txt }}>{v}</div>
                </div>
              </div>
            ))}
            <div style={{ background: C.navyLt, borderRadius: 14, padding: "18px 22px" }}>
              <div style={{ fontSize: 13, color: C.navy, fontWeight: 700, marginBottom: 10 }}>⏰ Horario de Atención</div>
              {[["🟢","Lun–Vie: 8:00 AM – 6:00 PM"],["🟢","Sábado: 8:00 AM – 2:00 PM"],["🔴","Domingo: Cerrado"]].map(([dot,h],i) => (
                <div key={i} style={{ fontSize: 14, color: C.muted, marginBottom: 6 }}>{dot} {h}</div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} noValidate style={{ background: C.white, borderRadius: 20, border: `1px solid ${C.border}`, padding: "34px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 22 }}>Envíenos un Mensaje</h2>
            {[
              { label: "Nombre completo *",      val: name,    set: setName,  type: "text",  ph: "Dr. Juan Martínez"  },
              { label: "Correo electrónico *",   val: email,   set: setEmail, type: "email", ph: "juan@clinica.do"    },
              { label: "Empresa / Institución",  val: company, set: setComp,  type: "text",  ph: "Clínica San Rafael" },
              { label: "Teléfono / WhatsApp",    val: phone,   set: setPhone, type: "tel",   ph: "+1 809 555-0000"    },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>{f.label}</label>
                <input
                  type={f.type} value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  style={inputStyle}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = C.teal; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>Mensaje *</label>
              <textarea
                value={msg} onChange={e => setMsg(e.target.value)}
                placeholder="Describa los productos que necesita o su consulta..."
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.teal; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = C.border; }}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              style={{
                width: "100%", background: sending ? C.muted : C.navy,
                color: "#fff", border: "none", borderRadius: 12,
                padding: "14px", fontSize: 15, fontWeight: 700,
                cursor: sending ? "wait" : "pointer", fontFamily: "inherit",
              }}
            >
              {sending ? "Enviando..." : "📩 Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
