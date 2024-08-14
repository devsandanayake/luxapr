const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const process = require('process');
const adsModel = require('../models/ads');
dotenv.config();

// Corrected export syntax and function declaration
const authUser = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                
        req.user = decoded.username;
        console.log(decoded);
        next();
    } catch (err) {
         next(err)
    }
};

const editPostuserSideauth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return next({ status: 401, message: 'No authorization token provided' });
        }
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const username = decoded.username;
        const adCode = req.params.adCode;

        const ad = await adsModel.findOne({ adCode: adCode });
        if (!ad) {
            return next({ status: 404, message: 'Ad not found' });
        }
        if (ad.username !== username) {
            return next({ status: 403, message: 'Forbidden' });
        }
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return next({ status: 401, message: 'Invalid token' });
        }
        next(err);
    }
};

const authAdmin = (req, res, next) => { 
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== 'admin') {
            return next({ status: 403, message: 'Forbidden' });
        }
        req.user = decoded.username;
        next();
    } catch {
        return next({ status: 401, message: 'Invalid token' });

    }
}



module.exports = { authUser, authAdmin , editPostuserSideauth};




