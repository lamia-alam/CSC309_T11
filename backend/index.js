require("dotenv").config();     
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

module.exports = app;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// If your frontend is on http://localhost:5173,
// allow that origin in the CORS config:
app.use(cors({
  origin: FRONTEND_URL,
  // If you need cookies or other credentials, add: credentials: true
}));

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});