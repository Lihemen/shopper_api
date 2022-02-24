const error_dev = (err, res) => {
  if (err.status_code) {
    res.status(err.status_code).json({
      status: "error",
      message: err.message,
      stack: err.stack,
      data: err.data,
    });
  }
  res.status(500).json({
    status: "error",
    message: err.message,
    stack: err.stack,
    data: err.data,
  });
};

const error_prod = (err, res) => {
  if (err.status_code) {
    res.status(err.status_code).json({
      status: "error",
      message: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: err.message,
  });
};

const error_handler = (err, res) => {
  process.env.NODE_ENV === "production"
    ? error_prod(err, res)
    : error_dev(err, res);
};

module.exports = error_handler;
