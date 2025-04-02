const express = require("express");
const routes = require("./routes");
var cors = require('cors')

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all domains (or specify a domain)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Allowed HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // Allowed headers
  next();
});

var corsOptions = {
    origin: FRONTEND_URL,
    //optionsSuccessStatus: 200
}

console.log("CORS ALLOWING", FRONTEND_URL);

app.use(cors(corsOptions));
app.use(express.json());
app.use('', routes);

module.exports = app;
