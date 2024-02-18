const router = require("express").Router();
const createError = require("http-errors");
// Custom Utils:
// Custom Middlewares:
// Urls Routers:
//
// router.route("/").post(createPricing).get(getAllPricings);
// router.route("/pricing/:pricingId").get(getPricingById);
// Urls Error Handling:
router
  .use((req, res, next) => {
    next(createError(404, "This /urls directory does not exist!"));
  })
  .use((err, req, res, next) => {
    let errorStatus = err.status || 404;
    let errorMessage = err.message || "";
    return res.status(errorStatus).json({
      code: 0,
      success: false,
      message: errorMessage,
    });
  });
// Exports:
module.exports = router;
