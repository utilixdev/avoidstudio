import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, tel, rol, clinica, sector, facturacion } = body;

const data = await resend.emails.send({
  // Usamos el dominio verificado de Utilix como "motor" de envío
  from: 'Avoid Studio <info@utilixstudio.com>', 
  // Enviamos el aviso a tu nueva bandeja de entrada en el iPhone
  to: ['info@avoidstudio.es'],
  subject: `🚀 Nuevo Lead: ${clinica}`,
  html: `
    <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 30px; border-radius: 10px; border: 1px solid #B8FF2E;">
      <h1 style="color: #B8FF2E; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0;">Nuevo Lead Detectado</h1>
      <p style="font-size: 18px; margin-bottom: 20px;"><strong>Clínica:</strong> ${clinica}</p>
      
      <div style="background-color: #111; padding: 20px; border-radius: 8px;">
        <p style="margin: 5px 0;"><strong>👤 Responsable:</strong> ${nombre} (${rol})</p>
        <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #B8FF2E;">${email}</a></p>
        <p style="margin: 5px 0;">
          <strong>📱 WhatsApp:</strong> 
          <a href="https://wa.me/${tel.replace(/\s+/g, '')}" style="color: #B8FF2E; text-decoration: none;">${tel}</a>
        </p>       
        <p style="margin: 5px 0;"><strong>🏥 Sector:</strong> ${sector}</p>
        <p style="margin: 5px 0;"><strong>💰 Facturación:</strong> ${facturacion}</p>
      </div>
      
      <p style="font-size: 12px; color: #666; margin-top: 20px; text-align: center;">
        Este es un aviso automático de Avoid Studio enviado vía Utilix.
      </p>
    </div>
  `,
});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}


