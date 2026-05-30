"use client";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { type ToastItem } from "@/lib/store";

const CONFIG = {
  success: { bg: "#065F46", border: "#059669", Icon: CheckCircle   },
  error:   { bg: "#7F1D1D", border: "#DC2626", Icon: XCircle       },
  info:    { bg: "#1E3A8A", border: "#2563EB", Icon: Info           },
  warning: { bg: "#78350F", border: "#D97706", Icon: AlertTriangle  },
} as const;

export function Toasts({ toasts }: { toasts: ToastItem[] }) {
  if (!toasts.length) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      display: "flex", flexDirection: "column", gap: 10, zIndex: 9999,
    }}>
      {toasts.map(t => {
        const { bg, border, Icon } = CONFIG[t.type];
        return (
          <div key={t.id} className="animate-slide-in" style={{
            background: bg, border: `1px solid ${border}`,
            color: "#fff", borderRadius: 12, padding: "13px 18px",
            fontSize: 14, fontWeight: 600,
            boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
            display: "flex", alignItems: "center", gap: 10,
            maxWidth: 360, minWidth: 240,
          }}>
            <Icon size={18} style={{ flexShrink: 0 }}/>
            <span style={{ flex: 1 }}>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
