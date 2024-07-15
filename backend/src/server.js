const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const env = require('./util/vakudtenEnv');
const connectDB = require('../config/db');

// Initialize dotenv configuration
dotenv.config();

// Connect to the database with error handling
connectDB()

const app = express();
const port = env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send(`Hello, World! This is your Express server running on port ${port}.`);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
