const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const PDF_Creator = async (adCode) => {
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

        doc.fontSize(25).text('House Details', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`AD Code: ${adCode}`);
        doc.text('Your Long term rent');
        // Add more details as needed

        doc.end();
    });
};

module.exports = { PDF_Creator };
