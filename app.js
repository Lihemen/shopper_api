const express = require("express");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rate_limit = require("express-rate-limit");

const router = require("./api/routes");

const custom_error = require("./api/utilities/custom_error");
const error_handler = require("./api/utilities/error_handler");

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
app.use("/api/v1", router);

app.all("*", (req, res, next) => {
  const error = new custom_error(
    404,
    "Not Found",
    `The route ${req.method} ${req.originalUrl} is not defined`
  );
  next(error);
});

app.use((error, req, res, next) => {
  error_handler(error, res);
});

module.exports = app;
