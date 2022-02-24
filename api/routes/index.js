const router = require("express").Router({ mergeParams: true });

const user_router = require("./user.routes");
const order_router = require("./order.routes");
const product_router = require("./product.routes");

router.use("/orders", order_router);
router.use("/products", product_router);
router.use("/users", user_router);

module.exports = router;
