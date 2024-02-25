const router = require("express").Router();
// Custom Utils:
// Custom Middlewares:
// Connect Database:
const sqliteDb = require("../../database/sqlite");
// Urls Router: /api/v1/urls/...
const UrlsRouter = require("./Urls/UrlsRouter");
router.use("/urls", UrlsRouter);
// Exports:
module.exports = router;
