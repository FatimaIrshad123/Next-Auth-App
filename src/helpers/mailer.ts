import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import nodemailer from 'nodemailer'

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if (emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            })
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{
                $set: {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:new Date(Date.now()+ 3600000)
                }
            }
                
            )
        }

        
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4acba7b3983443",
              pass: "873974b93eda03"
            }
          });

          const mailOptions = {
            from: 'abc@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email': 'Reset your password',
            html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}
            or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    }catch(error:any) {
        throw new Error(error.message)
    }
}