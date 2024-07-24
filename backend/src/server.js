const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const env = require('./util/vakudtenEnv');
const connectDB = require('../config/db');
const path = require('path');
const morgan = require('morgan');


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
app.use(morgan('dev'));

// Assuming the 'uploads' directory is directly in the project root
// eslint-disable-next-line no-undef
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
// eslint-disable-next-line no-undef
app.use('/uploads/watermarked', express.static(path.join(__dirname, '../../uploads/watermarked')));

//IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adsRoutes');
const auctionRegRoutes = require('./routes/auctionRegRoutes');

//API routes
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/auction', auctionRegRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send(`Hello, World! This is your Express server running on port ${port}.`);
});

//Error handling middleware
// eslint-disable-next-line 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(res.json({ message: err.message }));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
