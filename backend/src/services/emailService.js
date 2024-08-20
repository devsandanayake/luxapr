const nodemailer = require('nodemailer');
const { PDF_Creator } = require('./PdfCreator');
const fs = require('fs');

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
        from: 'no-reply@email.com',
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
        from: 'no-reply@email.com',
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

async function inquiryEmail(email) {
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Inquiry Alert',
        text: 'Your inquiry has been successfully submitted.'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

async function replyEmail(email, message) {
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Inquiry Reply',
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

async function longTermRentEmail(email, adCode , totalDays ,breakdown,chargesByMonth, advancePayment ,StartDate , EndDate) {
    const pdfPath = await PDF_Creator(adCode, totalDays ,breakdown,chargesByMonth,advancePayment ,StartDate , EndDate);
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Long Term Rent',
        text: 'Your long term rent request has been approved. Please find the attached pdf for the house details.',
        attachments: [{
            filename: 'longTermRentPDF.pdf',
            path: pdfPath,
            contentType: 'application/pdf'
        }]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);

        fs.unlink(pdfPath, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('PDF deleted successfully');
            }
        }
        );
    } catch (err) {
        console.error(err);
    }
}

//long rent inquery assign agent email
async function longRentInqueryAssignAgentEmail(email, inqueryID) {
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Long Rental Inquiry Assigned',
        text: `Your long rental inquiry with ID ${inqueryID} has been assigned to an agent. You will be contacted shortly with further details.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

//long rent inquery email completed
async function longRentInqueryEmailCompleted(email, inqueryID) {
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Long Rental Inquiry Completed',
        text: `Your long rental inquiry with ID ${inqueryID} has been completed. Thank you for your interest.`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

//long rent inquery email rejected
async function longRentInqueryEmailRejected(email, inqueryID ,reply) {
    const mailOptions = {
        from: 'no-reply@email.com',
        to: email,
        subject: 'Long Rental Inquiry Rejected',
        text: `Your long rental inquiry with ID ${inqueryID} has been rejected. Please contact us for further details.
        
        Resone : ${reply}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { sendEmail, auctionAlert, inquiryEmail, replyEmail, longTermRentEmail , longRentInqueryAssignAgentEmail , longRentInqueryEmailCompleted , longRentInqueryEmailRejected };