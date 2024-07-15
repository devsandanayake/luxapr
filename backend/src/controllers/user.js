const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create a new user in the database
const createUser = async (req,res) =>{
    try{
        const {username, FirstName, LastName, email, password, contactNumber} = req.body;
        const user = await UserModel.findOne({email : email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({username, email, password: hashedPassword, contactNumber, FirstName, LastName});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    createUser

};
