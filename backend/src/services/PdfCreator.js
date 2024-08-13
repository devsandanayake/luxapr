const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const PDF_Creator = async (adCode, monthlyRate, advancePayment, StartDate, EndDate) => {
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

        // Monthly Rate
        doc.fontSize(16).fillColor('black').text(`Monthly Rate: ${monthlyRate}`);
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

        // Professional Description
        doc.fontSize(14).fillColor('black').text('Description:', { underline: true });
        doc.moveDown();
        doc.fontSize(12).fillColor('black').text(`This document provides the details of the long-term rental agreement for the property associated with the advertisement code ${adCode}. The monthly rental rate is set at ${monthlyRate}, with an advance payment of ${advancePayment} required. The rental period commences on ${StartDate} and concludes on ${EndDate}. Please review the details carefully and contact us if you have any questions or require further information.`);
        doc.moveDown();

        // Footer
        doc.fontSize(12).fillColor('gray').text('Your Long term rent', { align: 'center' });

        doc.end();
    });
};

module.exports = { PDF_Creator };