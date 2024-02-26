const sqliteDb = require("../../../database/sqlite");
const UrlsModel = sqliteDb.run(
  `CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    original TEXT, 
    shorten TEXT, 
    created DATE DEFAULT CURRENT_TIMESTAMP)`,
  (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("urls table existed or created table urls");
    }
  }
);
// Exports:
module.exports = UrlsModel;
