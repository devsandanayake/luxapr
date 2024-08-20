const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const PDF_Creator = async (adCode, totalDays, breakdown, chargesByMonth, advancePayment, StartDate, EndDate) => {
    // eslint-disable-next-line no-undef
    const pdfPath = path.join(__dirname, 'longTermRentPDF.pdf');
    const doc = new PDFDocument();

    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(pdfPath);

        writeStream.on('finish', () => {
            resolve(pdfPath);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });

        doc.pipe(writeStream);

        // Title
        doc.fontSize(25).fillColor('blue').text('House Details', { align: 'center' });
        doc.moveDown();

        // AD Code
        doc.fontSize(16).fillColor('black').text(`AD Code: ${adCode}`);
        doc.moveDown();

        // Total Days
        doc.fontSize(16).fillColor('black').text(`Total Days: ${totalDays}`);
        doc.moveDown();

        // Advance Payment
        doc.fontSize(16).fillColor('black').text(`Advance Payment: ${advancePayment}`);
        doc.moveDown();

        // Start Date
        doc.fontSize(16).fillColor('black').text(`Start Date: ${StartDate}`);
        doc.moveDown();

        // End Date
        doc.fontSize(16).fillColor('black').text(`End Date: ${EndDate}`);
        doc.moveDown();

        // Breakdown Section
        doc.fontSize(14).fillColor('black').text('Breakdown by Month:', { underline: true });
        doc.moveDown();

        for (const year in breakdown) {
            doc.fontSize(14).fillColor('black').text(`Year: ${year}`);
            for (const month in breakdown[year]) {
                const days = breakdown[year][month];
                const charge = chargesByMonth[year][month];
                doc.fontSize(12).fillColor('black').text(`Month: ${month}, Days: ${days}, Charge: ${charge.toFixed(2)}`);
            }
            doc.moveDown();
        }

        // Professional Description
        doc.fontSize(14).fillColor('black').text('Description:', { underline: true });
        doc.moveDown();
        doc.fontSize(12).fillColor('black').text(`This document provides the details of the long-term rental agreement for the property associated with the advertisement code ${adCode}. The total rental period is ${totalDays} days, commencing on ${StartDate} and concluding on ${EndDate}. The advance payment required is ${advancePayment}. Below is the breakdown of charges by month.`);
        doc.moveDown();

        // Footer
        doc.fontSize(12).fillColor('gray').text('Your Long Term Rent Agreement', { align: 'center' });

        doc.end();
    });
};

module.exports = { PDF_Creator };
