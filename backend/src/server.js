const express = require('express');

const app = express();
const port = undefined || 8002;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Express server running on port 8002.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
