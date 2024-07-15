// Import mongoose, dotenv, and envalid
const mongoose = require('mongoose');
const process = require('process');
require('dotenv').config();
const envalid = require('envalid');

// Use envalid to validate and clean environment variables
const { str } = envalid;
const env = envalid.cleanEnv(process.env, {
  MONGO_URI: str(),
});

// Asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
	await mongoose.connect(env.MONGO_URI, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	});
	console.log('MongoDB Connected...');
  } catch (err) {
	console.error(`Error: ${err.message}`);
	// Exit process with failure
	process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;