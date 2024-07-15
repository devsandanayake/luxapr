const express = require('express');
const dotenv = require('dotenv'); // Import the dotenv module
const env = require('./util/vakudtenEnv');
dotenv.config();

const app = express();
const port = env.PORT 

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express server running on port 8002.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
