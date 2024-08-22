const userService = require('../services/userService');

// Create a new user in the database
const createUser = async (req, res, next) => {
    try {
        const images = req.file.path;

        const { username, firstName, lastName, email, password, contactNumber, occupation } = req.body;

        const userData = { username, firstName, lastName, email, password, contactNumber, occupation };
        if (images) {
            userData.images = images;
        }

        const response = await userService.createUser(userData);

        if (response.error) {
            return res.status(response.status).json({ message: response.message });
        }

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err); // Consider more sophisticated logging for production
        next(err);
    }
};

// Login a user
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const response = await userService.loginUser({ username, password });

        if (response.error) {
            return res.status(response.status).json({ message: response.message });
        }

        res.json({
            message: "Login successful",
            token: `Bearer ${response.token}`
        });
    } catch (err) {
        next(err);
    }
};

//view user details
const viewAllUsers = async (req,res,next)=>{
    try{
        const response = await userService.viewAllUsers();
        res.json(response);
    }catch(err){
        next(err);
    }
}

const viewAdsUser = async (req,res,next)=>{
    try{
        const username = req.user
        const response = await userService.viewAdsUser(username);
        res.json(response);
    }catch(err){
        next(err);
    }
}

const viewUserProfile = async (req,res,next)=>{
    try{
        const username = req.user
        const response = await userService.viewUserProfile(username);
        res.json(response);
    }catch(err){
        next(err);
    }
}

//verify user
const verifyUser = async (req,res,next)=>{
    try{
        res.status(200).json({message:"User verified"});
    }catch(err){
        next(err);
    }
}

//update user profile
const editUserProfile = async (req,res,next)=>{
    try{
        const username = req.user;

        const userData = req.body;         
        if (req.file) {
            userData.images = req.file.path;
        } 
        const response = await userService.editUserProfile(username,userData);
        res.json(response);
    }catch(err){
        next(err);
    }
}

module.exports = {
    createUser,
    loginUser,
    viewAllUsers,
    viewAdsUser,
    viewUserProfile,
    verifyUser,
    editUserProfile
};
