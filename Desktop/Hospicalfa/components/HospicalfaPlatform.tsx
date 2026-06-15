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
import { BlogPage } from "@/components/public/BlogPage";
import { ContactPage } from "@/components/public/ContactPage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { AdminLayout, type AdminSection } from "@/components/admin/AdminLayout";
import { Dashboard }      from "@/components/admin/Dashboard";
import { AdminProducts }  from "@/components/admin/AdminProducts";
import { AdminOrders }    from "@/components/admin/AdminOrders";
import { AdminInventory } from "@/components/admin/AdminInventory";
import { AdminCustomers } from "@/components/admin/AdminCustomers";
import { AdminFinance }   from "@/components/admin/AdminFinance";
import { AdminShipping }  from "@/components/admin/AdminShipping";
import { AdminUsers }     from "@/components/admin/AdminUsers";
import { AdminWebsite }   from "@/components/admin/AdminWebsite";
import { AdminSettings }  from "@/components/admin/AdminSettings";
import { AdminProvider }  from "@/lib/adminStore";
import { COLORS as C, type Product, type CartItem } from "@/lib/data";
import { cartCount } from "@/lib/utils";
import { COMPANY } from "@/lib/config";
import { useCart, useDarkMode, useToast, useAdminAuth, useQuoteModal } from "@/lib/store";
import { Phone, Mail, MapPin } from "lucide-react";

type PublicPage = "home"|"catalog"|"product"|"shipping"|"about"|"blog"|"contact";

// Wrap the entire app in AdminProvider so all admin modules share state
export function HospicalfaPlatform() {
  return (
    <AdminProvider>
      <PlatformInner/>
    </AdminProvider>
  );
}

function PlatformInner() {
  const [page,        setPage]        = useState<PublicPage>("home");
  const [isAdmin,     setIsAdmin]     = useState(false);
  const [showLogin,   setShowLogin]   = useState(false);
  const [adminSection,setAdminSection]= useState<AdminSection>("dashboard");
  const [selProduct,  setSelProduct]  = useState<Product|null>(null);
  const [showCheckout,setShowCheckout]= useState(false);

  const cart  = useCart();
  const { dark, toggle: toggleDark } = useDarkMode();
  const { toasts, addToast }         = useToast();
  const { authenticated, login, logout } = useAdminAuth();
  const quote = useQuoteModal();

  const go = useCallback((to: string, data?: Product) => {
    if (to==="admin") {
      if (authenticated) { setIsAdmin(true); setAdminSection("dashboard"); }
      else { setShowLogin(true); }
      return;
    }
    if (to==="product"&&data) setSelProduct(data);
    setIsAdmin(false); setShowLogin(false);
    setPage(to as PublicPage);
    if (typeof window!=="undefined") window.scrollTo({top:0,behavior:"smooth"});
  }, [authenticated]);

  const addCart = useCallback((product: Product, qty=1) => {
    cart.addItem(product, qty);
    addToast(`✓ ${product.name} añadido al carrito`, "success");
  }, [cart, addToast]);

  const handleLogin = useCallback((user: string, pass: string): boolean => {
    const ok = login(user, pass);
    if (ok) {
      setShowLogin(false); setIsAdmin(true); setAdminSection("dashboard");
      addToast("✅ Acceso concedido — Bienvenido al panel", "success");
    }
    return ok;
  }, [login, addToast]);

  const handleLogout = useCallback(() => {
    logout(); setIsAdmin(false); setPage("home");
    addToast("Sesión cerrada correctamente.", "info");
  }, [logout, addToast]);

  const handleCheckout = useCallback(() => {
    if (cart.items.length===0) return;
    cart.closeCart(); setShowCheckout(true);
  }, [cart]);

  const handleOrderSuccess = useCallback((orderNum: string) => {
    cart.clearCart(); setShowCheckout(false);
    addToast(`🎉 Pedido ${orderNum} confirmado con éxito`, "success");
  }, [cart, addToast]);

  // ── ADMIN LOGIN ────────────────────────────────────────────────────────────
  if (showLogin) {
    return (
      <>
        <Toasts toasts={toasts}/>
        <AdminLogin onLogin={handleLogin} onCancel={()=>setShowLogin(false)}/>
      </>
    );
  }

  // ── ADMIN PANEL (protected) ───────────────────────────────────────────────
  if (isAdmin && authenticated) {
    return (
      <>
        <Toasts toasts={toasts}/>
        <AdminLayout
          section={adminSection}
          setSection={setAdminSection}
          onHome={()=>{ setIsAdmin(false); setPage("home"); }}
          onLogout={handleLogout}
        >
          {adminSection==="dashboard"  && <Dashboard/>}
          {adminSection==="orders"     && <AdminOrders/>}
          {adminSection==="products"   && <AdminProducts/>}
          {adminSection==="inventory"  && <AdminInventory/>}
          {adminSection==="customers"  && <AdminCustomers/>}
          {adminSection==="finance"    && <AdminFinance/>}
          {adminSection==="shipping"   && <AdminShipping/>}
          {adminSection==="users"      && <AdminUsers/>}
          {adminSection==="website"    && <AdminWebsite/>}
          {adminSection==="settings"   && <AdminSettings/>}
        </AdminLayout>
      </>
    );
  }

  // ── PUBLIC SITE ────────────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"var(--font-outfit),system-ui,sans-serif",minHeight:"100vh",background:C.bg}}>
      <Toasts toasts={toasts}/>

      <CartDrawer
        items={cart.items}     isOpen={cart.isOpen}
        onClose={cart.closeCart} onRemove={cart.removeItem}
        onUpdate={cart.updateQty} onClear={cart.clearCart}
        onCheckout={handleCheckout}
        onQuote={(items)=>{ cart.closeCart(); quote.openQuote(items); }}
      />

      <QuoteModal
        isOpen={quote.isOpen}  items={quote.prefillItems}
        onClose={quote.closeQuote}
        onSuccess={()=>addToast("📋 Cotización enviada. Le contactaremos pronto.","success")}
      />

      <CheckoutModal
        isOpen={showCheckout}  items={cart.items}
        onClose={()=>setShowCheckout(false)} onSuccess={handleOrderSuccess}
      />

      <Navbar
        page={page} cartCount={cartCount(cart.items)} dark={dark}
        onNav={go} onAdmin={()=>go("admin")}
        onCartOpen={cart.openCart} onDarkToggle={toggleDark}
      />

      {page==="home"     && <HomePage go={go} addCart={addCart} onToast={addToast}/>}
      {page==="catalog"  && <CatalogPage go={go} addCart={addCart}/>}
      {page==="product"  && (
        <ProductDetailPage
          product={selProduct} go={go} addCart={addCart}
          onQuote={(p)=>{ const item:CartItem={product:p,qty:1}; quote.openQuote([item]); }}
        />
      )}
      {page==="shipping" && <ShippingPage/>}
      {page==="about"    && <AboutPage/>}
      {page==="blog"     && <BlogPage/>}
      {page==="contact"  && <ContactPage onToast={addToast}/>}

      <Footer onNav={go}/>

      {/* Floating WhatsApp button — visible on all public pages */}
      <WhatsAppButton/>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutPage() {
  return (
    <div style={{padding:"72px 60px",background:C.bg,minHeight:"70vh"}}>
      <div style={{maxWidth:980,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <div style={{fontSize:72,marginBottom:20}}>🏥</div>
          <h1 style={{fontSize:44,fontWeight:800,color:C.navy,marginBottom:14}}>Sobre Hospicalfa Medical</h1>
          <p style={{color:C.muted,fontSize:17,lineHeight:1.75,maxWidth:600,margin:"0 auto"}}>
            Empresa dominicana especializada en distribución y venta de insumos y equipamiento médico certificado desde 2010.
          </p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:40}}>
          {[
            {i:"🎯",t:"Nuestra Misión",   d:"Proveer insumos y equipamiento médico de alta calidad a todas las instituciones de salud de la República Dominicana, garantizando productos certificados a precios competitivos."},
            {i:"🌟",t:"Nuestra Visión",   d:"Ser la empresa líder en distribución de insumos médicos en el Caribe, reconocida por excelencia en servicio, calidad y compromiso con la salud dominicana."},
            {i:"⚖️",t:"Nuestros Valores", d:"Integridad, calidad, compromiso y servicio al cliente. Operamos con transparencia y los más altos estándares éticos del sector salud."},
            {i:"📖",t:"Nuestra Historia", d:"Fundada en 2010 en Santiago. Hemos crecido de distribuidora local a empresa con cobertura nacional y más de 500 clientes institucionales activos."},
          ].map((item,i)=>(
            <div key={i} style={{background:C.white,borderRadius:16,border:`1px solid ${C.border}`,padding:"28px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={{fontSize:36,marginBottom:14}}>{item.i}</div>
              <h3 style={{fontSize:18,fontWeight:700,color:C.navy,marginBottom:10}}>{item.t}</h3>
              <p style={{color:C.muted,fontSize:14,lineHeight:1.75}}>{item.d}</p>
            </div>
          ))}
        </div>
        <div style={{background:`linear-gradient(135deg,${C.navy},${C.tealDk})`,borderRadius:20,padding:"44px 56px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:24,color:"#fff"}}>
          {[[`${COMPANY.stats.yearsExperience}+`,"Años de experiencia"],[`${COMPANY.stats.products.toLocaleString()}+`,"Productos disponibles"],[`${COMPANY.stats.activeClients}+`,"Clientes activos"],[`${COMPANY.stats.provincesCovered}`,"Provincias cubiertas"]].map(([v,l],i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:38,fontWeight:800,lineHeight:1}}>{v}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:6}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


