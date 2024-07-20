const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const process = require('process');
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

const authAdmin = (req, res, next) => { 
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (decoded.role !== 'admin') {
            return next({ status: 403, message: 'Forbidden' });
        }
        req.user = decoded.username;
        next();
    } catch (err) {
        next(err)
    }
}


module.exports = { authUser, authAdmin };




