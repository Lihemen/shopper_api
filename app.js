const express = require("express");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rate_limit = require("express-rate-limit");

const limit = rate_limit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000, // limit each IP to 10000 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

const app = express();

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set security HTTP headers

// app.use(helmet());
app.use(hpp());
app.use(xss());

// Custom handlers

module.exports = app;
