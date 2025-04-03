require("dotenv").config();     
const express = require("express");
const routes = require("./routes");

const app = express();

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);

module.exports = app;
