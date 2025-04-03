require("dotenv").config();     
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.options('*', cors())

// parse JSON bodies
app.use(express.json());

// Mount your routes
app.use("", routes);

module.exports = app;
