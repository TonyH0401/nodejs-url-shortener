const cron = require("node-cron");
// Cron Job to delete urls that exist over 30 minutes, Cron Job runs every 5-minute:
// import UrlsModel
const UrlsModel = require("../api/v1/Urls/UrlsModel");
function deleteUrlCronJob() {
  cron.schedule("*/5 * * * *", () => {
    try {
      // Calculate the timestamp for 5 minutes ago
      const tenMinutesAgo = new Date();
      tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 30);
      const sqlFormattedDate = tenMinutesAgo
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      // console.log(sqlFormattedDate);
      // Delete data from the specified table where the time field is greater than 10 minutes ago
      const sql = `DELETE FROM urls WHERE created < ?`;
      UrlsModel.run(sql, [sqlFormattedDate], (err) => {
        if (err) {
          console.error("SQLite Deletion Error:", err);
        } else {
          console.log("Annual Outdated Urls Deleted!");
        }
      });
    } catch (error) {
      console.error("Cron Job Error:", error);
    }
  });
}
// Exports:
module.exports = { deleteUrlCronJob };
