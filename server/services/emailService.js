const sgMail = require('@sendgrid/mail');

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log('✅ SendGrid configurado correctamente');

// Función para enviar respuesta al cliente
const enviarRespuesta = async (contacto, respuesta) => {
  try {
    const msg = {
      to: contacto.email,
      from: process.env.EMAIL_FROM,
      subject: `Re: ${contacto.asunto || 'Tu consulta'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D74B37 0%, #C73E2C 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #D74B37; margin: 20px 0; border-radius: 5px; }
            .original-message { background: #e2e8f0; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
            .btn { display: inline-block; background: #D74B37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Alarmas Centauro</h1>
              <p>Hemos respondido a tu consulta</p>
            </div>
            <div class="content">
              <p>Hola <strong>${contacto.nombre}</strong>,</p>
              <p>Gracias por contactarnos. Hemos revisado tu mensaje y queremos responderte:</p>
              
              <div class="message-box">
                <h3 style="color: #D74B37; margin-top: 0;">📩 Nuestra respuesta:</h3>
                <p style="white-space: pre-wrap;">${respuesta}</p>
              </div>

              <div class="original-message">
                <h4 style="color: #64748b; margin-top: 0;">Tu mensaje original:</h4>
                <p><strong>Asunto:</strong> ${contacto.asunto || 'Sin asunto'}</p>
                <p style="white-space: pre-wrap;">${contacto.mensaje}</p>
              </div>

              <p>Si tienes más preguntas, no dudes en respondernos a este email o llamarnos al:</p>
              <p style="text-align: center; font-size: 18px; color: #D74B37; font-weight: bold;">📞 +34 667 942 136</p>

              <center>
                <a href="tel:+34667942136" class="btn">Llamar ahora</a>
              </center>

              <div class="footer">
                <p><strong>Alarmas Centauro</strong></p>
                <p>Email: alarmascentauro1@gmail.com | Teléfono: +34 667 942 136</p>
                <p>© ${new Date().getFullYear()} Alarmas Centauro - Seguridad y tranquilidad</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await sgMail.send(msg);
    console.log('✅ Email enviado a:', contacto.email);
    return { success: true, messageId: 'sendgrid-sent' };
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  enviarRespuesta
};
