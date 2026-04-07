import type { Metadata, Viewport } from 'next'
import './globals.css'

// ── METADATA ────────────────────────────────────────────────────
// Títol: intenció de cerca local en català + solució específica.
// Descripció: problema → solució → zona → CTA implícit. Màx 155 chars.
// NOTA SEO: Mantenim títols en català per capturar cerques en català
// ("automatització cites clínica Vic") que Google ara indexa de forma independent.
export const metadata: Metadata = {
  title: 'Automatització de cites per a clíniques a Vic i Osona · AVOID Studio',
  description: 'Eliminem els no-shows en clíniques de Vic, Manlleu, Torelló i Catalunya Central  amb WhatsApp + Google Calendar. Setup 72h. Sense canviar el teu programari. Diagnòstic gratuït.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords: [
    // Català — prioritat per a cerques locals a Osona
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
    // Castellà — cobertura de cerques en castellà des d'Osona
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
    // MILLORA SEO: afegit ca_ES per capturar usuaris amb configuració en català
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

// userScalable eliminat: Google penalitza el bloqueig de zoom en mòbil des de 2021
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#04040A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  // ── SCHEMA 1: LocalBusiness + ITService ─────────────────────
  // @type doble per màxima cobertura: servei professional + tecnologia
  // areaServed: objectes Place estructurats (més pes que strings solts)
  // ─────────────────────────────────────────────────────────────
  // ⚠️  PLACEHOLDERS — substitueix abans de publicar:
  //   telephone  → el teu número real (ex: "+34938000000")
  //   email      → el teu email real (ex: "hola@avoidstudio.es")
  //   hasMap     → el CID de Google Maps:
  //                  1. Busca el teu negoci a maps.google.com
  //                  2. Clica "Compartir" → copia l'URL
  //                  3. Extreu el CID de l'URL copiada
  //   sameAs     → les URLs reals dels teus perfils socials
  // ─────────────────────────────────────────────────────────────
  const schemaLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'ITService'],
    '@id': 'https://avoidstudio.es/#business',
    name: 'AVOID Studio',
    alternateName: 'Avoid Strategic Studio',
    // MILLORA SEO: descripció en català per a la comarca d'Osona
    description: 'Agència d\'automatització de cites per a clíniques a Osona. Eliminem els no-shows amb WhatsApp i Google Calendar. Fisioteràpia, odontologia, estètica mèdica i psicologia a Vic, Manlleu, Torelló i comarca.',
    url: 'https://avoidstudio.es',
    logo: { '@type': 'ImageObject', url: 'https://avoidstudio.es/logo.png', width: 512, height: 512 },
    image: 'https://avoidstudio.es/og-image.jpg',
    telephone: '+34600000000',        // ← Substitueix pel teu número real
    email: 'hola@avoidstudio.es',     // ← Substitueix pel teu email real
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
    // hasMap: obtén el CID a maps.google.com buscant el teu negoci → compartir → copia la URL
    hasMap: 'https://maps.google.com/?cid=TU_CID_AQUI', // ← Substitueix
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    }],
    // MILLORA SEO: català primer (mercat principal Osona) + castellà
    knowsLanguage: ['ca', 'es'],
    sameAs: [
      'https://www.linkedin.com/company/avoidstudio',  // ← Substitueix per URLs reals
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
    // MILLORA SEO: municipis prioritaris primer, després comarca i zones limítrofs
    // Ordre: nuclis principals d'Osona → comarca completa → Catalunya Central → limítrofs
    areaServed: [
      { '@type': 'City', name: 'Vic',                      containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Manlleu',                  containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Torelló',                  containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Tona',                     containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Centelles',                containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Roda de Ter',              containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Taradell',                 containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Hipòlit de Voltregà', containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Gurb',                     containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Folgueroles',              containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Sant Pere de Torelló',     containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Santa Eugènia de Berga',   containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      { '@type': 'City', name: 'Calldetenes',              containedInPlace: { '@type': 'AdministrativeArea', name: 'Osona' } },
      // MILLORA SEO: comarca com a entitat pròpia + Catalunya Central com a regió
      { '@type': 'AdministrativeArea', name: 'Osona',          containedInPlace: { '@type': 'AdministrativeArea', name: 'Catalunya' } },
      { '@type': 'AdministrativeArea', name: 'Catalunya Central', containedInPlace: { '@type': 'AdministrativeArea', name: 'Catalunya' } },
      // Zones limítrofs per a expansió
      { '@type': 'City', name: 'Granollers', containedInPlace: { '@type': 'AdministrativeArea', name: 'Vallès Oriental' } },
      { '@type': 'City', name: 'Berga',      containedInPlace: { '@type': 'AdministrativeArea', name: 'Berguedà' } },
      { '@type': 'City', name: 'Ripoll',     containedInPlace: { '@type': 'AdministrativeArea', name: 'Ripollès' } },
    ],
  }

  // ── SCHEMA 2: FAQPage ─────────────────────────────────────────
  // Les preguntes es mostren desplegades a Google → augmenta el CTR sense pujar de posició
  // MILLORA SEO: preguntes en català per capturar cerques en català a Osona
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'He de canviar el programari de gestió de la meva clínica a Vic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El sistema AVOID funciona amb Google Calendar, que ja fas servir, i es connecta sense necessitat de migrar dades ni instal·lar res nou. Compatible amb qualsevol clínica de Vic, Manlleu, Torelló i comarca d\'Osona.',
        },
      },
      {
        '@type': 'Question',
        name: 'En quant de temps s\'instal·la el sistema d\'automatització?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El setup complet triga 72 hores des que confirmem la implementació. Només necessitem 2 hores del teu temps per al diagnòstic inicial i la validació final.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funciona per a clíniques dentals, fisioteràpia i estètica a Osona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. El sistema està dissenyat per a qualsevol clínica privada que visqui de les cites: fisioteràpia, odontologia, psicologia, nutrició i estètica mèdica a Vic, Manlleu, Torelló, Tona, Centelles i tota la comarca d\'Osona.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quant es redueix la taxa de no-shows?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Els recordatoris automàtics per WhatsApp redueixen els no-shows entre el 35% i el 45%, segons estudis de clíniques privades de salut amb sistemes similars. En clíniques dentals i d\'estètica d\'Osona hem registrat reduccions del 40-42%.',
        },
      },
      {
        '@type': 'Question',
        name: 'Què passa amb la privacitat de les dades dels meus pacients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Totes les automatitzacions compleixen el RGPD. Les dades dels pacients s\'utilitzen exclusivament per als recordatoris i confirmacions autoritzats pel professional. No es comparteixen amb tercers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quant costa l\'automatització de cites per a una clínica a Osona?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El cost varia segons la complexitat del sistema i la mida de la clínica. Oferim un diagnòstic gratuït de 30 minuts on analitzem la teva operativa i presentem un pressupost personalitzat sense compromís.',
        },
      },
    ],
  }

  // ── SCHEMA 3: BreadcrumbList ──────────────────────────────────
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inici',                item: 'https://avoidstudio.es' },
      { '@type': 'ListItem', position: 2, name: 'Calcular pèrdues',     item: 'https://avoidstudio.es/perdidas' },
      { '@type': 'ListItem', position: 3, name: 'El sistema',           item: 'https://avoidstudio.es/flujos' },
      { '@type': 'ListItem', position: 4, name: 'Sobre AVOID',          item: 'https://avoidstudio.es/sobre-avoid' },
      { '@type': 'ListItem', position: 5, name: 'Diagnòstic gratuït',   item: 'https://avoidstudio.es/diagnostico' },
    ],
  }

  // ── SCHEMA 4: WebSite (sitelinks searchbox en Knowledge Panel) ─
  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://avoidstudio.es/#website',
    url: 'https://avoidstudio.es',
    name: 'AVOID Studio',
    description: 'Automatització de cites per a clíniques a Osona. Eliminem els no-shows amb WhatsApp.',
    // MILLORA SEO: català primer per reflectir el mercat principal
    inLanguage: ['ca', 'es'],
    publisher: { '@id': 'https://avoidstudio.es/#business' },
  }

  return (
    // MILLORA SEO: lang="ca" en lloc de "es" — el contingut principal és en català
    // Google utilitza l'atribut lang per determinar l'idioma de la pàgina
    <html lang="ca" className="scroll-smooth">
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
