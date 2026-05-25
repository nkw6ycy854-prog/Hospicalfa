import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hospicalfa Medical — Insumos y Equipamiento Médico",
    template: "%s | Hospicalfa Medical",
  },
  description:
    "Distribución y venta de insumos y equipamiento médico certificado en República Dominicana. Más de 2,000 productos para clínicas, hospitales y farmacias.",
  keywords: [
    "insumos médicos",
    "equipamiento médico",
    "República Dominicana",
    "material médico",
    "guantes médicos",
    "mascarillas",
    "jeringuillas",
    "tensiómetro",
    "oxímetro",
    "hospicalfa",
  ],
  authors: [{ name: "Hospicalfa Medical" }],
  creator: "Hospicalfa Medical",
  publisher: "Hospicalfa Medical",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hospicalfamedical.com"
  ),
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "/",
    siteName: "Hospicalfa Medical",
    title: "Hospicalfa Medical — Insumos y Equipamiento Médico",
    description:
      "Distribución y venta de insumos médicos en República Dominicana. Entrega a todas las provincias.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hospicalfa Medical",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospicalfa Medical",
    description: "Insumos y Equipamiento Médico — República Dominicana",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#1B3A73",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
