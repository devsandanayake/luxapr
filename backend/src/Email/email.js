const nodemailer = require('nodemailer');

async function sendEmail(email , adCode){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'devthashi@gmail.com',
            pass: 'ibdu nxpf zwdf titp'
        }
    });

    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Approval your advertisement',
        text: `Your advertisement has been approved. Your ad code is ${adCode}`
    };

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
    
}


module.exports = {sendEmail};