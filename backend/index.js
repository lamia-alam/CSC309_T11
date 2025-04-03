require("dotenv").config();     
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors())

// parse JSON bodies
app.use(express.json());

app.get('/test', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://csc309t11-production.up.railway.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    res.send('Hello World');
});

const routes = require("./routes");
// Mount your routes
app.use("", routes);

module.exports = app;
