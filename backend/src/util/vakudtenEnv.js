// vakudtenEnv.js
const envalid = require('envalid');
const { port, str } = envalid;
const process = require('process');
const dotenv = require('dotenv');
dotenv.config();
 
const env = envalid.cleanEnv(process.env, {
  PORT: port(), // Provide a default value or make it required
  TOKEN_SECRET: str(),
});

module.exports = env;