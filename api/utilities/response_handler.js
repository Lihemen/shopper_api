const response_handler = (res, status_code, message, data = []) => {
  return res.status(status_code).json({
    status: status_code,
    message,
    data,
  });
};

module.exports = response_handler;
