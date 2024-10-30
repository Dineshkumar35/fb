let nodemailer = require('nodemailer');
const mailSender=(email,otp)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'samplepro35@gmail.com',
            pass: 'dk237301'
        }
    });
    
   
   let link="http://localhost:3000/Login";
    let mailOptions = {
        from: 'samplepro35@gmail.com',
        to: email,
        subject: 'Teste Templete ✔',
        html: "Hello,<br> Please Click on the link to verify your email.<br><b>Otp : "+otp+"</b><br><a href="+link+">Click here to verify</a>"
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
module.exports = mailSender;
