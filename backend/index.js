require("dotenv").config();     
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);

module.exports = app;
