// ═══════════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN CENTRAL DE LA EMPRESA
//  ───────────────────────────────────────────────────────────────────────
//  Todos los datos de la empresa están centralizados aquí como variables
//  claramente identificadas. Edite estos valores para actualizar el sitio
//  completo. NO son datos de ejemplo: reemplace con la información real de
//  Hospicalfa Medical antes de producción.
// ═══════════════════════════════════════════════════════════════════════════

export const COMPANY = {
  // ── Identidad ──────────────────────────────────────────────────────────
  name:        "Hospicalfa Medical",
  legalName:   "Hospicalfa Medical SRL",
  tagline:     "Insumos y Equipamiento Médico",
  slogan:      "Salud y calidad para la República Dominicana",
  foundedYear: 2010,

  // ── Datos legales/fiscales ─────────────────────────────────────────────
  rnc:               "1-23456789-0",          // RNC oficial (DGII)
  mercantilRegistry: "SD-123456",              // Registro Mercantil
  sanitaryLicense:   "MSP-2024-0987",          // Licencia Ministerio de Salud Pública

  // ── Contacto ───────────────────────────────────────────────────────────
  phone:        "+1 (809) 555-0001",
  phoneRaw:     "18095550001",                 // Para enlaces tel: y WhatsApp
  phoneSecondary:"+1 (809) 555-0002",
  whatsapp:     "18095550001",
  email:        "ventas@hospicalfa.do",
  emailSupport: "soporte@hospicalfa.do",

  // ── Ubicación ──────────────────────────────────────────────────────────
  address:     "Av. 27 de Febrero #145, Ensanche Piantini",
  city:        "Santiago de los Caballeros",
  province:    "Santiago",
  country:     "República Dominicana",
  postalCode:  "51000",
  geo:         { lat: 19.4517, lng: -70.6970 },
  // URL de Google Maps embed (reemplazar con la ubicación real)
  mapsEmbedUrl:"https://www.google.com/maps?q=Santiago+de+los+Caballeros+Dominican+Republic&output=embed",
  mapsLinkUrl: "https://www.google.com/maps/search/?api=1&query=19.4517,-70.6970",

  // ── Horario comercial ──────────────────────────────────────────────────
  schedule: {
    weekdays: "Lunes a Viernes: 8:00 AM – 6:00 PM",
    saturday: "Sábado: 8:00 AM – 2:00 PM",
    sunday:   "Domingo: Cerrado",
  },

  // ── Redes sociales ─────────────────────────────────────────────────────
  social: {
    facebook:  "https://www.facebook.com/hospicalfamedical",
    instagram: "https://www.instagram.com/hospicalfamedical",
    linkedin:  "https://www.linkedin.com/company/hospicalfa-medical",
    twitter:   "https://twitter.com/hospicalfa",
  },

  // ── Métricas / Trust signals ───────────────────────────────────────────
  stats: {
    yearsExperience: 15,
    products:        2000,
    activeClients:   500,
    provincesCovered:32,
    ordersDelivered: 25000,
    satisfactionRate:98,
  },
} as const;

// ── Certificaciones / Acreditaciones ──────────────────────────────────────
export const CERTIFICATIONS = [
  { icon:"🏛️", title:"Registro Mercantil",   detail:`No. ${COMPANY.mercantilRegistry}`, desc:"Empresa legalmente constituida en la Cámara de Comercio." },
  { icon:"📋", title:"RNC Activo",            detail:COMPANY.rnc,                         desc:"Registro Nacional del Contribuyente vigente ante la DGII." },
  { icon:"🏥", title:"Licencia Sanitaria",    detail:COMPANY.sanitaryLicense,            desc:"Autorizada por el Ministerio de Salud Pública (MSP)." },
  { icon:"✅", title:"ISO 9001:2015",         detail:"Gestión de Calidad",               desc:"Procesos certificados bajo estándares internacionales." },
  { icon:"🔬", title:"Productos Certificados",detail:"FDA / CE / NIOSH",                  desc:"Todos los productos cumplen normas internacionales." },
  { icon:"🚚", title:"Proveedor Autorizado",  detail:"Distribuidor Oficial",             desc:"Distribuidores autorizados de las principales marcas." },
];

// ── Marcas distribuidas (texto estilizado, sin logos con copyright) ───────
export const BRANDS = [
  { name:"3M",        category:"Protección respiratoria", color:"#E60012" },
  { name:"Abbott",    category:"Diagnóstico",             color:"#00529B" },
  { name:"BD",        category:"Inyectables",             color:"#CC0000" },
  { name:"Medtronic", category:"Equipamiento",            color:"#1010EB" },
  { name:"B. Braun",  category:"Soluciones IV",           color:"#00A859" },
  { name:"Cardinal",  category:"Insumos quirúrgicos",     color:"#C8102E" },
  { name:"Welch Allyn",category:"Diagnóstico clínico",    color:"#003C71" },
  { name:"Omron",     category:"Monitoreo de salud",      color:"#0066B3" },
];

// ── Equipo de trabajo ─────────────────────────────────────────────────────
export const TEAM = [
  { name:"Dr. Rafael Hernández", role:"Director General",          initials:"RH", area:"Dirección" },
  { name:"Lic. Carmen Jiménez",  role:"Gerente Comercial",         initials:"CJ", area:"Ventas" },
  { name:"Ing. Luis Martínez",   role:"Jefe de Logística",         initials:"LM", area:"Operaciones" },
  { name:"Dra. Patricia Gómez",  role:"Asesora Médica",            initials:"PG", area:"Calidad" },
  { name:"Lic. Roberto Sánchez", role:"Gerente de Almacén",        initials:"RS", area:"Inventario" },
  { name:"Lic. Ana Fernández",   role:"Servicio al Cliente",       initials:"AF", area:"Atención" },
];

// ── Casos de éxito ────────────────────────────────────────────────────────
export const CASE_STUDIES = [
  {
    client:    "Hospital Metropolitano",
    sector:    "Hospital privado · Santiago",
    challenge: "Necesitaban un proveedor confiable para abastecer 200 camas con insumos críticos.",
    result:    "Suministro mensual garantizado con 99.8% de cumplimiento en tiempo de entrega.",
    metric:    "99.8%",
    metricLabel:"Cumplimiento",
  },
  {
    client:    "Red de Farmacias El Progreso",
    sector:    "Cadena farmacéutica · Nacional",
    challenge: "Requerían reducir costos de adquisición sin sacrificar calidad de productos.",
    result:    "Ahorro del 18% anual mediante compras consolidadas y precios preferenciales.",
    metric:    "18%",
    metricLabel:"Ahorro anual",
  },
  {
    client:    "Centro Médico Cibao",
    sector:    "Centro de diagnóstico · La Vega",
    challenge: "Buscaban equipamiento de diagnóstico moderno con soporte técnico local.",
    result:    "Implementación completa de equipos con capacitación y mantenimiento incluido.",
    metric:    "24/7",
    metricLabel:"Soporte técnico",
  },
];

// ── Categorías del Blog ───────────────────────────────────────────────────
export const BLOG_CATEGORIES = [
  { id:"equipos",     name:"Equipos Médicos",        icon:"🔬", color:"#0D99CC", desc:"Guías y novedades sobre equipamiento médico." },
  { id:"insumos",     name:"Insumos Médicos",        icon:"💉", color:"#27AE60", desc:"Todo sobre material e insumos de uso clínico." },
  { id:"seguridad",   name:"Seguridad Hospitalaria", icon:"🛡️", color:"#1B3A73", desc:"Protocolos y bioseguridad en centros de salud." },
  { id:"clinicas",    name:"Guías para Clínicas",    icon:"🏥", color:"#7C3AED", desc:"Recursos para la gestión de clínicas y consultorios." },
  { id:"farmacias",   name:"Consejos para Farmacias",icon:"💊", color:"#F59E0B", desc:"Mejores prácticas para el sector farmacéutico." },
];

// ── Artículos del Blog (estructura lista para publicar) ───────────────────
export const BLOG_POSTS = [
  {
    id:1, category:"equipos",   title:"Cómo elegir el oxímetro de pulso adecuado para su clínica",
    excerpt:"Factores clave a considerar al seleccionar oxímetros: precisión, certificaciones y características esenciales para uso clínico.",
    date:"2026-05-15", readTime:"5 min", author:"Dra. Patricia Gómez", icon:"📊",
  },
  {
    id:2, category:"seguridad", title:"Protocolos de bioseguridad: guía completa 2026",
    excerpt:"Una guía actualizada sobre los protocolos de bioseguridad esenciales para proteger a su personal médico y pacientes.",
    date:"2026-05-10", readTime:"8 min", author:"Dr. Rafael Hernández", icon:"🛡️",
  },
  {
    id:3, category:"insumos",   title:"Guantes médicos: látex vs. nitrilo vs. vinilo",
    excerpt:"Comparativa detallada de los tipos de guantes médicos para ayudarle a elegir el más adecuado según su uso.",
    date:"2026-05-05", readTime:"6 min", author:"Lic. Carmen Jiménez", icon:"🧤",
  },
  {
    id:4, category:"farmacias", title:"Optimice el inventario de su farmacia en 5 pasos",
    excerpt:"Estrategias prácticas para gestionar el inventario de su farmacia, reducir mermas y mejorar la rentabilidad.",
    date:"2026-04-28", readTime:"7 min", author:"Lic. Roberto Sánchez", icon:"💊",
  },
  {
    id:5, category:"clinicas",  title:"Equipamiento básico para abrir un consultorio médico",
    excerpt:"Lista completa del equipamiento e insumos esenciales que necesita para poner en marcha su consultorio.",
    date:"2026-04-20", readTime:"10 min", author:"Dra. Patricia Gómez", icon:"🏥",
  },
  {
    id:6, category:"equipos",   title:"Mantenimiento preventivo de tensiómetros digitales",
    excerpt:"Consejos para alargar la vida útil de sus tensiómetros y garantizar mediciones precisas a lo largo del tiempo.",
    date:"2026-04-12", readTime:"4 min", author:"Ing. Luis Martínez", icon:"🩺",
  },
];

// ── Testimonios mejorados ─────────────────────────────────────────────────
export const TESTIMONIALS_EXT = [
  { name:"Dr. Carlos Herrera",  role:"Director Médico",       company:"Clínica Metropolitana",  rating:5,
    text:"Excelente calidad en todos sus productos. La entrega siempre puntual y precios competitivos. Son nuestro proveedor principal desde hace años.",
    years:"Cliente desde 2018" },
  { name:"Lic. Ana Rodríguez",  role:"Gerente de Compras",    company:"Hospital Unión Médica",  rating:5,
    text:"El servicio al cliente es excepcional. Siempre disponibles para resolver dudas y los productos llegan en perfectas condiciones a Santiago.",
    years:"Cliente desde 2020" },
  { name:"Dr. Juan Martínez",   role:"Propietario",            company:"Farmacia El Progreso",  rating:5,
    text:"Llevamos 8 años trabajando juntos. Precios justos, calidad garantizada y entrega confiable en toda la región norte del país.",
    years:"Cliente desde 2017" },
];

// ── Cobertura nacional (provincias destacadas) ────────────────────────────
export const COVERAGE_REGIONS = [
  { region:"Región Norte (Cibao)", provinces:["Santiago","La Vega","Puerto Plata","Moca","San Francisco de Macorís"], time:"24h" },
  { region:"Región Sur",           provinces:["Barahona","Azua","San Cristóbal","Baní","San Juan"],                   time:"48–72h" },
  { region:"Región Este",          provinces:["La Romana","Higüey","San Pedro de Macorís","Hato Mayor"],              time:"48h" },
  { region:"Distrito Nacional",    provinces:["Santo Domingo","DN"],                                                  time:"24h" },
];
