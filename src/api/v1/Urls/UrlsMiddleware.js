const createError = require("http-errors");
// Custom Utils:
// Custom Middlewares:
// Import Models:
const UrlsModel = require("./UrlsModel");
// Create Shorten Url:
module.exports.createShortenUrl = async (req, res, next) => {
  const { originalUrl } = req.body;
  // I may cast a try...catch block outside and separate from the callback
  // to prevent header being sent twice, more in the notes
  const shortenUrl = Math.random().toString(36).substring(7);
  const sql = `INSERT INTO urls (original, shorten) VALUES (?, ?)`;
  UrlsModel.run(sql, [originalUrl, shortenUrl], (err) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        code: 1,
        success: true,
        data: {
          originalUrl: originalUrl,
          shortenUrlId: req.headers.host + "/api/v1/urls/access/" + shortenUrl,
        },
      });
    }
  });
};
// Get All Urls:
module.exports.getAllUrls = async (req, res, next) => {
  const sql = `SELECT * FROM urls`;
  UrlsModel.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        code: 1,
        success: true,
        total: rows.length,
        data: rows,
      });
    }
  });
};
// Get Url Information:
module.exports.getUrlInfo = async (req, res, next) => {
  const { shortenId } = req.params;
  const sql = `SELECT * FROM urls WHERE shorten = ?`;
  UrlsModel.get(sql, [shortenId], (err, row) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      if (!row) {
        return res.status(404).json({
          code: 0,
          success: false,
          message: `${shortenId} Not Found!`,
        });
      } else {
        return res.status(200).json({
          code: 1,
          success: true,
          data: row,
        });
      }
    }
  });
};
// Delete A Url:
module.exports.deleteUrl = async (req, res, next) => {
  const { shortenId } = req.params;
  const checkExistSql = `SELECT * FROM urls WHERE shorten = ?`;
  UrlsModel.get(checkExistSql, [shortenId], (err, row) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      if (!row) {
        return res.status(404).json({
          code: 0,
          success: false,
          message: `${shortenId} Not Found!`,
        });
      } else {
        const deleteSql = `DELETE FROM urls WHERE shorten = ?`;
        UrlsModel.run(deleteSql, [shortenId], (err) => {
          if (err) {
            return res.status(500).json({
              code: 0,
              success: false,
              message: err.message,
            });
          } else {
            return res.status(200).json({
              code: 1,
              success: true,
              message: `${shortenId} was deleted!`,
              data: row,
            });
          }
        });
      }
    }
  });
};
// Access Shorten Url:
module.exports.accessShortenUrl = async (req, res, next) => {
  const { shortenId } = req.params;
  const sql = `SELECT original FROM urls WHERE shorten = ?`;
  UrlsModel.get(sql, [shortenId], (err, row) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      if (!row) {
        return res.status(404).json({
          code: 0,
          success: false,
          message: "Link Not Found!",
        });
      } else {
        const original = row.original;
        return res.redirect(original);
      }
    }
  });
};
// Admin Validation:
module.exports.validateAdmin = async (req, res, next) => {
  const { user, password } = req.query;
  try {
    if (user == "root" && password == "NrjRjenf2et8kxF") {
      return next();
    }
    return res.status(404).json({
      code: 0,
      success: false,
      message: "Forbiden",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
// Get All Table In Database:
// i should not leave this here in a route
module.exports.getAllTable = async (req, res, next) => {
  const query = "SELECT name FROM sqlite_master WHERE type='table'";
  // technically I should use sqliteDb for consistency but UrlsModel will do
  UrlsModel.all(query, [], (err, tables) => {
    if (err) {
      return res.status(500).json({
        code: 0,
        success: false,
        message: err.message,
      });
    } else {
      return res.status(200).json({
        code: 1,
        success: true,
        total: tables.length,
        tables: tables.map((table) => table.name),
      });
    }
  });
};
