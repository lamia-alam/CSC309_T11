require("dotenv").config();     
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: 'https://csc309t11-production.up.railway.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors())

// parse JSON bodies
app.use(express.json());

const routes = require("./routes");
// Mount your routes
app.use("", routes);

module.exports = app;
