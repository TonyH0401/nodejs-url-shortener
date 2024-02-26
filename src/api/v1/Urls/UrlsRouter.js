const router = require("express").Router();
const createError = require("http-errors");
// Custom Utils:
// Custom Middlewares:
const {
  createShortenUrl,
  getAllUrls,
  getUrlInfo,
  deleteUrl,
  getAllTable,
  accessShortenUrl,
} = require("./UrlsMiddleware");
// Urls Routers:
//
router.route("/").post(createShortenUrl).get(getAllUrls);
//
router.route("/:shortenId").get(getUrlInfo).delete(deleteUrl);
//
router.route("/access/:shortenId").get(accessShortenUrl);
//
router.route("/database/tables").get(getAllTable);
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
