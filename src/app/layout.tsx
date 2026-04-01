import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AVOID · Sistema contra la pérdida de citas en clínicas de Osona',
  description: 'Especialistas en automatización de agendas para clínicas en Vic y comarca. Recupera ingresos eliminando citas olvidadas con nuestro sistema inteligente.',
  icons: {
    icon: '/favicon.ico', // o '/logo.png' si quieres usar el mismo logo
    shortcut: '/favicon.ico',
    apple: '/logo.png', // Esto es para cuando lo guardan en el iPhone
  },
  keywords: 'automatización clínicas Vic, gestión citas Osona, reducir ausencias pacientes, recordatorios whatsapp clínicas Cataluña',
  authors: [{ name: 'AVOID Studio' }],
  alternates: {
    canonical: 'https://avoidstudio.es',
  },
  openGraph: {
    title: 'AVOID · Elimina las ausencias en tu clínica de Osona',
    description: 'Sistema de recuperación de agenda 24/7 para centros de salud en Vic y alrededores.',
    type: 'website',
    url: 'https://avoidstudio.es',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

// CORRECCIÓN: Eliminamos userScalable: false para evitar penalizaciones de accesibilidad
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04040A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SCHEMA CORREGIDO: Más específico y sin listas de spam
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ITService", // Más específico que ProfessionalService
    "name": "AVOID Studio",
    "description": "Consultoría tecnológica especializada en la automatización de flujos de trabajo y reducción de no-shows para clínicas de salud.",
    "image": "https://avoidstudio.es/logo.png",
    "@id": "https://avoidstudio.es/#organization",
    "url": "https://avoidstudio.es",
    "telephone": "+34711556444", // Tu teléfono real
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vic",
      "addressRegion": "Osona",
      "postalCode": "08500",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.9301,
      "longitude": 2.2544
    },
    // Solo las ciudades principales con entidad de "Place"
    "areaServed": [
      { "@type": "City", "name": "Vic", "sameAs": "https://www.wikidata.org/wiki/Q13499" },
      { "@type": "City", "name": "Manlleu", "sameAs": "https://www.wikidata.org/wiki/Q13790" },
      { "@type": "City", "name": "Torelló", "sameAs": "https://www.wikidata.org/wiki/Q13852" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#04040A] text-white selection:bg-[#B8FF2E] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}