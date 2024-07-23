const userService = require('../services/userService');

// Create a new user in the database
const createUser = async (req, res, next) => {
    try {
        const { username, firstName, lastName, email, password, contactNumber } = req.body;

        const response = await userService.createUser({ username, firstName, lastName, email, password, contactNumber });

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

module.exports = {
    createUser,
    loginUser,
};
