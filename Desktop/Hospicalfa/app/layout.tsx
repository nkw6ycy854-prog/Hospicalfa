import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hospicalfamedical.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hospicalfa Medical | Insumos y Equipamiento Médico República Dominicana",
    template: "%s | Hospicalfa Medical",
  },
  description:
    "Distribuidores líderes de insumos y equipamiento médico en República Dominicana. Más de 2,000 productos certificados para hospitales, clínicas y farmacias. Entrega en las 32 provincias. Tel: (809) 555-0001",
  keywords: [
    "insumos médicos República Dominicana",
    "equipamiento médico RD",
    "material médico Santiago",
    "guantes médicos RD",
    "mascarillas N95 Santo Domingo",
    "tensiómetro digital Dominican Republic",
    "distribuidores médicos RD",
    "hospicalfa medical",
    "suministros hospitalarios",
    "insumos hospitalarios",
  ],
  authors: [{ name: "Hospicalfa Medical", url: SITE_URL }],
  creator: "Hospicalfa Medical",
  publisher: "Hospicalfa Medical",
  category: "Medical Supply",
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: SITE_URL,
    siteName: "Hospicalfa Medical",
    title: "Hospicalfa Medical — Insumos y Equipamiento Médico",
    description:
      "Distribuidores líderes de insumos médicos en República Dominicana. +2,000 productos certificados. Entrega nacional en 24-72h.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hospicalfa Medical" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hospicalfa",
    creator: "@hospicalfa",
    title: "Hospicalfa Medical — Insumos Médicos RD",
    description: "Distribuidores de insumos médicos en República Dominicana. +2,000 productos. Entrega en 32 provincias.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  verification: { google: "google-site-verification-token" },
};

export const viewport: Viewport = {
  themeColor: "#1B3A73",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD Structured Data — Local Business + Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": `${SITE_URL}/#organization`,
      "name": "Hospicalfa Medical",
      "legalName": "Hospicalfa Medical SRL",
      "url": SITE_URL,
      "logo": `${SITE_URL}/logo.png`,
      "image": `${SITE_URL}/og-image.png`,
      "description": "Distribuidores y vendedores de insumos y equipamiento médico certificado en República Dominicana.",
      "foundingDate": "2010",
      "taxID": "1-23456789-0",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. 27 de Febrero #145, Ensanche Piantini",
        "addressLocality": "Santiago de los Caballeros",
        "addressRegion": "Santiago",
        "postalCode": "51000",
        "addressCountry": "DO",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 19.4517, "longitude": -70.6970 },
      "telephone": "+18095550001",
      "email": "ventas@hospicalfa.do",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "14:00" },
      ],
      "priceRange": "$$",
      "currenciesAccepted": "DOP,USD",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "areaServed": { "@type": "Country", "name": "Dominican Republic" },
      "sameAs": [
        "https://www.facebook.com/hospicalfamedical",
        "https://www.instagram.com/hospicalfamedical",
        "https://www.linkedin.com/company/hospicalfa-medical",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Hospicalfa Medical",
      "description": "Insumos y Equipamiento Médico en República Dominicana",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-DO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
