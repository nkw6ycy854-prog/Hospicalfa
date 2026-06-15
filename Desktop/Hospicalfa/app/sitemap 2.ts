import { MetadataRoute } from "next";
const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hospicalfamedical.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: URL,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${URL}/#catalogo`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${URL}/#envios`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${URL}/#nosotros`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${URL}/#contacto`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${URL}/#blog`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
  ];
}
