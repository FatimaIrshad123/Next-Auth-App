
import nodemailer from 'nodemailer'

export const sendEmai = async({email, emailType, userId}:any) => {
    try {
        // TODO: configure mail for usage

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'abc@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email': 'Reset your password',
            html: "<b>Hello world?</b>", // html body
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    }catch(error:any) {
        throw new Error(error.message)
    }
}