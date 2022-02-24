const { createServer } = require("http");
const app = require("../app");
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(
    `\t UNCAUGHT EXCEPTION: SHUTTING DOWN SERVER WITH ERROR: ${{
      message: err.message,
      stack: err.stack,
      type: err.name,
    }}`
  );
});

const server = createServer(app);

server.on("error", on_server_error);
server.on("listening", on_server_running);

server.listen(normalize_port(port));

const db =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST
    : "mongodb://localhost/shopper";

const connect_db = async () => {
  const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const connected = await mongoose.connect(db, db_options);
  if (!connected) {
    console.error("\n \t ERROR CONNECTING TO DB \n");
    // process.exit(1);
  }
  console.log("\n \t CONNECTED TO DB \n");
};

connect_db();

function normalize_port(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function on_server_error(err) {
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (err.code) {
    case "EACCES":
      console.error("\n \t" + bind + " requires elevated privileges \n");
      process.exit(1);
    case "EADDRINUSE":
      console.error("\n \t" + bind + " address already in use \n");
      process.exit(1);
    default:
      throw err;
  }
}

function on_server_running() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "Pipe " + addr : "Port " + addr.port;
  console.log("\n \t SERVER RUNNING ON " + bind + " \n");
}

function on_server_close() {
  console.log("\n \t SERVER DISCONNECTING... \n");
  process.exit(1);
}

process.on("unhandledRejection", (err) => {
  console.log(`\t UNHANDLED REJECTION: SHUTTING DOWN SERVER WITH ERROR:${err}`);
});

process.on("SIGINT", on_server_close);
