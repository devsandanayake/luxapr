const multer = require('multer');
const path = require('path');
const fs = require('fs');
const createStorage = (destinationPath) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationPath); // Directly using the provided path
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Common file filter for image uploads
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Creating multer instances with different storage paths
const upload = multer({ storage: createStorage('../uploads'), fileFilter });
const uploadP = multer({ storage: createStorage('../profilePic'), fileFilter });

module.exports = {
    upload,
    uploadP
};