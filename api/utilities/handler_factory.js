const response_handler = require("./response_handler");
const custom_error = require("./custom_error");

export const create_one = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(
        new custom_error(400, "Bad Request", "Error creating record")
      );
    }
    return response_handler(res, 201, `${Model} created`, doc);
  } catch (error) {
    return next(new custom_error(500, "Internal Server Error", error));
  }
};
