
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
  origin: ['https://csc309t11-production.up.railway.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);
