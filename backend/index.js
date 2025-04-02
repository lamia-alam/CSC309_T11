const express = require("express");
const routes = require("./routes");
var cors = require('cors')

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

var corsOptions = {
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200
}

console.log(FRONTEND_URL);

app.use(cors(corsOptions));
app.use(express.json());
app.use('', routes);

module.exports = app;
