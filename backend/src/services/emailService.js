const nodemailer = require('nodemailer');


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

async function sendEmail(email, adCode) {
    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Approval of your advertisement',
        text: `Your advertisement has been approved. Your ad code is ${adCode}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

async function auctionAlert(email, auctionID, userOffer) {
    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Auction Alert',
        text: `We regret to inform you that your bid has been outbid in auction ${auctionID}. The current highest offer is ${userOffer}. Please consider placing a higher bid to stay in the competition.

Best regards,
The Auction Team`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}


//inquery add sucess ful msg
async function inquiryEmail(email) {
    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Inquiry Alert',
        text:'Your inquiry has been successfully submitted.'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (err) {
        console.error(err);
    }

}

//inquery rply
async function replyEmail(email, message) {
    const mailOptions = {
        from: 'devthashi@gmail.com',
        to: email,
        subject: 'Inquiry Reply',
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    }
    catch (err) {
        console.error(err);
    }

}


module.exports = { sendEmail, auctionAlert, inquiryEmail, replyEmail };