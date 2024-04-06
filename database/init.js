const path = require("node:path");
const fs = require("node:fs");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.sqlite");

async function initialize() {
  const fileExists = await new Promise((resolve) => {
    fs.access(path.join(__dirname, "data.sqlite"), fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });

  if (!fileExists) {
    console.log("Creating database");
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Sites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            name TEXT NOT NULL
          )`);

      db.run(`CREATE TABLE IF NOT EXISTS Pages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            title TEXT NOT NULL
          )`);

      db.run(`CREATE TABLE IF NOT EXISTS Issues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pageId INTEGER NOT NULL,
            violation TEXT NOT NULL,
            description TEXT NOT NULL,
            element TEXT NOT NULL,
            element_screenshot TEXT NOT NULL,
            help TEXT NOT NULL,
            wcagRef TEXT NOT NULL,
            violation_type TEXT NOT NULL,
            FOREIGN KEY(pageId) REFERENCES Pages(id)
          )`);
    });
    console.log("Database created");
  }
}

module.exports = { db, initialize };
