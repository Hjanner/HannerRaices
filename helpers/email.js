
import nodemailer from 'nodemailer'
 

const emailRegistro = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSRWORD
        }
      });

      const {email, name, token} = datos;       //extraer datos del registro

      //enviar email
      await transport.sendMail({
        from: 'HannerRaices.com',
        to: email,
        subject: 'Confirmar tu cuenta en HannerRaices',
        text: `Hola: ${name}, ingresa a la siguiente URL para confirmar tu cuenta`,
        html: `<p>Hola: ${name}, tu cuenta ya esta lista. Solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 918}/auth/confirmar/${token}"> Confirma tu cuenta</a></p>`
      })
}

const emailOlvidoPassword = async (datos) =>{
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSRWORD
      }
    });

    const {email, name, token} = datos;       //extraer datos del registro

    //enviar email
    await transport.sendMail({
      from: 'HannerRaices.com',
      to: email,
      subject: 'Olvido de contraseña de tu cuenta en HannerRaices',
      html: `<p>Hola ${name}, ingresa a la siguiente URL para restaurar tu contraseña:
              <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 918}/auth/recuperar-cuenta/${token}"> Restaurar Contraseña</a>
            </p>`
    })
}


export{
    emailRegistro, 
    emailOlvidoPassword
}
