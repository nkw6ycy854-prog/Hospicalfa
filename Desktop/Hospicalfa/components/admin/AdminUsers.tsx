"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, ShieldOff, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAdmin, type AdminUser } from "@/lib/adminStore";
import { Modal, SectionHeader, Field, SaveBtn, StatusBadge, ConfirmDialog } from "./shared";
import { COLORS as C } from "@/lib/data";

const ROLES = [
  { v:"superadmin",   l:"Super Administrador" },
  { v:"admin",        l:"Administrador"        },
  { v:"vendedor",     l:"Vendedor"             },
  { v:"inventario",   l:"Inventario"           },
  { v:"contabilidad", l:"Contabilidad"         },
];

const ROLE_PERMS: Record<string,string[]> = {
  superadmin:   ["dashboard","orders","customers","products","inventory","finance","shipping","users","settings","website"],
  admin:        ["dashboard","orders","customers","products","inventory","finance","shipping"],
  vendedor:     ["dashboard","orders","customers"],
  inventario:   ["dashboard","products","inventory"],
  contabilidad: ["dashboard","finance"],
};

const ALL_PERMS = [
  { v:"dashboard",  l:"Dashboard" },
  { v:"orders",     l:"Pedidos"   },
  { v:"customers",  l:"Clientes"  },
  { v:"products",   l:"Productos" },
  { v:"inventory",  l:"Inventario"},
  { v:"finance",    l:"Finanzas"  },
  { v:"shipping",   l:"Envíos"    },
  { v:"users",      l:"Usuarios"  },
  { v:"settings",   l:"Configuración"},
  { v:"website",    l:"Contenido Web"},
];

const ROLE_COLORS: Record<string,{bg:string;c:string}> = {
  superadmin:   { bg:"#EDE9FE", c:"#5B21B6" },
  admin:        { bg:"#DBEAFE", c:"#1E3A8A" },
  vendedor:     { bg:"#D1FAE5", c:"#065F46" },
  inventario:   { bg:"#FEF3C7", c:"#92400E" },
  contabilidad: { bg:"#FCE7F3", c:"#9D174D" },
};

const EMPTY_USER: AdminUser = {
  id:0, name:"", email:"", role:"vendedor",
  status:"active", lastLogin:"—", createdAt:"",
  permissions:ROLE_PERMS["vendedor"],
  avatar:"",
};

export function AdminUsers() {
  const { state, dispatch } = useAdmin();
  const [editing, setEditing]   = useState<AdminUser|null>(null);
  const [isNew, setIsNew]       = useState(false);
  const [deleting, setDeleting] = useState<AdminUser|null>(null);
  const [saving, setSaving]     = useState(false);
  const [newPass, setNewPass]   = useState("");
  const [showPass, setShowPass] = useState(false);

  const upd = (field: keyof AdminUser, val: string | string[]) =>
    setEditing(e => e ? { ...e, [field]: val } as AdminUser : null);

  const handleRoleChange = (role: string) => {
    setEditing(e => e ? {
      ...e,
      role: role as AdminUser["role"],
      permissions: [...(ROLE_PERMS[role] ?? [])],
    } : null);
  };

  const togglePerm = (perm: string) => {
    setEditing(e => {
      if (!e) return null;
      const has = e.permissions.includes(perm);
      return {
        ...e,
        permissions: has
          ? e.permissions.filter(p => p !== perm)
          : [...e.permissions, perm],
      };
    });
  };

  const openNew = () => {
    setEditing({
      ...EMPTY_USER,
      id: Math.max(0, ...state.users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setIsNew(true);
    setNewPass("");
  };

  const save = async () => {
    if (!editing || !editing.name.trim() || !editing.email.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    const user = {
      ...editing,
      avatar: editing.name.charAt(0).toUpperCase(),
    };
    if (isNew) dispatch({ type: "ADD_USER", user });
    else        dispatch({ type: "UPD_USER", user });
    setSaving(false);
    setEditing(null);
    setIsNew(false);
  };

  const toggleStatus = (u: AdminUser) =>
    dispatch({
      type: "UPD_USER",
      user: { ...u, status: u.status === "active" ? "inactive" : "active" },
    });

  const active   = state.users.filter(u => u.status === "active").length;
  const inactive = state.users.filter(u => u.status === "inactive").length;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <SectionHeader
        title="Usuarios y Roles"
        sub={`${state.users.length} usuarios · ${active} activos · ${inactive} inactivos`}
        action={
          <button onClick={openNew} style={{
            display:"flex", alignItems:"center", gap:6, padding:"9px 18px",
            borderRadius:10, border:"none", background:C.navy, color:"#fff",
            fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
          }}>
            <Plus size={14}/> Nuevo Usuario
          </button>
        }
      />

      <div style={{ padding:"20px 32px", overflowY:"auto", flex:1 }}>
        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:24 }}>
          {ROLES.map(r => {
            const count = state.users.filter(u => u.role === r.v).length;
            const rc = ROLE_COLORS[r.v] ?? { bg:C.bg, c:C.muted };
            return (
              <div key={r.v} style={{
                background:C.white, borderRadius:12, padding:"14px 16px",
                border:`1px solid ${C.border}`,
              }}>
                <span style={{
                  background:rc.bg, color:rc.c, fontSize:10, fontWeight:700,
                  padding:"2px 8px", borderRadius:8, display:"inline-block", marginBottom:8,
                }}>{r.l}</span>
                <div style={{ fontSize:24, fontWeight:800, color:C.navy }}>{count}</div>
              </div>
            );
          })}
        </div>

        {/* USER CARDS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
          {state.users.map(u => {
            const rc = ROLE_COLORS[u.role] ?? { bg:C.bg, c:C.muted };
            const roleLabel = ROLES.find(r => r.v === u.role)?.l ?? u.role;
            return (
              <div key={u.id} style={{
                background:C.white, borderRadius:14, border:`1px solid ${C.border}`,
                padding:"22px 24px",
                boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
                opacity: u.status === "inactive" ? 0.65 : 1,
              }}>
                {/* Header */}
                <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{
                    width:50, height:50, borderRadius:12,
                    background:`linear-gradient(135deg,${C.navy},${C.teal})`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20, fontWeight:800, color:"#fff", flexShrink:0,
                  }}>
                    {u.avatar || u.name.charAt(0)}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:700, color:C.txt }}>{u.name}</div>
                    <div style={{ fontSize:12, color:C.muted, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {u.email}
                    </div>
                  </div>
                  <StatusBadge status={u.status}/>
                </div>

                {/* Role badge */}
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14, flexWrap:"wrap" }}>
                  <span style={{
                    background:rc.bg, color:rc.c, padding:"4px 12px",
                    borderRadius:12, fontSize:12, fontWeight:700,
                  }}>{roleLabel}</span>
                  <span style={{ fontSize:11, color:C.muted }}>
                    {u.permissions.length} permisos
                  </span>
                </div>

                {/* Permissions */}
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
                  {ALL_PERMS.map(p => (
                    <span key={p.v} style={{
                      fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:6,
                      background: u.permissions.includes(p.v) ? C.navyLt : C.bg,
                      color: u.permissions.includes(p.v) ? C.navy : C.muted,
                      border: `1px solid ${u.permissions.includes(p.v) ? C.teal+"40" : C.border}`,
                    }}>{p.l}</span>
                  ))}
                </div>

                {/* Meta */}
                <div style={{ fontSize:11, color:C.muted, marginBottom:16, display:"flex", gap:16 }}>
                  <span>📅 Creado: {u.createdAt}</span>
                  <span>🕐 Último acceso: {u.lastLogin}</span>
                </div>

                {/* Actions */}
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={() => { setEditing({...u}); setIsNew(false); setNewPass(""); }} style={{
                    flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                    gap:6, padding:"9px", borderRadius:9, border:"none",
                    background:"#EFF6FF", color:C.navy, fontSize:12, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit",
                  }}>
                    <Edit2 size={13}/> Editar
                  </button>
                  <button onClick={() => toggleStatus(u)} style={{
                    flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                    gap:6, padding:"9px", borderRadius:9, border:"none",
                    background:u.status==="active"?"#FEF3C7":"#D1FAE5",
                    color:u.status==="active"?"#92400E":C.green,
                    fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                  }}>
                    {u.status==="active"
                      ? <><ShieldOff size={13}/> Desactivar</>
                      : <><ShieldCheck size={13}/> Activar</>
                    }
                  </button>
                  {u.role !== "superadmin" && (
                    <button onClick={() => setDeleting(u)} style={{
                      width:38, display:"flex", alignItems:"center", justifyContent:"center",
                      padding:"9px", borderRadius:9, border:"none",
                      background:"#FEF2F2", cursor:"pointer",
                    }}>
                      <Trash2 size={13} color={C.red}/>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT / NEW MODAL */}
      {editing && (
        <Modal
          title={isNew ? "Nuevo Usuario" : `Editar: ${editing.name}`}
          subtitle={isNew ? "Complete los datos del nuevo usuario" : "Modifique información, rol y permisos"}
          onClose={() => { setEditing(null); setIsNew(false); }}
          width={660}
        >
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Field label="Nombre completo *"    value={editing.name}  onChange={v=>upd("name",v)} span={2}/>
            <Field label="Correo electrónico *" value={editing.email} onChange={v=>upd("email",v)} type="email"/>
            <Field label="Estado"               value={editing.status} onChange={v=>upd("status",v)}
              as="select" options={[{v:"active",l:"Activo"},{v:"inactive",l:"Inactivo"}]}/>
          </div>

          {/* Role */}
          <div style={{ marginTop:18, marginBottom:18 }}>
            <label style={{ fontSize:12, fontWeight:600, color:C.txt, display:"block", marginBottom:10 }}>
              Rol del Usuario
            </label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
              {ROLES.map(r => {
                const rc = ROLE_COLORS[r.v] ?? { bg:C.bg, c:C.muted };
                const active = editing.role === r.v;
                return (
                  <button key={r.v} onClick={() => handleRoleChange(r.v)} style={{
                    padding:"10px 6px", borderRadius:9, cursor:"pointer", fontFamily:"inherit",
                    border:`2px solid ${active ? rc.c : C.border}`,
                    background:active ? rc.bg : C.white,
                    color:active ? rc.c : C.muted,
                    fontSize:11, fontWeight:700, textAlign:"center",
                  }}>
                    {r.l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permissions */}
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12, fontWeight:600, color:C.txt, display:"block", marginBottom:10 }}>
              Permisos de Acceso
            </label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
              {ALL_PERMS.map(p => {
                const has = editing.permissions.includes(p.v);
                return (
                  <button key={p.v} onClick={() => togglePerm(p.v)} style={{
                    padding:"9px 6px", borderRadius:9, cursor:"pointer", fontFamily:"inherit",
                    border:`1.5px solid ${has ? C.teal : C.border}`,
                    background:has ? C.tealLt : C.bg,
                    color:has ? C.tealDk : C.muted,
                    fontSize:11, fontWeight:700, textAlign:"center",
                    transition:"all 0.15s",
                  }}>
                    {has ? "✓ " : ""}{p.l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:8 }}>
            <label style={{ fontSize:12, fontWeight:600, color:C.txt, display:"block", marginBottom:6 }}>
              {isNew ? "Contraseña *" : "Nueva contraseña (dejar vacío para no cambiar)"}
            </label>
            <div style={{ position:"relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                placeholder={isNew ? "Mínimo 8 caracteres" : "••••••••"}
                style={{
                  width:"100%", padding:"10px 44px 10px 13px",
                  borderRadius:9, border:`1.5px solid ${C.border}`,
                  fontSize:13, color:C.txt, background:C.bg,
                  outline:"none", fontFamily:"inherit",
                }}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = C.teal; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{
                  position:"absolute", right:12, top:"50%",
                  transform:"translateY(-50%)", background:"none",
                  border:"none", cursor:"pointer", padding:2,
                  display:"flex", alignItems:"center",
                }}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={15} color={C.muted}/> : <Eye size={15} color={C.muted}/>}
              </button>
            </div>
          </div>

          <SaveBtn onClick={save} loading={saving} label={isNew ? "Crear Usuario" : "Guardar Cambios"}/>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deleting}
        title="¿Eliminar usuario?"
        message={`¿Seguro que desea eliminar a "${deleting?.name}"? Perderá acceso permanentemente.`}
        onConfirm={() => { if (deleting) { dispatch({ type:"DEL_USER", id:deleting.id }); setDeleting(null); } }}
        onCancel={() => setDeleting(null)}
        danger
      />
    </div>
  );
}
