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
app.use('/profilePic', express.static(path.join(__dirname, '../../profilePic')));
// eslint-disable-next-line no-undef
app.use('/uploads/watermarked', express.static(path.join(__dirname, '../../uploads/watermarked')));

//IMPORT ROUTES
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adsRoutes');
const auctionRegRoutes = require('./routes/auctionRegRoutes');
const auctionInqueryRoutes = require('./routes/auctionInqueryRoutes');
const LRentalTransactionRoutes = require('./routes/LRentalTransactionRoutes');
const LRentInqueryRoutes = require('./routes/LRentInqueryRoutes');
const PricingRoutes = require('./routes/PricingRoutes');
const adsFeatureRoutes = require('./routes/adsFeature');


//API routes
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/auction', auctionRegRoutes);
app.use('/api/auction-inquery', auctionInqueryRoutes);
app.use('/api/longrental', LRentalTransactionRoutes);
app.use('/api/longrental-inquery', LRentInqueryRoutes);
app.use('/api/pricing', PricingRoutes);
app.use('/api/ads-feature', adsFeatureRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send(`Hello, World! This is your Express server running on port ${port}.`);
});

//Error handling middleware
// eslint-disable-next-line 
app.use((err, req, res, next) => {
    // Use the error status if available, otherwise default to 500
    const status = err.status || 500;
    // Send the error status and message as JSON
    res.status(status).json({ message: err.message });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
