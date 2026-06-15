"use client";
import { X, Save, Loader } from "lucide-react";
import { COLORS as C } from "@/lib/data";

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────
export function Modal({
  title, subtitle, onClose, children, width = 600,
}: {
  title: string; subtitle?: string; onClose: () => void;
  children: React.ReactNode; width?: number;
}) {
  return (
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true"/>
      <div className="animate-scale-in" role="dialog" aria-modal="true" style={{
        position:"fixed",top:"50%",left:"50%",
        transform:"translate(-50%,-50%)",
        background:C.white,borderRadius:20,
        border:`1px solid ${C.border}`,
        boxShadow:"0 32px 80px rgba(0,0,0,0.28)",
        width:`min(${width}px, 96vw)`,maxHeight:"90vh",
        overflowY:"auto",zIndex:400,
      }}>
        <div style={{height:4,background:`linear-gradient(90deg,${C.navy},${C.teal})`,borderRadius:"20px 20px 0 0"}}/>
        <div style={{padding:"28px 32px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:C.navy}}>{title}</h2>
              {subtitle&&<p style={{fontSize:13,color:C.muted,marginTop:3}}>{subtitle}</p>}
            </div>
            <button onClick={onClose} style={{
              width:34,height:34,borderRadius:8,background:C.bg,
              border:"none",cursor:"pointer",display:"flex",
              alignItems:"center",justifyContent:"center",flexShrink:0,
            }}><X size={16} color={C.muted}/></button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
export function SectionHeader({
  title, sub, action,
}: { title:string; sub?:string; action?:React.ReactNode }) {
  return (
    <div style={{
      padding:"22px 32px",background:C.white,
      borderBottom:`1px solid ${C.border}`,
      display:"flex",justifyContent:"space-between",alignItems:"center",
      flexShrink:0,
    }}>
      <div>
        <h1 style={{fontSize:22,fontWeight:800,color:C.navy}}>{title}</h1>
        {sub&&<p style={{fontSize:13,color:C.muted,marginTop:2}}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────────
export function Field({
  label,value,onChange,type="text",placeholder,error,
  disabled=false,as,rows,options,span=1,
}:{
  label:string;value:string|number;
  onChange:(v:string)=>void;
  type?:string;placeholder?:string;error?:string;
  disabled?:boolean;as?:"textarea"|"select";rows?:number;
  options?:{v:string;l:string}[];span?:number;
}) {
  const base:React.CSSProperties = {
    width:"100%",padding:"10px 13px",borderRadius:9,
    border:`1.5px solid ${error?C.red:C.border}`,
    fontSize:13,color:C.txt,background:disabled?"#F8FAFC":C.bg,
    outline:"none",fontFamily:"inherit",
    transition:"border-color 0.15s",
    opacity:disabled?0.6:1,
  };
  return (
    <div style={{gridColumn:`span ${span}`}}>
      <label style={{fontSize:12,fontWeight:600,color:C.txt,display:"block",marginBottom:5}}>
        {label}
      </label>
      {as==="textarea"?(
        <textarea value={value} onChange={e=>onChange(e.target.value)}
          placeholder={placeholder} rows={rows??3} disabled={disabled}
          style={{...base,resize:"vertical"}}
          onFocus={e=>{if(!disabled)(e.target as HTMLTextAreaElement).style.borderColor=C.teal;}}
          onBlur={e=>{(e.target as HTMLTextAreaElement).style.borderColor=error?C.red:C.border;}}
        />
      ):as==="select"?(
        <select value={value} onChange={e=>onChange(e.target.value)} disabled={disabled} style={base}>
          <option value="">Seleccionar...</option>
          {options?.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ):(
        <input type={type} value={value} onChange={e=>onChange(e.target.value)}
          placeholder={placeholder} disabled={disabled} style={base}
          onFocus={e=>{if(!disabled)(e.target as HTMLInputElement).style.borderColor=C.teal;}}
          onBlur={e=>{(e.target as HTMLInputElement).style.borderColor=error?C.red:C.border;}}
        />
      )}
      {error&&<div style={{fontSize:11,color:C.red,marginTop:3}}>{error}</div>}
    </div>
  );
}

// ─── SAVE BUTTON ─────────────────────────────────────────────────────────────
export function SaveBtn({
  onClick,loading=false,label="Guardar Cambios",
}:{onClick:()=>void;loading?:boolean;label?:string}) {
  return (
    <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:24}}>
      <button onClick={onClick} disabled={loading} style={{
        display:"flex",alignItems:"center",gap:8,
        padding:"12px 24px",borderRadius:10,border:"none",
        background:loading?C.muted:C.navy,color:"#fff",
        fontSize:14,fontWeight:700,cursor:loading?"wait":"pointer",
        fontFamily:"inherit",
      }}>
        {loading?<Loader size={15} style={{animation:"spin 1s linear infinite"}}/>:<Save size={15}/>}
        {loading?"Guardando...":label}
      </button>
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }:{ status:string }) {
  const m:Record<string,{bg:string;c:string;dot:string}> = {
    active:    {bg:"#D1FAE5",c:"#065F46",dot:"#10B981"},
    inactive:  {bg:"#F3F4F6",c:"#374151",dot:"#9CA3AF"},
    blocked:   {bg:"#FEE2E2",c:"#991B1B",dot:"#EF4444"},
    "Entregado":  {bg:"#D1FAE5",c:"#065F46",dot:"#10B981"},
    "En tránsito":{bg:"#DBEAFE",c:"#1E3A8A",dot:"#3B82F6"},
    "Procesando": {bg:"#FEF3C7",c:"#92400E",dot:"#F59E0B"},
    "Cancelado":  {bg:"#FEE2E2",c:"#991B1B",dot:"#EF4444"},
    superadmin:{bg:"#EDE9FE",c:"#5B21B6",dot:"#7C3AED"},
    admin:     {bg:"#DBEAFE",c:"#1E3A8A",dot:"#3B82F6"},
    vendedor:  {bg:"#D1FAE5",c:"#065F46",dot:"#10B981"},
    inventario:{bg:"#FEF3C7",c:"#92400E",dot:"#F59E0B"},
    contabilidad:{bg:"#FCE7F3",c:"#9D174D",dot:"#EC4899"},
  };
  const s = m[status]??{bg:"#F3F4F6",c:"#374151",dot:"#9CA3AF"};
  const labels:Record<string,string> = {
    active:"Activo",inactive:"Inactivo",blocked:"Bloqueado",
    superadmin:"Super Admin",vendedor:"Vendedor",
    inventario:"Inventario",contabilidad:"Contabilidad",
  };
  return (
    <span style={{
      background:s.bg,color:s.c,
      padding:"3px 10px",borderRadius:20,
      fontSize:11,fontWeight:700,whiteSpace:"nowrap",
      display:"inline-flex",alignItems:"center",gap:5,
    }}>
      <span style={{width:6,height:6,borderRadius:"50%",background:s.dot,display:"inline-block"}}/>
      {labels[status]??status}
    </span>
  );
}

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────
export function ConfirmDialog({
  isOpen,title,message,onConfirm,onCancel,danger=false,
}:{
  isOpen:boolean;title:string;message:string;
  onConfirm:()=>void;onCancel:()=>void;danger?:boolean;
}) {
  if(!isOpen)return null;
  return (
    <>
      <div className="overlay" style={{zIndex:450}} onClick={onCancel}/>
      <div className="animate-scale-in" style={{
        position:"fixed",top:"50%",left:"50%",
        transform:"translate(-50%,-50%)",
        background:C.white,borderRadius:16,
        border:`1px solid ${C.border}`,
        boxShadow:"0 24px 60px rgba(0,0,0,0.25)",
        width:"min(420px, 95vw)",zIndex:460,padding:"28px 28px",
      }}>
        <div style={{fontSize:40,marginBottom:14,textAlign:"center"}}>
          {danger?"!":"?"}
        </div>
        <h3 style={{fontSize:18,fontWeight:800,color:C.navy,textAlign:"center",marginBottom:8}}>
          {title}
        </h3>
        <p style={{fontSize:14,color:C.muted,textAlign:"center",marginBottom:24,lineHeight:1.6}}>
          {message}
        </p>
        <div style={{display:"flex",gap:12}}>
          <button onClick={onCancel} style={{
            flex:1,padding:"11px",background:C.white,
            border:`1.5px solid ${C.border}`,borderRadius:10,
            fontSize:14,fontWeight:600,cursor:"pointer",
            color:C.txt,fontFamily:"inherit",
          }}>Cancelar</button>
          <button onClick={onConfirm} style={{
            flex:1,padding:"11px",
            background:danger?C.red:C.teal,
            border:"none",borderRadius:10,
            fontSize:14,fontWeight:700,cursor:"pointer",
            color:"#fff",fontFamily:"inherit",
          }}>
            {danger?"Sí, eliminar":"Confirmar"}
          </button>
        </div>
      </div>
    </>
  );
}
