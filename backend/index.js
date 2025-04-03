
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
  methods: ['GET', 'POST'], // allowed methods
  credentials: true, // if you need to send cookies or authentication tokens
  // If you need cookies or other credentials, add: credentials: true
}));

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);
