const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const addWatermark = async (files) => {
     //eslint-disable-next-line
    const uploadDir = path.resolve(__dirname, '../../../uploads');
     //eslint-disable-next-line
    const watermarkPath = path.resolve(__dirname, '../watermark.png');
     //eslint-disable-next-line
    const watermarkedDir = path.resolve(__dirname, '../../../uploads/watermarked');

    for (const file of files) {
        const imagePath = path.join(uploadDir, file.filename);
        const outputPath = path.join(watermarkedDir, file.filename);

        const metadata = await sharp(imagePath).metadata();
        const width = Math.floor(metadata.width / 4);
        const height = Math.floor(metadata.height / 4);

        const watermarkBuffer = await sharp(watermarkPath)
            .resize(width, height, {
                fit: 'inside',
                withoutEnlargement: true,
            })
            .toBuffer();

        await sharp(imagePath)
            .composite([{ input: watermarkBuffer, gravity: 'center' }])
            .toFile(outputPath);

        //eslint-disable-next-line
        const relativeOriginalPath = path.relative(__dirname, imagePath);
        //eslint-disable-next-line
        const relativeWatermarkedPath = path.relative(__dirname, outputPath);

        file.originalPath = relativeOriginalPath;
        file.watermarkedPath = relativeWatermarkedPath;
    }
};

module.exports = {
    addWatermark
};
