import type { Metadata, Viewport } from 'next'
import './globals.css'

// ── METADATA ────────────────────────────────────────────────────
// Title: intención de búsqueda local + solución específica. Sin palabras en inglés.
// Description: problema → solución → zona → CTA implícito. Max 155 chars.
export const metadata: Metadata = {
  title: 'Automatización de citas para clínicas en Vic y Osona · AVOID Studio',
  description: 'Eliminamos los no-shows en clínicas de Vic, Manlleu y Torelló con WhatsApp + Google Calendar. Setup 72h. Sin cambiar tu software. Diagnóstico gratuito.',
  // ── AÑADE ESTA PARTE AQUÍ ──
  icons: {
    icon: '/favicon.png', // Esto le dice a Next.js que use tu nuevo PNG
    shortcut: '/favicon.png',
    apple: '/favicon.png', // Opcional: puedes usar el mismo para dispositivos Apple
  },
  // ───────────────────────────
  keywords: [
    'automatización citas clínicas Vic',
    'eliminar no-shows fisioterapia Osona',
    'recordatorios WhatsApp clínica dental Vic',
    'sistema gestión citas Manlleu',
    'automatizar agenda clínica Torelló',
    'reducir ausencias citas médicas Osona',
    'gestión automática citas fisioterapia Vic',
    'recordatorio citas automático clínica',
    'agenda inteligente clínicas comarca Osona',
    'reactivación pacientes clínica dental Vic',
    'automatización WhatsApp clínica privada',
    'sistema anti no-show clínica',
  ].join(', '),
  authors: [{ name: 'AVOID Studio', url: 'https://avoidstudio.es' }],
  creator: 'AVOID Studio',
  publisher: 'AVOID Studio',
  alternates: { canonical: 'https://avoidstudio.es' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Automatización de citas para clínicas en Vic y Osona · AVOID Studio',
    description: 'Reducimos los no-shows entre el 35% y el 45% con WhatsApp + Google Calendar. Sin cambiar tu software. Setup en 72h.',
    type: 'website',
    url: 'https://avoidstudio.es',
    siteName: 'AVOID Studio',
    locale: 'es_ES',
    images: [{
      url: 'https://avoidstudio.es/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AVOID Studio – Automatización de citas para clínicas en Osona',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatización de citas para clínicas · Vic y Osona',
    description: 'Eliminamos los no-shows con WhatsApp + Google Calendar. Sin cambiar tu software.',
    images: ['https://avoidstudio.es/og-image.jpg'],
  },
}

// userScalable eliminado: Google penaliza bloqueo de zoom en móvil desde 2021
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04040A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // ── SCHEMA 1: LocalBusiness + ITService ─────────────────────
  // @type doble para máxima cobertura: servicio profesional + tecnología
  // areaServed: objetos Place estructurados (más peso que strings sueltos)
  // Placeholders marcados con ← para que los sustituyas antes de publicar
  const schemaLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'ITService'],
    '@id': 'https://avoidstudio.es/#business',
    name: 'AVOID Studio',
    alternateName: 'Avoid Strategic Studio',
    description: 'Agencia de automatización de citas para clínicas en Osona. Eliminamos los no-shows con WhatsApp y Google Calendar. Fisioterapia, odontología, estética médica y psicología en Vic, Manlleu, Torelló y comarca.',
    url: 'https://avoidstudio.es',
    logo: { '@type': 'ImageObject', url: 'https://avoidstudio.es/logo.png', width: 512, height: 512 },
    image: 'https://avoidstudio.es/og-image.jpg',
    telephone: '+34600000000',        // ← Sustituye por tu número real
    email: 'hola@avoidstudio.es',     // ← Sustituye por tu email real
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vic',
      addressRegion: 'Osona',
      postalCode: '08500',
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 41.9301, longitude: 2.2544 },
    // hasMap: obtén el CID en maps.google.com buscando tu negocio → compartir → copia la URL
    hasMap: 'https://maps.google.com/?cid=TU_CID_AQUI', // ← Sustituye
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    }],
    knowsLanguage: ['es', 'ca'], // catalán + castellano para búsquedas locales
    sameAs: [
      'https://www.linkedin.com/company/avoidstudio',  // ← Sustituye por URLs reales
      'https://www.instagram.com/avoidstudio',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sistemas de automatización para clínicas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automatización de citas con WhatsApp para clínicas en Osona',
            description: 'Recordatorios y confirmaciones automáticas por WhatsApp que reducen los no-shows entre el 35% y el 45%.',
            areaServed: 'Osona',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reactivación de pacientes inactivos',
            description: 'Flujo automático que contacta a pacientes que no han vuelto en 90 días para recuperar facturación perdida.',
            areaServed: 'Osona',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gestión automática de reseñas Google para clínicas',
            description: 'Sistema que solicita reseñas 24h después de cada visita para mejorar el posicionamiento local en Google Maps.',
            areaServed: 'Osona',
          },
        },
      ],
    },
    // Municipios prioritarios primero, después comarca completa y limítrofes
    areaServed: [
      { '@type': 'City', name: 'Vic',                     containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Manlleu',                 containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Torelló',                 containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Tona',                    containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Centelles',               containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Roda de Ter',             containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Taradell',                containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Hipòlit de Voltregà',containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Gurb',                    containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Folgueroles',             containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Pere de Torelló',    containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Santa Eugènia de Berga',  containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Calldetenes',             containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'AdministrativeArea', name: 'Osona',     containedInPlace: { '@type': 'AdministrativeArea', name: 'Catalunya' } },
      // Zonas limítrofes para expansión
      { '@type': 'City', name: 'Granollers',  containedInPlace: { '@type': 'AdministrativeArea', name: 'Vallès Oriental' } },
      { '@type': 'City', name: 'Berga',       containedInPlace: { '@type': 'AdministrativeArea', name: 'Berguedà' } },
      { '@type': 'City', name: 'Ripoll',      containedInPlace: { '@type': 'AdministrativeArea', name: 'Ripollès' } },
    ],
  }

  // ── SCHEMA 2: FAQPage ─────────────────────────────────────────
  // Las preguntas se muestran expandidas en Google → aumenta el CTR sin subir de posición
  // Incluye keywords locales en las respuestas (Vic, Osona, etc.)
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Tengo que cambiar el software de gestión de mi clínica en Vic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El sistema AVOID funciona con Google Calendar, que ya usas, y se conecta sin necesidad de migrar datos ni instalar nada nuevo. Compatible con cualquier clínica de Vic, Manlleu, Torelló y comarca de Osona.',
        },
      },
      {
        '@type': 'Question',
        name: '¿En cuánto tiempo se instala el sistema de automatización?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El setup completo tarda 72 horas desde que confirmamos la implementación. Solo necesitamos 2 horas de tu tiempo para el diagnóstico inicial y la validación final.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Funciona para clínicas dentales, fisioterapia y estética en Osona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El sistema está diseñado para cualquier clínica privada que viva de las citas: fisioterapia, odontología, psicología, nutrición y estética médica en Vic, Manlleu, Torelló, Tona, Centelles y toda la comarca de Osona.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto se reduce la tasa de no-shows?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los recordatorios automáticos por WhatsApp reducen los no-shows entre el 35% y el 45%, según estudios de clínicas privadas de salud con sistemas similares. En clínicas dentales y de estética de Osona hemos registrado reducciones del 40-42%.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa con la privacidad de los datos de mis pacientes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Todas las automatizaciones cumplen el RGPD. Los datos de los pacientes se usan exclusivamente para los recordatorios y confirmaciones autorizados por el profesional. No se comparten con terceros.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto cuesta la automatización de citas para una clínica en Osona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El coste varía según la complejidad del sistema y el tamaño de la clínica. Ofrecemos un diagnóstico gratuito de 30 minutos donde analizamos tu operativa y presentamos un presupuesto personalizado sin compromiso.',
        },
      },
    ],
  }

  // ── SCHEMA 3: BreadcrumbList ──────────────────────────────────
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio',               item: 'https://avoidstudio.es' },
      { '@type': 'ListItem', position: 2, name: 'Calcular pérdidas',    item: 'https://avoidstudio.es/perdidas' },
      { '@type': 'ListItem', position: 3, name: 'El sistema',           item: 'https://avoidstudio.es/flujos' },
      { '@type': 'ListItem', position: 4, name: 'Sobre AVOID',          item: 'https://avoidstudio.es/sobre-avoid' },
      { '@type': 'ListItem', position: 5, name: 'Diagnóstico gratuito', item: 'https://avoidstudio.es/diagnostico' },
    ],
  }

  // ── SCHEMA 4: WebSite (sitelinks searchbox en Knowledge Panel) ─
  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://avoidstudio.es/#website',
    url: 'https://avoidstudio.es',
    name: 'AVOID Studio',
    description: 'Automatización de citas para clínicas en Osona. Eliminamos los no-shows con WhatsApp.',
    inLanguage: ['es', 'ca'],
    publisher: { '@id': 'https://avoidstudio.es/#business' },
  }

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }} />
      </head>
      <body className="antialiased bg-[#04040A] text-white selection:bg-[#B8FF2E] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
