const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("> Connection with in-memory SQLite has been established");
  }
});

// db.run("CREATE TABLE langs (name text)", (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("INIT TABLE CREATED");
//   }
// });
// function sqliteInit() {
//   //   try {
//   //     return await new sqlite3.Database(":memory:");
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   const db = new sqlite3.Database(":memory:", (error) => {
//     if (error) {
//       return console.error(error.message);
//     } else {
//       console.log("> Connection with in-memory SQLite has been established");
//       db.run("CREATE TABLE langs (name text)", (err) => {
//         if (err) {
//           console.log(err.message);
//         } else {
//           console.log("TABLE CREATED");
//         }
//       });
//     }
//     return db;
//   });
// }
// sqliteDb.run("CREATE TABLE langs(name text)");
// // insert one row into the langs table
// sqliteDb.run(`INSERT INTO langs(name) VALUES(?)`, ["C"], function (err) {
//   if (err) {
//     return console.log(err.message);
//   }
//   // get the last insert id
//   console.log(`A row has been inserted with rowid ${this.lastID}`);
// });
// Exports:
module.exports = db;
