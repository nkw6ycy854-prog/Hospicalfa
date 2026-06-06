"use client";
import { useState } from "react";
import { Save, Globe, CreditCard, Bell, Shield, Hash, Layers, Truck, Users, BarChart2 } from "lucide-react";
import { useAdmin } from "@/lib/adminStore";
import { SectionHeader, Field, SaveBtn } from "./shared";
import { COLORS as C } from "@/lib/data";

type Tab = "company"|"payment"|"notifications"|"security"|"advanced";

export function AdminSettings() {
  const { state, dispatch } = useAdmin();
  const [tab, setTab]       = useState<Tab>("company");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  // Company fields (mirror from website content)
  const [companyName, setCompanyName]   = useState(state.content.about.title);
  const [companyPhone,setCompanyPhone]  = useState(state.content.about.phone);
  const [companyEmail,setCompanyEmail]  = useState(state.content.about.email);
  const [companyAddr, setCompanyAddr]   = useState(state.content.about.address);
  const [rnc,         setRnc]           = useState("1-23456789-0");
  const [currency,    setCurrency]      = useState("RD$");
  const [itbis,       setItbis]         = useState("18");

  // Notifications
  const [notifEmail,  setNotifEmail]    = useState(true);
  const [notifWhatsapp,setNotifWhatsapp]= useState(true);
  const [notifNewOrder,setNotifNewOrder]= useState(true);
  const [notifLowStock,setNotifLowStock]= useState(true);
  const [notifPayment, setNotifPayment] = useState(true);
  const [adminEmail,   setAdminEmail]   = useState("admin@hospicalfa.do");
  const [whatsappNum,  setWhatsappNum]  = useState("+18095550001");

  // Security
  const [require2fa, setRequire2fa]     = useState(false);
  const [sessionHours,setSessionHours] = useState("8");
  const [logActivity, setLogActivity]  = useState(true);
  const [ipWhitelist, setIpWhitelist]  = useState("");

  const save = async () => {
    setSaving(true);
    await new Promise(r=>setTimeout(r,700));
    dispatch({
      type:"UPD_CONTENT",
      content:{
        ...state.content,
        about:{
          ...state.content.about,
          title:companyName,
          phone:companyPhone,
          email:companyEmail,
          address:companyAddr,
        },
      },
    });
    setSaving(false);
    setSaved(true);
    setTimeout(()=>setSaved(false),3000);
  };

  const TABS = [
    {id:"company"       as Tab, I:Globe,    label:"Empresa"       },
    {id:"payment"       as Tab, I:CreditCard,label:"Pagos & ITBIS"},
    {id:"notifications" as Tab, I:Bell,     label:"Notificaciones"},
    {id:"security"      as Tab, I:Shield,   label:"Seguridad"     },
    {id:"advanced"      as Tab, I:BarChart2,label:"Avanzado"      },
  ];

  const Toggle = ({val,set,label,desc}:{val:boolean;set:(v:boolean)=>void;label:string;desc?:string}) => (
    <div style={{
      display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"14px 18px",background:C.white,borderRadius:12,
      border:`1px solid ${C.border}`,
    }}>
      <div>
        <div style={{fontSize:14,fontWeight:600,color:C.txt}}>{label}</div>
        {desc&&<div style={{fontSize:12,color:C.muted,marginTop:2}}>{desc}</div>}
      </div>
      <button onClick={()=>set(!val)} style={{
        width:52,height:28,borderRadius:14,border:"none",cursor:"pointer",
        background:val?C.teal:C.border,position:"relative",transition:"background 0.2s",
        flexShrink:0,
      }}>
        <div style={{
          width:20,height:20,borderRadius:"50%",background:"#fff",
          position:"absolute",top:4,left:val?28:4,
          transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
        }}/>
      </button>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <SectionHeader
        title="Configuración del Sistema"
        sub="Ajustes generales de la plataforma"
        action={
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {saved&&<span style={{background:C.greenLt,color:C.green,padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700}}>✓ Guardado</span>}
            <button onClick={save} disabled={saving} style={{
              display:"flex",alignItems:"center",gap:6,padding:"9px 18px",
              borderRadius:10,border:"none",background:saving?C.muted:C.navy,
              color:"#fff",fontSize:13,fontWeight:700,cursor:saving?"wait":"pointer",fontFamily:"inherit",
            }}>
              <Save size={14}/>{saving?"Guardando...":"Guardar Todo"}
            </button>
          </div>
        }
      />

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Side tabs */}
        <div style={{width:200,background:C.white,borderRight:`1px solid ${C.border}`,padding:"16px 10px",flexShrink:0}}>
          {TABS.map(({id,I,label})=>(
            <button key={id} onClick={()=>setTab(id)} style={{
              width:"100%",display:"flex",alignItems:"center",gap:10,
              padding:"11px 13px",borderRadius:10,border:"none",
              background:tab===id?C.navyLt:"transparent",
              color:tab===id?C.navy:C.muted,
              fontSize:13,fontWeight:tab===id?700:500,
              cursor:"pointer",marginBottom:3,fontFamily:"inherit",textAlign:"left",
              borderLeft:tab===id?`3px solid ${C.navy}`:"3px solid transparent",
            }}>
              <I size={15}/>{label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px"}}>

          {/* ── COMPANY ─────────────────────────────── */}
          {tab==="company"&&(
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:C.navy,marginBottom:4}}>Información de la Empresa</h2>
              <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Datos que aparecen en facturas, emails y el sitio web.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                <Field label="Nombre de la empresa"        value={companyName}  onChange={setCompanyName}  span={2}/>
                <Field label="RNC"                         value={rnc}          onChange={setRnc}          placeholder="1-23456789-0"/>
                <Field label="Teléfono principal"          value={companyPhone} onChange={setCompanyPhone} type="tel"/>
                <Field label="Email corporativo"           value={companyEmail} onChange={setCompanyEmail} type="email" span={2}/>
                <Field label="Dirección física"            value={companyAddr}  onChange={setCompanyAddr}  span={2}/>
                <Field label="Moneda del sistema"          value={currency}     onChange={setCurrency}     as="select"
                  options={[{v:"RD$",l:"Peso Dominicano (RD$)"},{v:"USD",l:"Dólar Americano (USD)"}]}/>
                <Field label="ITBIS (%)"                   value={itbis}        onChange={setItbis}        type="number" placeholder="18"/>
              </div>
              <SaveBtn onClick={save} loading={saving}/>
            </div>
          )}

          {/* ── PAYMENT ─────────────────────────────── */}
          {tab==="payment"&&(
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:C.navy,marginBottom:4}}>Métodos de Pago & ITBIS</h2>
              <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Configure los métodos de pago aceptados y la configuración fiscal.</p>
              <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
                {[
                  {l:"Transferencia Bancaria",  desc:"Banco Popular / BanReservas / Scotiabank",   enabled:true},
                  {l:"Tarjeta de Crédito/Débito",desc:"Cardnet y Azul — procesador en línea",       enabled:true},
                  {l:"Efectivo",                desc:"Pago al momento de la entrega",               enabled:true},
                  {l:"Cheque",                  desc:"A nombre de Hospicalfa Medical SRL",          enabled:false},
                ].map((m,i)=>(
                  <div key={i} style={{
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"16px 20px",background:C.white,borderRadius:12,border:`1px solid ${C.border}`,
                  }}>
                    <div>
                      <div style={{fontSize:14,fontWeight:700,color:C.txt}}>{m.l}</div>
                      <div style={{fontSize:12,color:C.muted,marginTop:2}}>{m.desc}</div>
                    </div>
                    <span style={{
                      background:m.enabled?C.greenLt:"#F3F4F6",
                      color:m.enabled?C.green:C.muted,
                      padding:"4px 12px",borderRadius:10,fontSize:12,fontWeight:700,
                    }}>{m.enabled?"Activo":"Inactivo"}</span>
                  </div>
                ))}
              </div>

              {/* Bank accounts */}
              <h3 style={{fontSize:15,fontWeight:700,color:C.navy,marginBottom:14}}>Cuentas Bancarias</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr",gap:10}}>
                {[
                  {bank:"Banco Popular Dominicano", account:"123-456789-0",  type:"Corriente"},
                  {bank:"BanReservas",               account:"987-654321-0",  type:"Ahorros"},
                ].map((b,i)=>(
                  <div key={i} style={{
                    background:C.navyLt,borderRadius:12,padding:"14px 18px",
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                  }}>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{b.bank}</div>
                      <div style={{fontSize:12,color:C.muted}}>{b.type} · {b.account}</div>
                    </div>
                    <button style={{fontSize:12,color:C.teal,fontWeight:600,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>Editar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ───────────────────────── */}
          {tab==="notifications"&&(
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:C.navy,marginBottom:4}}>Notificaciones Automáticas</h2>
              <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Configure cuándo y cómo se envían las alertas al equipo y clientes.</p>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:22}}>
                <Field label="Email del administrador" value={adminEmail}   onChange={setAdminEmail} type="email"/>
                <Field label="WhatsApp de notificaciones" value={whatsappNum} onChange={setWhatsappNum} type="tel"/>
              </div>

              <h3 style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:12}}>Canales de notificación</h3>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
                <Toggle val={notifEmail}    set={setNotifEmail}    label="Notificaciones por Email"    desc="Enviar alertas al email del administrador"/>
                <Toggle val={notifWhatsapp} set={setNotifWhatsapp} label="Notificaciones por WhatsApp" desc="Mensajes automáticos al número configurado"/>
              </div>

              <h3 style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:12}}>Eventos a notificar</h3>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <Toggle val={notifNewOrder} set={setNotifNewOrder} label="Nuevo pedido recibido"       desc="Alerta inmediata cuando llega un pedido"/>
                <Toggle val={notifLowStock} set={setNotifLowStock} label="Stock bajo o crítico"        desc="Cuando el stock baja del mínimo configurado"/>
                <Toggle val={notifPayment}  set={setNotifPayment}  label="Pago confirmado"             desc="Al confirmar el pago de un pedido"/>
              </div>
              <SaveBtn onClick={save} loading={saving}/>
            </div>
          )}

          {/* ── SECURITY ────────────────────────────── */}
          {tab==="security"&&(
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:C.navy,marginBottom:4}}>Seguridad del Sistema</h2>
              <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Configure la autenticación y control de acceso.</p>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
                <Toggle val={require2fa}   set={setRequire2fa}   label="Autenticación de Dos Factores (2FA)" desc="Requerir código OTP para todos los administradores"/>
                <Toggle val={logActivity}  set={setLogActivity}  label="Registro de actividad (Audit Log)"   desc="Guardar un historial de todas las acciones del panel"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:22}}>
                <Field label="Expiración de sesión (horas)"    value={sessionHours} onChange={setSessionHours} type="number"/>
                <Field label="IP permitidas (lista blanca)"    value={ipWhitelist}  onChange={setIpWhitelist}  placeholder="Dejar vacío para permitir todas"/>
              </div>

              <div style={{background:"#FEF2F2",border:`1px solid #FECACA`,borderRadius:12,padding:"16px 18px",marginBottom:22}}>
                <h4 style={{fontSize:14,fontWeight:700,color:C.red,marginBottom:8}}>⚠ Zona de Peligro</h4>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <button style={{padding:"9px 18px",background:"#FEF2F2",border:`1px solid ${C.red}`,borderRadius:9,fontSize:13,fontWeight:700,color:C.red,cursor:"pointer",fontFamily:"inherit"}}>
                    Cerrar Todas las Sesiones
                  </button>
                  <button style={{padding:"9px 18px",background:"#FEF2F2",border:`1px solid ${C.red}`,borderRadius:9,fontSize:13,fontWeight:700,color:C.red,cursor:"pointer",fontFamily:"inherit"}}>
                    Restablecer Contraseñas
                  </button>
                </div>
              </div>
              <SaveBtn onClick={save} loading={saving}/>
            </div>
          )}

          {/* ── ADVANCED ────────────────────────────── */}
          {tab==="advanced"&&(
            <div>
              <h2 style={{fontSize:17,fontWeight:700,color:C.navy,marginBottom:4}}>Configuración Avanzada</h2>
              <p style={{fontSize:13,color:C.muted,marginBottom:22}}>Opciones de sistema y mantenimiento.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:22}}>
                <Field label="Prefijo de SKU"           value="HM-"     onChange={()=>{}} placeholder="HM-"/>
                <Field label="Prefijo de pedidos"       value="ORD-"    onChange={()=>{}} placeholder="ORD-"/>
                <Field label="Numeración inicial"       value="2026001" onChange={()=>{}} type="number"/>
                <Field label="Zona horaria"             value="America/Santo_Domingo" onChange={()=>{}}
                  as="select" options={[{v:"America/Santo_Domingo",l:"Santo Domingo (UTC-4)"}]}/>
                <Field label="Idioma del sistema"       value="es-DO"   onChange={()=>{}}
                  as="select" options={[{v:"es-DO",l:"Español (RD)"},{v:"en-US",l:"English (US)"}]}/>
                <Field label="Formato de fecha"         value="DD/MM/YYYY" onChange={()=>{}}
                  as="select" options={[{v:"DD/MM/YYYY",l:"DD/MM/YYYY"},{v:"MM/DD/YYYY",l:"MM/DD/YYYY"},{v:"YYYY-MM-DD",l:"YYYY-MM-DD"}]}/>
              </div>

              <h3 style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:12}}>Herramientas de Mantenimiento</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  {l:"Exportar Base de Datos",   desc:"Backup completo en CSV/JSON", icon:"💾"},
                  {l:"Limpiar Caché",            desc:"Forzar recarga de datos",     icon:"🔄"},
                  {l:"Exportar Productos",       desc:"Catálogo en Excel",           icon:"📦"},
                  {l:"Exportar Clientes",        desc:"Base de datos en CSV",        icon:"👥"},
                ].map((t,i)=>(
                  <button key={i} style={{
                    display:"flex",alignItems:"center",gap:12,padding:"16px 18px",
                    background:C.white,borderRadius:12,border:`1px solid ${C.border}`,
                    cursor:"pointer",textAlign:"left",fontFamily:"inherit",
                    transition:"all 0.15s",
                  }}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.borderColor=C.teal;el.style.background=C.tealLt;}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLButtonElement;el.style.borderColor=C.border;el.style.background=C.white;}}>
                    <div style={{fontSize:26}}>{t.icon}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:700,color:C.txt}}>{t.l}</div>
                      <div style={{fontSize:11,color:C.muted,marginTop:2}}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
