"use client";
import {
  Bell, Home, Package, ShoppingCart,
  Layers, Users, DollarSign, Settings, ChevronDown,
  LogOut, Shield, type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";
import { useAdmin } from "@/lib/adminStore";

export type AdminSection =
  | "orders"    | "products"
  | "inventory" | "customers" | "finance"
  | "users"     | "settings";

interface NavGroup {
  label: string;
  items: { id: AdminSection; I: LucideIcon; label: string; badge?: number }[];
}

interface AdminLayoutProps {
  section: AdminSection;
  setSection: (s: AdminSection) => void;
  onHome: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ section, setSection, onHome, onLogout, children }: AdminLayoutProps) {
  const { state } = useAdmin();
  const pendingOrders  = state.orders.filter(o=>o.status==="Procesando").length;
  const criticalStock  = state.products.filter(p=>p.stock<20).length;
  const blockedClients = state.customers.filter(c=>c.status==="blocked").length;

  const NAV_GROUPS: NavGroup[] = [
    {
      label:"Operaciones",
      items:[
        { id:"orders",    I:ShoppingCart,    label:"Pedidos",      badge:pendingOrders  },
        { id:"customers", I:Users,           label:"Clientes",     badge:blockedClients||undefined },
        { id:"finance",   I:DollarSign,      label:"Finanzas"      },
      ],
    },
    {
      label:"Catálogo",
      items:[
        { id:"products",  I:Package, label:"Productos"   },
        { id:"inventory", I:Layers,  label:"Inventario",  badge:criticalStock||undefined },
      ],
    },
    {
      label:"Configuración",
      items:[
        { id:"users",     I:Shield,  label:"Usuarios"     },
        { id:"settings",  I:Settings,label:"Ajustes"      },
      ],
    },
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>
      {/* TOP BAR */}
      <header style={{
        height:64,background:C.white,borderBottom:`1px solid ${C.border}`,
        display:"flex",alignItems:"center",padding:"0 24px",gap:16,
        boxShadow:"0 1px 4px rgba(0,0,0,0.06)",flexShrink:0,zIndex:100,
      }}>
        <Logo/>
        <div style={{flex:1,display:"flex",justifyContent:"center"}}>
          <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 16px",fontSize:12,color:C.muted,fontWeight:500}}>
            Panel Administrativo · Hospicalfa Medical 2026
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {/* Notification bell */}
          <button style={{
            width:38,height:38,borderRadius:9,background:C.bg,border:`1px solid ${C.border}`,
            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
            position:"relative",
          }}>
            <Bell size={16} color={C.muted}/>
            {(pendingOrders+criticalStock)>0&&(
              <span style={{
                position:"absolute",top:-4,right:-4,
                background:C.red,color:"#fff",borderRadius:"50%",
                width:16,height:16,fontSize:9,fontWeight:700,
                display:"flex",alignItems:"center",justifyContent:"center",
              }}>{pendingOrders+criticalStock}</span>
            )}
          </button>

          {/* User */}
          <div style={{
            display:"flex",alignItems:"center",gap:10,
            background:C.bg,border:`1px solid ${C.border}`,
            borderRadius:10,padding:"6px 14px",cursor:"pointer",
          }}>
            <div style={{
              width:30,height:30,borderRadius:7,
              background:`linear-gradient(135deg,${C.navy},${C.teal})`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:800,color:"#fff",
            }}>A</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.txt,lineHeight:1.1}}>Administrador</div>
              <div style={{fontSize:10,color:C.muted}}>admin@hospicalfa.do</div>
            </div>
            <ChevronDown size={13} color={C.muted}/>
          </div>

          {/* Logout */}
          <button onClick={onLogout} title="Cerrar sesión" style={{
            width:38,height:38,borderRadius:9,background:"#FEF2F2",
            border:`1px solid #FECACA`,cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>
            <LogOut size={15} color={C.red}/>
          </button>
        </div>
      </header>

      {/* BODY */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* SIDEBAR */}
        <aside style={{
          width:234,background:C.navyDk,display:"flex",
          flexDirection:"column",flexShrink:0,overflowY:"auto",
        }}>
          <nav style={{padding:"12px 10px",flex:1}}>
            {NAV_GROUPS.map((group,gi)=>(
              <div key={gi} style={{marginBottom:8}}>
                <div style={{
                  fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.28)",
                  letterSpacing:"1.2px",textTransform:"uppercase",
                  padding:"8px 14px 4px",
                }}>{group.label}</div>
                {group.items.map(({id,I,label,badge})=>(
                  <button
                    key={id}
                    onClick={()=>setSection(id)}
                    style={{
                      width:"100%",display:"flex",alignItems:"center",gap:11,
                      padding:"10px 14px",borderRadius:10,border:"none",
                      background:section===id?"rgba(13,153,204,0.2)":"transparent",
                      color:section===id?"#38BDF8":"rgba(255,255,255,0.6)",
                      fontSize:13,fontWeight:section===id?700:500,
                      cursor:"pointer",marginBottom:2,fontFamily:"inherit",
                      borderLeft:section===id?`3px solid ${C.teal}`:"3px solid transparent",
                      transition:"all 0.15s",textAlign:"left",
                    }}
                    onMouseEnter={e=>{
                      if(section!==id){
                        const el=e.currentTarget as HTMLButtonElement;
                        el.style.background="rgba(255,255,255,0.06)";
                        el.style.color="#fff";
                      }
                    }}
                    onMouseLeave={e=>{
                      if(section!==id){
                        const el=e.currentTarget as HTMLButtonElement;
                        el.style.background="transparent";
                        el.style.color="rgba(255,255,255,0.6)";
                      }
                    }}
                  >
                    <I size={16} style={{flexShrink:0}}/>
                    <span style={{flex:1}}>{label}</span>
                    {badge!=null&&badge>0&&(
                      <span style={{
                        background:C.red,color:"#fff",
                        borderRadius:10,padding:"1px 7px",
                        fontSize:10,fontWeight:800,
                      }}>{badge}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div style={{padding:"10px 10px 14px",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
            <button onClick={onHome} style={{
              width:"100%",display:"flex",alignItems:"center",gap:11,
              padding:"9px 14px",borderRadius:10,border:"none",
              background:"transparent",color:"rgba(255,255,255,0.35)",
              fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",marginBottom:4,
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color="#fff";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.35)";}}>
              <Home size={14}/> Ver Sitio Web
            </button>
            <button onClick={onLogout} style={{
              width:"100%",display:"flex",alignItems:"center",gap:11,
              padding:"9px 14px",borderRadius:10,border:"none",
              background:"transparent",color:"rgba(239,68,68,0.55)",
              fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit",
            }}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.color="#EF4444";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.color="rgba(239,68,68,0.55)";}}>
              <LogOut size={14}/> Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,overflowY:"auto",background:C.bg}}>
          {children}
        </main>
      </div>
    </div>
  );
}
