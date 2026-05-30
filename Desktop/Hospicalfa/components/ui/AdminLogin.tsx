"use client";
import { useState, useCallback } from "react";
import { Eye, EyeOff, Shield, AlertCircle, Lock, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COLORS as C } from "@/lib/data";

interface AdminLoginProps {
  onLogin: (user: string, pass: string) => boolean;
  onCancel: () => void;
}

export function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const [user, setUser]     = useState("");
  const [pass, setPass]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !pass.trim()) {
      setError("Por favor ingrese usuario y contraseña.");
      return;
    }
    if (attempts >= 5) {
      setError("Demasiados intentos fallidos. Intente más tarde.");
      return;
    }
    setLoading(true);
    setError("");
    // Simulate network delay
    await new Promise(r => setTimeout(r, 700));
    const ok = onLogin(user.trim(), pass);
    if (!ok) {
      setAttempts(a => a + 1);
      setError("Usuario o contraseña incorrectos. Verifique sus credenciales.");
      setPass("");
    }
    setLoading(false);
  }, [user, pass, attempts, onLogin]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navy} 60%, ${C.tealDk} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
    }}>
      {/* Background decoration */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 20% 80%, rgba(13,153,204,0.2) 0%,transparent 40%), radial-gradient(circle at 80% 20%, rgba(39,174,96,0.12) 0%,transparent 40%)",
      }}/>

      <div className="animate-scale-in" style={{
        background: C.white, borderRadius: 24,
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        width: "100%", maxWidth: 440,
        overflow: "hidden", position: "relative",
      }}>
        {/* Top accent bar */}
        <div style={{ height: 5, background: `linear-gradient(90deg, ${C.navy}, ${C.teal})` }}/>

        <div style={{ padding: "40px 40px 36px" }}>
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <Logo size="lg" />
          </div>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: C.navyLt, margin: "0 auto 14px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Shield size={24} color={C.navy} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy, marginBottom: 6 }}>
              Panel Administrativo
            </h1>
            <p style={{ fontSize: 14, color: C.muted }}>
              Acceso restringido — solo personal autorizado
            </p>
          </div>

          {/* Demo credentials hint */}
          <div style={{
            background: C.tealLt, border: `1px solid rgba(13,153,204,0.25)`,
            borderRadius: 10, padding: "10px 14px", marginBottom: 22,
            fontSize: 12, color: C.tealDk, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Lock size={13} style={{ flexShrink: 0 }}/>
            Demo: usuario <strong>admin</strong> · contraseña <strong>hospicalfa2026</strong>
          </div>

          {/* Error */}
          {error && (
            <div className="animate-fade-in" style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 10, padding: "11px 14px", marginBottom: 18,
              display: "flex", alignItems: "center", gap: 9,
              fontSize: 13, color: "#991B1B", fontWeight: 500,
            }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }}/>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Usuario */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: C.txt,
                display: "block", marginBottom: 7,
              }}>
                Usuario
              </label>
              <div style={{ position: "relative" }}>
                <User size={15} color={C.muted} style={{
                  position: "absolute", left: 13, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }}/>
                <input
                  type="text"
                  value={user}
                  onChange={e => setUser(e.target.value)}
                  placeholder="Ingrese su usuario"
                  autoComplete="username"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px 14px 12px 38px",
                    borderRadius: 10, border: `1.5px solid ${C.border}`,
                    fontSize: 14, color: C.txt, background: C.bg,
                    outline: "none", fontFamily: "inherit",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = C.teal; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: C.txt,
                display: "block", marginBottom: 7,
              }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} color={C.muted} style={{
                  position: "absolute", left: 13, top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }}/>
                <input
                  type={showPass ? "text" : "password"}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px 44px 12px 38px",
                    borderRadius: 10, border: `1.5px solid ${C.border}`,
                    fontSize: 14, color: C.txt, background: C.bg,
                    outline: "none", fontFamily: "inherit",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={e => { (e.target as HTMLInputElement).style.borderColor = C.teal; }}
                  onBlur={e => { (e.target as HTMLInputElement).style.borderColor = C.border; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: "absolute", right: 13, top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", padding: 2,
                    display: "flex", alignItems: "center",
                  }}
                  tabIndex={-1}
                >
                  {showPass
                    ? <EyeOff size={16} color={C.muted}/>
                    : <Eye size={16} color={C.muted}/>
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || attempts >= 5}
              style={{
                width: "100%", padding: "13px",
                background: loading || attempts >= 5 ? C.muted : C.navy,
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit", transition: "background 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Verificando...
                </>
              ) : (
                <><Shield size={16}/> Ingresar al Panel</>
              )}
            </button>
          </form>

          {/* Cancel */}
          <button
            onClick={onCancel}
            style={{
              width: "100%", marginTop: 12, padding: "11px",
              background: "transparent", color: C.muted,
              border: `1px solid ${C.border}`, borderRadius: 12,
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Volver al Sitio Web
          </button>

          {attempts >= 3 && attempts < 5 && (
            <p style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: C.red }}>
              ⚠ {5 - attempts} intentos restantes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
