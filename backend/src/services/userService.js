const UserModel = require('../models/user');
const AdsModel = require('../models/ads');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment-timezone');
const process = require('process');

dotenv.config();

const createUser = async ({ images,username, firstName, lastName, email, password, contactNumber ,occupation}) => {
    try {
        console.log(images);
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
            images,
            username,
            email,
            password: hashedPassword,
            contactNumber,
            firstName,
            lastName,
            registerDate: formattedDate,
            occupation

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

const viewAdsUser = async (username) => {
    
    try{
        const user = await UserModel.findOne({ username: username });
         if (!user) {
            return { error: true, status: 404, message: 'User not found' };
         }
         const ads = await AdsModel.find({ username: username });

         if (!ads) {
            return { error: true, status: 404, message: 'Ads not found' };
         }

         return { error: false, ads };


    }
    catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        throw new Error('Error viewing ads');
    }

}

//login user profile view
const viewUserProfile = async (username) => {
    try{
        const user = await UserModel.findOne({ username:username });
        if (!user) {
            return { error: true, status: 404, message: 'User not found' };
        }
        return { error: false, user };
    }
    catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        throw new Error('Error viewing user profile');
    }
}


//edit user profile
const editUserProfile = async (username,userData) => {
    try{
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return { error: true, status: 404, message: 'User not found' };
        }
        const updatedUser = await UserModel.findOneAndUpdate
        (
            { username: username },
            userData,
            { new: true }
        );
        return { error: false, updatedUser };
    }
    catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        throw new Error('Error editing user profile');
    }
}

module.exports = {
    createUser,
    loginUser,
    viewAllUsers,
    viewAdsUser,
    viewUserProfile,
    editUserProfile
};
