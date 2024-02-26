const cron = require("node-cron");
// Cron Job to delete urls that exist over 30 minutes, Cron Job runs every 5-minute:
// import UrlsModel
const UrlsModel = require("../api/v1/Urls/UrlsModel");
function deleteUrlCronJob() {
  cron.schedule("*/1 * * * *", () => {
    try {
      //   // Calculate the timestamp for 10 minutes ago
      //   const tenMinutesAgo = new Date();
      //   tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
      //   const tenMinutesAgoTimestamp = tenMinutesAgo.toISOString();
      //   // Delete data from the specified table where the time field is greater than 10 minutes ago
      //   const deletionQuery = `DELETE FROM ${tableName} WHERE ${timeField} > '${tenMinutesAgoTimestamp}'`;
      //   db.run(deletionQuery, [], function (err) {
      //     if (err) {
      //       console.error("Error:", err.message);
      //     } else {
      //       console.log(
      //         `Data deleted successfully. Rows affected: ${this.changes}`
      //       );
      //     }
      //   });
      console.log("Cron is Running!");
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 5);
      const sqlFormattedDate = tenMinutesAgo
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      console.log(sqlFormattedDate);
    //   const sql = `SELECT * FROM urls WHERE created <= ?`;
    //   UrlsModel.all(sql, [sqlFormattedDate], (err, rows) => {
    //     if (err) {
    //       console.error("SQLite Error:", err);
    //     } else {
    //       console.log("Deleted!");
    //       console.log(rows);
    //     }
    //   });
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
}
// Exports:
module.exports = { deleteUrlCronJob };
