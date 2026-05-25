// ─── BRAND COLORS ──────────────────────────────────────────────────────────
export const COLORS = {
  navy:    "#1B3A73",
  navyDk:  "#0F2252",
  navyMd:  "#223F85",
  navyLt:  "#EEF3FB",
  teal:    "#0D99CC",
  tealDk:  "#0A7BA3",
  tealLt:  "#E0F4FC",
  green:   "#27AE60",
  greenLt: "#D1FAE5",
  amber:   "#F59E0B",
  red:     "#EF4444",
  bg:      "#F4F7FC",
  white:   "#FFFFFF",
  txt:     "#1A202C",
  muted:   "#64748B",
  border:  "#E2E8F0",
} as const;

// ─── TYPES ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  cat: string;
  price: number;
  stock: number;
  sku: string;
  feat: boolean;
  rating: number;
  icon: string;
  description?: string;
}

export interface Order {
  id: string;
  client: string;
  total: number;
  status: "Entregado" | "En tránsito" | "Procesando" | "Cancelado";
  date: string;
  prov: string;
}

export interface Customer {
  n: string;
  c: string;
  e: string;
  t: string;
  orders: number;
  total: number;
  prov: string;
}

export interface Province {
  name: string;
  delivery: number;
  rate: number;
}

// ─── PRODUCTS ───────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  { id:1,  name:"Guantes Látex Premium",        cat:"Protección",  price:850,   stock:450,  sku:"GLV-001", feat:true,  rating:4.8, icon:"🧤",  description:"Guantes de látex natural de alta resistencia para uso clínico y quirúrgico. Sin polvo, texturizados para mayor agarre." },
  { id:2,  name:"Mascarillas N95 Certificadas",  cat:"Protección",  price:1200,  stock:280,  sku:"MSK-001", feat:true,  rating:4.9, icon:"😷",  description:"Mascarillas de protección respiratoria N95 certificadas NIOSH. Filtran ≥95% de partículas en el aire." },
  { id:3,  name:"Jeringuillas Desechables 5ml",  cat:"Inyectables", price:320,   stock:1200, sku:"JRG-005", feat:false, rating:4.7, icon:"💉",  description:"Jeringuillas desechables de 5ml con aguja 21G×1½. Graduadas en 0.2ml. Estériles y libres de látex." },
  { id:4,  name:"Tensiómetro Digital Pro",       cat:"Diagnóstico", price:4500,  stock:35,   sku:"TEN-001", feat:true,  rating:4.6, icon:"🩺",  description:"Tensiómetro digital de brazo con detección de arritmias. Memoria para 2 usuarios × 60 lecturas. Display XL." },
  { id:5,  name:"Oxímetro de Pulso Clínico",     cat:"Diagnóstico", price:2800,  stock:62,   sku:"OXM-001", feat:true,  rating:4.8, icon:"📊",  description:"Oxímetro de pulso para dedo con SpO2, frecuencia cardíaca y perfusión. Pantalla OLED dual." },
  { id:6,  name:"Vendas Elásticas 4\"",           cat:"Curación",    price:180,   stock:800,  sku:"VND-004", feat:false, rating:4.5, icon:"🩹",  description:"Vendas de crepe 4\" × 4.5m con alta elasticidad. Ideal para compresión y soporte articular." },
  { id:7,  name:"Termómetro Infrarrojo",         cat:"Diagnóstico", price:3200,  stock:18,   sku:"TRM-IR1", feat:true,  rating:4.7, icon:"🌡️", description:"Termómetro infrarrojo sin contacto con lectura en 1 segundo. Memoria 32 lecturas. Silencioso modo noche." },
  { id:8,  name:"Glucómetro Avanzado",           cat:"Diagnóstico", price:5800,  stock:24,   sku:"GLU-001", feat:true,  rating:4.9, icon:"🔬",  description:"Glucómetro con pantalla a color y Bluetooth. App móvil incluida. Requiere muestra de 0.5µl." },
  { id:9,  name:"Gasa Estéril 10×10cm",          cat:"Curación",    price:90,    stock:2000, sku:"GSA-001", feat:false, rating:4.6, icon:"🏥",  description:"Gasa tejida 100% algodón 10×10cm, 12 capas, estéril. Paquete × 10 unidades." },
  { id:10, name:"Bata Desechable XL",            cat:"Protección",  price:650,   stock:150,  sku:"BAT-XL1", feat:false, rating:4.5, icon:"🥼",  description:"Bata desechable de polipropileno reforzado. Puños elásticos, cuello en V. Talla XL. Paquete × 10." },
  { id:11, name:"Catéter Urinario 14Fr",         cat:"Catéteres",   price:480,   stock:340,  sku:"CAT-014", feat:false, rating:4.3, icon:"💊",  description:"Catéter de Foley de 2 vías 14Fr, silicona 100%. Balón 10ml. Estéril, uso único." },
  { id:12, name:"Algodón Médico 500g",           cat:"Curación",    price:250,   stock:600,  sku:"ALG-500", feat:false, rating:4.4, icon:"🧻",  description:"Algodón médico absorbente 100% puro. Rollo 500g. Libre de sustancias irritantes." },
];

export const CATEGORIES = ["Todas","Protección","Diagnóstico","Curación","Inyectables","Catéteres"] as const;

export const CATEGORY_CARDS = [
  { icon:"🛡️", name:"Protección",   count:45 },
  { icon:"🔬", name:"Diagnóstico",  count:38 },
  { icon:"🩹", name:"Curación",     count:62 },
  { icon:"💉", name:"Inyectables",  count:29 },
  { icon:"🏥", name:"Catéteres",    count:21 },
  { icon:"⚕️", name:"Equipamiento", count:34 },
];

// ─── ORDERS ─────────────────────────────────────────────────────────────────
export const ORDERS: Order[] = [
  { id:"ORD-2026-001", client:"Clínica Metropolitana",       total:45800,  status:"Entregado",   date:"21 May", prov:"Sto. Domingo" },
  { id:"ORD-2026-002", client:"Hospital Unión Médica",       total:128500, status:"En tránsito", date:"20 May", prov:"Santiago"     },
  { id:"ORD-2026-003", client:"Centro Médico Cibao",         total:67200,  status:"Procesando",  date:"20 May", prov:"La Vega"      },
  { id:"ORD-2026-004", client:"Farmacia El Progreso",        total:23400,  status:"Entregado",   date:"19 May", prov:"Pto. Plata"   },
  { id:"ORD-2026-005", client:"Clínica San Lucas",           total:89700,  status:"Cancelado",   date:"19 May", prov:"San Pedro"    },
  { id:"ORD-2026-006", client:"Hosp. Dr. Calventi",          total:234000, status:"En tránsito", date:"18 May", prov:"Sto. Domingo" },
];

// ─── CUSTOMERS ──────────────────────────────────────────────────────────────
export const CUSTOMERS: Customer[] = [
  { n:"Clínica Metropolitana",     c:"Dr. Ramírez",    e:"compras@clinicametro.do", t:"Clínica",       orders:24, total:485000,  prov:"Sto. Domingo" },
  { n:"Hospital Unión Médica",     c:"Dra. Fernández", e:"compras@unionmedica.com", t:"Hospital",      orders:18, total:892000,  prov:"Santiago"     },
  { n:"Centro Médico Cibao",       c:"Lic. Herrera",   e:"cmc@cibao.med",           t:"Centro Médico", orders:31, total:324000,  prov:"La Vega"      },
  { n:"Farmacia El Progreso",      c:"Farm. García",   e:"fprogreso@gmail.com",     t:"Farmacia",      orders:12, total:187000,  prov:"Pto. Plata"   },
  { n:"Hosp. Dr. V. Calventi",     c:"Dr. Castillo",   e:"hvincio@gov.do",          t:"Hospital",      orders:8,  total:1240000, prov:"Sto. Domingo" },
];

// ─── REVENUE ────────────────────────────────────────────────────────────────
export const REVENUE = [
  { m:"Ene", i:385, g:112, p:145 },{ m:"Feb", i:420, g:128, p:162 },{ m:"Mar", i:398, g:119, p:153 },
  { m:"Abr", i:465, g:145, p:179 },{ m:"May", i:512, g:163, p:197 },{ m:"Jun", i:489, g:151, p:188 },
  { m:"Jul", i:543, g:172, p:209 },{ m:"Ago", i:598, g:191, p:230 },{ m:"Sep", i:572, g:182, p:220 },
  { m:"Oct", i:634, g:204, p:244 },{ m:"Nov", i:695, g:225, p:267 },{ m:"Dic", i:748, g:241, p:288 },
];

// ─── PIE ────────────────────────────────────────────────────────────────────
export const PIE_DATA = [
  { name:"Protección",  v:35 },{ name:"Diagnóstico", v:25 },
  { name:"Curación",    v:22 },{ name:"Inyectables",  v:10 },
  { name:"Otros",       v:8  },
];
export const PIE_COLORS = [COLORS.teal, COLORS.navy, COLORS.green, "#7C3AED", "#D97706"];

// ─── STOCK ALERTS ────────────────────────────────────────────────────────────
export const STOCK_ALERTS = [
  { prod:"Termómetro Infrarrojo",   stock:18,  min:25,  s:"critical" as const },
  { prod:"Tensiómetro Digital Pro", stock:35,  min:40,  s:"low"      as const },
  { prod:"Glucómetro Avanzado",     stock:24,  min:30,  s:"low"      as const },
  { prod:"Bata Desechable XL",      stock:150, min:200, s:"low"      as const },
];

// ─── PROVINCES ───────────────────────────────────────────────────────────────
export const PROVINCES: Province[] = [
  { name:"Distrito Nacional",          delivery:1, rate:0   },
  { name:"Santo Domingo",              delivery:1, rate:150 },
  { name:"Santiago",                   delivery:2, rate:350 },
  { name:"La Vega",                    delivery:2, rate:400 },
  { name:"San Cristóbal",              delivery:2, rate:300 },
  { name:"Puerto Plata",               delivery:3, rate:500 },
  { name:"San Pedro de Macorís",       delivery:2, rate:350 },
  { name:"La Romana",                  delivery:2, rate:400 },
  { name:"Moca",                       delivery:3, rate:450 },
  { name:"Bonao",                      delivery:3, rate:450 },
  { name:"San Francisco de Macorís",   delivery:3, rate:480 },
  { name:"Higüey",                     delivery:3, rate:500 },
  { name:"Barahona",                   delivery:4, rate:650 },
  { name:"Mao",                        delivery:4, rate:600 },
  { name:"Azua",                       delivery:4, rate:600 },
  { name:"Cotuí",                      delivery:3, rate:480 },
  { name:"Nagua",                      delivery:3, rate:500 },
  { name:"Hato Mayor",                 delivery:3, rate:480 },
  { name:"Monte Plata",                delivery:2, rate:380 },
  { name:"Bani",                       delivery:2, rate:300 },
];

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { n:"Dr. Carlos Herrera",  r:"Director Médico, Clínica Metropolitana",    t:"Excelente calidad en todos sus productos. La entrega siempre puntual y el precio muy competitivo. Hospicalfa Medical es nuestro proveedor principal desde hace años." },
  { n:"Lic. Ana Rodríguez",  r:"Gerente de Compras, Hospital Unión Médica", t:"El servicio al cliente es excepcional. Siempre disponibles para resolver cualquier duda y los productos llegan en perfectas condiciones a Santiago." },
  { n:"Dr. Juan Martínez",   r:"Propietario, Farmacia El Progreso",         t:"Llevamos 8 años trabajando con Hospicalfa Medical. Precios justos, calidad garantizada y entrega confiable en toda la región norte del país." },
];
