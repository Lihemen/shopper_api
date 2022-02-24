class CustomError extends Error {
  constructor(status_code = 404, message, data = []) {
    super();

    this.status = status_code;
    this.message = message;
    this.data = data;
    this.is_operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
