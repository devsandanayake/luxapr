const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const process = require('process');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment-timezone');
dotenv.config();

// Create a new user in the database
const createUser = async (req, res, next) => {
    try {
        const now = moment.tz('Asia/Colombo');
        const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

        const { username, firstName, lastName, email, password, contactNumber } = req.body;

        // Input validation (basic example, consider using a library like Joi)
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' }); // 409 Conflict
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            contactNumber,
            firstName,
            lastName,
            registerDate: formattedDate
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        next(err);
    }
};


const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Find username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return next({ status: 404, message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next({ status: 401, message: 'Invalid credentials' });
        }

        const payload = {
            username: user.username,
            firstName: user.firstName,
            role: user.role
        };

        // Sign the token with a more readable expiresIn value
        let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });

        // Send a more detailed response
        res.json({
            message: "Login successful",
            token: `Bearer ${token}`
        });
    } catch (err) {
        next(err)
    }
}


 

module.exports = {
    createUser,
    loginUser,
};
