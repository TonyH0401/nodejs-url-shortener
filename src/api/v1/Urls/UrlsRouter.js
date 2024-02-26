const router = require("express").Router();
const createError = require("http-errors");
// Custom Utils:
const { deleteUrlCronJob } = require("../../../utils/urlsCronJob");
deleteUrlCronJob();
// Custom Middlewares:
const {
  createShortenUrl,
  getAllUrls,
  getUrlInfo,
  deleteUrl,
  getAllTable,
  accessShortenUrl,
  validateAdmin,
} = require("./UrlsMiddleware");
// Urls Routers:
//
router.route("/").post(createShortenUrl).get(validateAdmin, getAllUrls);
//
router.route("/:shortenId").get(validateAdmin, getUrlInfo).delete(validateAdmin, deleteUrl);
//
router.route("/access/:shortenId").get(accessShortenUrl);
//
router.route("/database/tables").get(validateAdmin, getAllTable);
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
