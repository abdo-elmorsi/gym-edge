const nodemailer= require('nodemailer')

const sendEmail= async options =>{
    // 1) Create a transport
    const transporter= nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    // 2) Define the mail options
    const mailOptions= {
        from: 'Mostafa Lotfy <mostafa00@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
        //html:
    }

    // 3) Actually send the email
    await transporter.sendMail(mailOptions)
}

module.exports= sendEmail