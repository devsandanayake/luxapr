const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment-timezone');
const process = require('process');

dotenv.config();

const createUser = async ({ username, firstName, lastName, email, password, contactNumber }) => {
    try {
        const now = moment.tz('Asia/Colombo');
        const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

        // Input validation (basic example, consider using a library like Joi)
        if (!email || !password) {
            return { error: true, status: 400, message: 'Email and password are required' };
        }
        
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return { error: true, status: 409, message: 'User already exists' }; // 409 Conflict
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
        return { error: false };
    } catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        throw new Error('Error creating user');
    }
};

const loginUser = async ({ username, password }) => {
    try {
        // Find user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return { error: true, status: 404, message: 'User not found' };
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { error: true, status: 401, message: 'Invalid credentials' };
        }

        const payload = {
            username: user.username,
            firstName: user.firstName,
            role: user.role
        };

        // Sign the token with a more readable expiresIn value
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' });

        return { error: false, token };
    } catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        throw new Error('Error logging in user');
    }
};


//view all users for admin
const viewAllUsers = async () => {
    return await UserModel.find().sort('-registerDate');
};

module.exports = {
    createUser,
    loginUser,
    viewAllUsers
};
