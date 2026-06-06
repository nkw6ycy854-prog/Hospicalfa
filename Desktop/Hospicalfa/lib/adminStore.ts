"use client";
import { useReducer, useCallback, createContext, useContext } from "react";
import {
  PRODUCTS as INIT_PRODUCTS, ORDERS as INIT_ORDERS,
  CUSTOMERS as INIT_CUSTOMERS, PROVINCES as INIT_PROVINCES,
  type Product, type Order, type Customer, type Province,
} from "./data";

// ─── EXTENDED TYPES ───────────────────────────────────────────────────────────
export interface AdminProduct extends Product {
  active: boolean;
  costPrice: number;
  supplier: string;
  notes: string;
  lastUpdated: string;
}

export interface AdminOrder extends Order {
  address: string;
  email: string;
  phone: string;
  payMethod: string;
  notes: string;
  trackingNum: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCustomer extends Customer {
  status: "active" | "inactive" | "blocked";
  rnc: string;
  address: string;
  notes: string;
  creditLimit: number;
  joinedAt: string;
  lastOrder: string;
  discount: number;
}

export interface AdminProvince extends Province {
  active: boolean;
  expressRate: number;
  expressDays: number;
  carrier: string;
  notes: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "superadmin" | "admin" | "vendedor" | "inventario" | "contabilidad";
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar: string;
}

export interface WebsiteContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    badge: string;
  };
  about: {
    title: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    schedule: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  featuredProductIds: number[];
  showShippingBanner: boolean;
  maintenanceMode: boolean;
  freeShippingThreshold: number;
}

export interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  type: "entrada" | "salida" | "ajuste" | "devolucion";
  qty: number;
  before: number;
  after: number;
  reason: string;
  user: string;
  date: string;
}

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const toAdminProduct = (p: Product): AdminProduct => ({
  ...p,
  active: true,
  costPrice: Math.round(p.price * 0.6),
  supplier: ["MedSupply RD", "Global Med", "Caribe Medical", "BioTech DR"][p.id % 4],
  notes: "",
  lastUpdated: "2026-05-21",
});

const toAdminOrder = (o: Order): AdminOrder => ({
  ...o,
  address: `Calle Principal #${Math.floor(Math.random() * 100) + 1}, ${o.prov}`,
  email: `compras@${o.client.toLowerCase().replace(/\s/g, "")}.do`,
  phone: `809-555-${String(1000 + o.total % 9000).slice(0,4)}`,
  payMethod: ["transferencia","tarjeta","efectivo","cheque"][o.total % 4],
  notes: "",
  trackingNum: o.status === "Entregado" || o.status === "En tránsito"
    ? `TRK${o.id.replace("ORD-","")}` : "",
  createdAt: `2026-05-${o.date.split(" ")[0].padStart(2,"0")}`,
  updatedAt: "2026-05-21",
});

const toAdminCustomer = (c: Customer): AdminCustomer => ({
  ...c,
  status: "active",
  rnc: `1-${Math.floor(10000000 + Math.random() * 90000000)}-${Math.floor(Math.random() * 9)}`,
  address: `Av. Principal #${Math.floor(Math.random() * 200) + 1}, ${c.prov}`,
  notes: "",
  creditLimit: [50000, 100000, 200000, 500000][c.orders % 4],
  joinedAt: c.since,
  lastOrder: "2026-05-20",
  discount: [0, 5, 10, 15][c.orders % 4],
});

const toAdminProvince = (p: Province): AdminProvince => ({
  ...p,
  active: true,
  expressRate: p.rate === 0 ? 350 : Math.round(p.rate * 1.8),
  expressDays: Math.max(1, p.delivery - 1),
  carrier: ["Caribe Express", "DHL RD", "Urgente RD", "MotoMensajero"][p.rate % 4] ?? "Caribe Express",
  notes: "",
});

const INIT_USERS: AdminUser[] = [
  { id:1, name:"Carlos Administrador", email:"admin@hospicalfa.do",    role:"superadmin",  status:"active",   lastLogin:"2026-05-21 09:14", createdAt:"2024-01-01", permissions:["all"],          avatar:"C" },
  { id:2, name:"María Ventas",          email:"ventas@hospicalfa.do",   role:"vendedor",    status:"active",   lastLogin:"2026-05-21 08:30", createdAt:"2024-03-15", permissions:["orders","customers"], avatar:"M" },
  { id:3, name:"Juan Inventario",       email:"inventario@hospicalfa.do",role:"inventario",  status:"active",   lastLogin:"2026-05-20 17:00", createdAt:"2024-06-01", permissions:["inventory","products"], avatar:"J" },
  { id:4, name:"Ana Contabilidad",      email:"conta@hospicalfa.do",    role:"contabilidad",status:"active",   lastLogin:"2026-05-19 15:45", createdAt:"2025-01-10", permissions:["finance"],      avatar:"A" },
  { id:5, name:"Pedro Gestor",          email:"pedro@hospicalfa.do",    role:"admin",       status:"inactive", lastLogin:"2026-04-30 10:00", createdAt:"2025-03-01", permissions:["orders","inventory","products"], avatar:"P" },
];

const INIT_CONTENT: WebsiteContent = {
  hero: {
    headline: "Insumos Médicos de Calidad Premium para su Institución",
    subheadline: "Distribuimos y vendemos equipamiento e insumos médicos certificados a clínicas, hospitales y farmacias en toda la República Dominicana.",
    ctaText: "Ver Catálogo Completo",
    badge: "🇩🇴 República Dominicana · Distribución Nacional a las 32 provincias",
  },
  about: {
    title: "Hospicalfa Medical",
    description: "Empresa dominicana especializada en distribución y venta de insumos y equipamiento médico certificado desde 2010.",
    phone: "+1 (809) 555-0001",
    email: "ventas@hospicalfa.do",
    address: "Santiago de los Caballeros, República Dominicana",
    schedule: "Lun–Vie: 8:00 AM – 6:00 PM · Sáb: 8:00 AM – 2:00 PM",
  },
  seo: {
    title: "Hospicalfa Medical — Insumos y Equipamiento Médico",
    description: "Distribución y venta de insumos médicos en República Dominicana.",
    keywords: "insumos médicos, equipamiento médico, República Dominicana",
  },
  featuredProductIds: [1, 2, 4, 5, 7, 8],
  showShippingBanner: true,
  maintenanceMode: false,
  freeShippingThreshold: 10000,
};

const INIT_MOVEMENTS: StockMovement[] = [
  { id:1, productId:1, productName:"Guantes Látex Premium",      type:"entrada",   qty:200, before:250, after:450, reason:"Compra proveedor",      user:"Juan", date:"2026-05-20" },
  { id:2, productId:7, productName:"Termómetro Infrarrojo",       type:"salida",    qty:12,  before:30,  after:18,  reason:"Pedido ORD-2026-002",    user:"María",date:"2026-05-20" },
  { id:3, productId:8, productName:"Glucómetro Avanzado",         type:"ajuste",    qty:-6,  before:30,  after:24,  reason:"Ajuste conteo físico",   user:"Juan", date:"2026-05-19" },
  { id:4, productId:4, productName:"Tensiómetro Digital Pro",     type:"entrada",   qty:20,  before:15,  after:35,  reason:"Compra proveedor",      user:"Juan", date:"2026-05-18" },
  { id:5, productId:2, productName:"Mascarillas N95 Certificadas",type:"salida",    qty:50,  before:330, after:280, reason:"Pedido ORD-2026-001",    user:"María",date:"2026-05-17" },
  { id:6, productId:10,productName:"Bata Desechable XL",          type:"devolucion",qty:5,   before:145, after:150, reason:"Devolución cliente",     user:"María",date:"2026-05-16" },
];

// ─── STATE & ACTIONS ──────────────────────────────────────────────────────────
export interface AdminState {
  products:   AdminProduct[];
  orders:     AdminOrder[];
  customers:  AdminCustomer[];
  provinces:  AdminProvince[];
  users:      AdminUser[];
  content:    WebsiteContent;
  movements:  StockMovement[];
}

type Action =
  // Products
  | { type:"UPD_PRODUCT";  product: AdminProduct }
  | { type:"ADD_PRODUCT";  product: AdminProduct }
  | { type:"DEL_PRODUCT";  id: number }
  // Orders
  | { type:"UPD_ORDER";    order: AdminOrder }
  | { type:"DEL_ORDER";    id: string }
  // Customers
  | { type:"UPD_CUSTOMER"; customer: AdminCustomer }
  | { type:"ADD_CUSTOMER"; customer: AdminCustomer }
  | { type:"DEL_CUSTOMER"; name: string }
  // Provinces
  | { type:"UPD_PROVINCE"; province: AdminProvince }
  // Users
  | { type:"ADD_USER";     user: AdminUser }
  | { type:"UPD_USER";     user: AdminUser }
  | { type:"DEL_USER";     id: number }
  // Content
  | { type:"UPD_CONTENT";  content: WebsiteContent }
  // Stock
  | { type:"ADJUST_STOCK"; productId:number; delta:number; reason:string; user:string };

function reducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case "UPD_PRODUCT":
      return { ...state, products: state.products.map(p => p.id === action.product.id ? action.product : p) };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.product] };
    case "DEL_PRODUCT":
      return { ...state, products: state.products.filter(p => p.id !== action.id) };
    case "UPD_ORDER":
      return { ...state, orders: state.orders.map(o => o.id === action.order.id ? action.order : o) };
    case "DEL_ORDER":
      return { ...state, orders: state.orders.filter(o => o.id !== action.id) };
    case "UPD_CUSTOMER":
      return { ...state, customers: state.customers.map(c => c.n === action.customer.n ? action.customer : c) };
    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, action.customer] };
    case "DEL_CUSTOMER":
      return { ...state, customers: state.customers.filter(c => c.n !== action.name) };
    case "UPD_PROVINCE":
      return { ...state, provinces: state.provinces.map(p => p.name === action.province.name ? action.province : p) };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.user] };
    case "UPD_USER":
      return { ...state, users: state.users.map(u => u.id === action.user.id ? action.user : u) };
    case "DEL_USER":
      return { ...state, users: state.users.filter(u => u.id !== action.id) };
    case "UPD_CONTENT":
      return { ...state, content: action.content };
    case "ADJUST_STOCK": {
      const mov: StockMovement = {
        id: state.movements.length + 1,
        productId: action.productId,
        productName: state.products.find(p=>p.id===action.productId)?.name ?? "",
        type: action.delta > 0 ? "entrada" : action.delta < 0 ? "salida" : "ajuste",
        qty: Math.abs(action.delta),
        before: state.products.find(p=>p.id===action.productId)?.stock ?? 0,
        after: Math.max(0, (state.products.find(p=>p.id===action.productId)?.stock ?? 0) + action.delta),
        reason: action.reason,
        user: action.user,
        date: new Date().toISOString().split("T")[0],
      };
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.productId
            ? { ...p, stock: Math.max(0, p.stock + action.delta), lastUpdated: new Date().toISOString().split("T")[0] }
            : p
        ),
        movements: [mov, ...state.movements],
      };
    }
    default: return state;
  }
}

const INIT_STATE: AdminState = {
  products:  INIT_PRODUCTS.map(toAdminProduct),
  orders:    INIT_ORDERS.map(toAdminOrder),
  customers: INIT_CUSTOMERS.map(toAdminCustomer),
  provinces: INIT_PROVINCES.map(toAdminProvince),
  users:     INIT_USERS,
  content:   INIT_CONTENT,
  movements: INIT_MOVEMENTS,
};

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
import React from "react";

interface AdminCtx { state: AdminState; dispatch: React.Dispatch<Action> }
export const AdminContext = createContext<AdminCtx>({
  state: INIT_STATE,
  dispatch: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return React.createElement(AdminContext.Provider, { value: { state, dispatch } }, children);
}

export function useAdmin() {
  return useContext(AdminContext);
}
