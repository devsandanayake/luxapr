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


async function  auctionAlert (email, auctionID, userOffer){
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
        subject: 'Auction Alert',
        text: `We regret to inform you that your bid has been outbid in auction ${auctionID}. The current highest offer is ${userOffer}. Please consider placing a higher bid to stay in the competition.

Best regards,
The Auction Team`
    };

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
    
}


module.exports = {sendEmail, auctionAlert};