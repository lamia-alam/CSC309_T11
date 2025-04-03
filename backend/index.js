require("dotenv").config();     
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Enable CORS for all routes
const allowedOrigins = [
    'http://localhost:5173', // Development frontend
    process.env.FRONTEND_URL // Production frontend
].filter(Boolean); // Remove any undefined values

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);

module.exports = app;
