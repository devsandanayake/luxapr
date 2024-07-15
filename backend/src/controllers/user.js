const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const process = require('process');
const dotenv = require('dotenv');


dotenv.config();

// Create a new user in the database
const createUser = async (req, res, next) => {
    try {
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
            lastName
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        next(err);
    }
};

module.exports = {
    createUser
};
