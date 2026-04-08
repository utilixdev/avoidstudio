import type { Metadata, Viewport } from 'next'
import './globals.css'

// ── METADATA ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Automatització de cites per a clíniques a Vic i Osona · AVOID Studio',
  description: 'Eliminem els no-shows en clíniques de Vic, Manlleu, Torelló i Catalunya Central amb WhatsApp + Google Calendar. Setup 72h. Sense canviar el teu programari. Diagnòstic gratuït.',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  
  keywords: [
    'automatització cites clíniques Vic',
    'eliminar no-shows fisioteràpia Osona',
    'recordatoris WhatsApp clínica dental Vic',
    'sistema gestió cites Manlleu',
    'automatitzar agenda clínica Torelló',
    'reduir absències cites mèdiques Osona',
    'gestió automàtica cites fisioteràpia Vic',
    'recordatori cites automàtic clínica',
    'agenda intel·ligent clíniques comarca Osona',
    'reactivació pacients clínica dental Vic',
    'automatització WhatsApp clínica privada',
    'sistema anti no-show clínica',
    'automatización citas clínicas Vic',
    'eliminar no-shows fisioterapia Osona',
    'recordatorios WhatsApp clínica dental Vic',
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
    title: 'Automatització de cites per a clíniques a Vic i Osona · AVOID Studio',
    description: 'Reduïm els no-shows entre el 35% i el 45% amb WhatsApp + Google Calendar. Sense canviar el teu programari. Setup en 72h.',
    type: 'website',
    url: 'https://avoidstudio.es',
    siteName: 'AVOID Studio',
    locale: 'ca_ES',
    images: [{
      url: 'https://avoidstudio.es/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'AVOID Studio – Automatització de cites per a clíniques a Osona',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatització de cites per a clíniques · Vic i Osona',
    description: 'Eliminem els no-shows amb WhatsApp + Google Calendar. Sense canviar el teu programari.',
    images: ['https://avoidstudio.es/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04040A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const schemaLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'ITService'],
    '@id': 'https://avoidstudio.es/#business',
    name: 'AVOID Studio',
    alternateName: 'Avoid Strategic Studio',
    description: 'Agència d\'automatització de cites per a clíniques a Osona. Eliminem els no-shows amb WhatsApp i Google Calendar. Fisioteràpia, odontologia, estètica mèdica i psicologia a Vic, Manlleu, Torelló i comarca.',
    url: 'https://avoidstudio.es',
    logo: { '@type': 'ImageObject', url: 'https://avoidstudio.es/logo.png', width: 512, height: 512 },
    image: 'https://avoidstudio.es/og-image.jpg',
    telephone: '+34600000000', 
    email: 'hola@avoidstudio.es',
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
    hasMap: 'https://maps.google.com/?cid=TU_CID_AQUI',
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    }],
    knowsLanguage: ['ca', 'es'],
    sameAs: [
      'https://www.linkedin.com/company/avoidstudio',
      'https://www.instagram.com/avoidstudio',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sistemes d\'automatització per a clíniques',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automatització de cites amb WhatsApp per a clíniques a Osona',
            description: 'Recordatoris i confirmacions automàtiques per WhatsApp que redueixen els no-shows entre el 35% i el 45%.',
            areaServed: 'Osona',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reactivació de pacients inactius',
            description: 'Flux automàtic que contacta pacients que no han tornat en 90 dies per recuperar facturació perduda.',
            areaServed: 'Osona',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gestió automàtica de ressenyes Google per a clíniques',
            description: 'Sistema que sol·licita ressenyes 24h després de cada visita per millorar el posicionament local a Google Maps.',
            areaServed: 'Osona',
          },
        },
      ],
    },
    areaServed: [
      { '@type': 'City', name: 'Vic', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Manlleu', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Torelló', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Tona', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Centelles', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Roda de Ter', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Taradell', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Hipòlit de Voltregà', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Gurb', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Folgueroles', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Pere de Torelló', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Santa Eugènia de Berga', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Calldetenes', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'AdministrativeArea', name: 'Osona', containedInPlace: { '@type': 'AdministrativeArea', name: 'Catalunya' } },
      { '@type': 'AdministrativeArea', name: 'Catalunya Central', containedInPlace: { '@type': 'AdministrativeArea', name: 'Catalunya' } },
      { '@type': 'City', name: 'Granollers', containedInPlace: { '@type': 'AdministrativeArea', name: 'Vallès Oriental' } },
      { '@type': 'City', name: 'Berga', containedInPlace: { '@type': 'AdministrativeArea', name: 'Berguedà' } },
      { '@type': 'City', name: 'Ripoll', containedInPlace: { '@type': 'AdministrativeArea', name: 'Ripollès' } },
    ],
  }

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inici', item: 'https://avoidstudio.es' },
      { '@type': 'ListItem', position: 2, name: 'Calcular pèrdues', item: 'https://avoidstudio.es/perdidas' },
      { '@type': 'ListItem', position: 3, name: 'El sistema', item: 'https://avoidstudio.es/flujos' },
      { '@type': 'ListItem', position: 4, name: 'Sobre AVOID', item: 'https://avoidstudio.es/sobre-avoid' },
      { '@type': 'ListItem', position: 5, name: 'Diagnòstic gratuït', item: 'https://avoidstudio.es/diagnostico' },
    ],
  }

  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://avoidstudio.es/#website',
    url: 'https://avoidstudio.es',
    name: 'AVOID Studio',
    description: 'Automatització de cites per a clíniques a Osona. Eliminem els no-shows amb WhatsApp.',
    inLanguage: ['ca', 'es'],
    publisher: { '@id': 'https://avoidstudio.es/#business' },
  }

  return (
    <html lang="ca" className="scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }} />
        {/* L'script de FAQ s'ha eliminat d'aquí per evitar el duplicat amb /faq/page.tsx */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite) }} />
      </head>
      <body className="antialiased bg-[#04040A] text-white selection:bg-[#B8FF2E] selection:text-black overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}