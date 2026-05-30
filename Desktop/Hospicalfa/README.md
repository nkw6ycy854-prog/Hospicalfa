# ⚕️ Hospicalfa Medical — Plataforma Web Empresarial

Plataforma web completa para distribución y venta de insumos y equipamiento médico en República Dominicana.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Estilos | Tailwind CSS 3 |
| Gráficas | Recharts 2 |
| Iconos | Lucide React |
| Animaciones | Framer Motion |
| Fuente | Outfit (Google Fonts) |
| Deploy | Vercel |

---

## 📁 Estructura del Proyecto

```
hospicalfa-medical/
├── app/
│   ├── globals.css          # Estilos globales + animaciones
│   ├── layout.tsx           # Root layout con SEO metadata
│   └── page.tsx             # Página raíz
│
├── components/
│   ├── HospicalfaPlatform.tsx   # Componente principal (router)
│   ├── ui/
│   │   ├── Logo.tsx             # Logo de la marca
│   │   ├── Badge.tsx            # Badge de estado de pedidos
│   │   ├── MetricCard.tsx       # Tarjeta de KPI/métrica
│   │   ├── ProductCard.tsx      # Tarjeta de producto
│   │   └── Toast.tsx            # Notificación toast
│   ├── public/
│   │   ├── Navbar.tsx           # Navegación pública
│   │   ├── Footer.tsx           # Pie de página
│   │   ├── HomePage.tsx         # Página de inicio
│   │   ├── CatalogPage.tsx      # Catálogo con filtros
│   │   ├── ProductDetailPage.tsx# Detalle de producto
│   │   └── ShippingPage.tsx     # Tarifas de envío
│   └── admin/
│       ├── AdminLayout.tsx      # Layout con sidebar admin
│       ├── Dashboard.tsx        # Dashboard principal
│       ├── AdminProducts.tsx    # Gestión de productos
│       └── AdminModules.tsx     # Pedidos, Inventario, Finanzas, Clientes, Config
│
├── lib/
│   ├── data.ts              # Datos mock + tipos TypeScript
│   └── utils.ts             # Funciones utilitarias
│
├── public/
│   └── robots.txt
│
├── .env.example             # Variables de entorno (plantilla)
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json              # Config de deploy
└── package.json
```

---

## ⚡ Instalación y Ejecución Local

### Prerrequisitos
- Node.js ≥ 18.17.0
- npm ≥ 9

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/hospicalfa-medical.git
cd hospicalfa-medical
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
# Editar .env.local con tus valores reales
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy en Vercel

### Opción A — Desde GitHub (recomendado)

1. Subir el proyecto a un repositorio de GitHub
2. Ir a [vercel.com](https://vercel.com) → **Add New Project**
3. Importar el repositorio
4. Agregar las variables de entorno desde `.env.example`
5. Click en **Deploy** ✅

### Opción B — Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (desde la carpeta del proyecto)
vercel

# Deploy a producción
vercel --prod
```

---

## 🎨 Branding / Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| Navy | `#1B3A73` | Color primario institucional |
| Navy Dark | `#0F2252` | Fondos oscuros, gradientes |
| Teal | `#0D99CC` | Acento, CTAs secundarios |
| Teal Light | `#E0F4FC` | Fondos suaves, badges |
| Green | `#27AE60` | Estados positivos, stock OK |
| Amber | `#F59E0B` | Advertencias, stock bajo |
| Red | `#EF4444` | Errores, stock crítico |

---

## 📄 Módulos de la Plataforma

### Sitio Público
- **Home** — Hero, categorías, productos destacados, beneficios, testimonios
- **Catálogo** — Grid con búsqueda, filtro por categoría y ordenamiento
- **Producto** — Galería, descripción, qty selector, cotización
- **Envíos** — Tarifas para 20 provincias de RD
- **Sobre Nosotros** — Historia, misión, visión, stats
- **Contacto** — Formulario + info de contacto

### Panel Administrativo (`/admin`)
- **Dashboard** — KPIs, gráficas área/pie, pedidos recientes, alertas
- **Productos** — CRUD con tabla, búsqueda, badges de estado
- **Pedidos** — Gestión completa con estados
- **Inventario** — Bar chart de stock + alertas críticas
- **Finanzas** — Ingresos, ganancias, márgenes, exportar
- **Clientes** — Base de datos con historial y totales
- **Configuración** — 8 módulos de ajustes

---

## 🔧 Scripts Disponibles

```bash
npm run dev      # Desarrollo local (hot reload)
npm run build    # Build de producción
npm run start    # Servidor de producción local
npm run lint     # Linter ESLint
```

---

## 📦 Próximas Mejoras (Roadmap)

- [ ] Integración con base de datos PostgreSQL + Prisma
- [ ] Autenticación JWT con roles (admin, empleado, cliente)
- [ ] API REST con Next.js Route Handlers
- [ ] Carrito persistente con localStorage
- [ ] Checkout con métodos de pago (Cardnet, Azul)
- [ ] Emails automáticos con Resend
- [ ] Tracking de pedidos en tiempo real
- [ ] Sistema de cotizaciones PDF
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Desarrollado para

**Hospicalfa Medical**  
Distribución y Venta de Insumos y Equipamiento Médico  
Santiago de los Caballeros, República Dominicana 🇩🇴

---

© 2026 Hospicalfa Medical. Todos los derechos reservados.
