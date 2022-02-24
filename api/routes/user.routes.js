const router = require("express").Router();

router.route("/").get((req, res, next) => {
  res.status(200).json({
    status: 200,
    message: "Success",
    data: "Hello Users",
  });
});

module.exports = router;
