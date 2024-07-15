const express = require('express');
const dotenv = require('dotenv'); // Import the dotenv module
const env = require('./util/vakudtenEnv');
const connectDB = require('../config/db');
dotenv.config();


const app = express();
const port = env.PORT 

connectDB(); // Connect to the database

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express server running on port 8002.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
