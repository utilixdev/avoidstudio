# AVOID · Landing Anti No-Show

Sistema de automatización WhatsApp + Google Calendar para clínicas.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Fuentes: Syne + Space Mono (Google Fonts)

## Setup local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

### Opción 1 — Vercel CLI
```bash
npm install -g vercel
vercel
```

### Opción 2 — GitHub + Vercel (recomendado)
1. Sube este proyecto a un repo de GitHub
2. Ve a vercel.com → New Project → Import desde GitHub
3. Vercel detecta Next.js automáticamente
4. Click Deploy → listo en 2 minutos

### Opción 3 — Drag & Drop
1. Ve a vercel.com/new
2. Arrastra la carpeta del proyecto
3. Deploy

## Estructura
```
src/
  app/
    layout.tsx      → Root layout + metadatos SEO
    page.tsx        → Página principal (ensambla todos los componentes)
    globals.css     → Design system: colores, tipografía, utilidades
  components/
    Navbar.tsx      → Navegación fija + menú móvil
    Hero.tsx        → Sección hero con canvas de partículas
    Problema.tsx    → Pain points con métricas
    Sistema.tsx     → Los 7 flujos interactivos con preview WhatsApp
    ROI.tsx         → Calculadora ROI con sliders
    Arquitectura.tsx → Stack técnico
    Precios.tsx     → Planes de instalación y mantenimiento
    FAQ.tsx         → FAQ acordeón
    Contacto.tsx    → Formulario de diagnóstico
    Footer.tsx      → Footer con links y estado del sistema
```

## Personalización rápida

### Cambiar colores principales
En `globals.css`:
```css
:root {
  --acid: #B8FF2E;    /* Color principal (ácido) */
  --plasma: #6C63FF;  /* Color secundario */
  --void: #04040A;    /* Fondo principal */
}
```

### Cambiar precios
En `Precios.tsx`, array `plans[]`.

### Cambiar email/teléfono de contacto
En `Contacto.tsx` y `Footer.tsx`.

### Añadir tu link de Google Reviews
En `Sistema.tsx`, el mensaje del flujo 3 (índice 2 del array `flows`).

### Configurar el formulario de contacto
El formulario actualmente es estático (frontend only). Para conectarlo:
- **Formspree**: añade `action="https://formspree.io/f/YOUR_ID"` al `<form>`
- **n8n Webhook**: cambia el `handleSubmit` para hacer `fetch` a tu webhook de n8n
- **Resend / EmailJS**: integra cualquier servicio de email

## Variables del sistema n8n
Recuerda configurar estas variables en n8n antes de activar los workflows:
- `GOOGLE_CALENDAR_ID`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`
- `NEGOCIO_PHONE`
- `GOOGLE_REVIEW_URL`
