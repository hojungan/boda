const { db } = require("./init");

function InsertSite(url, name) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Sites (url, name) VALUES (?, ?)`,
      [url, name],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

function DeleteSite(id) {
  db.run("DELETE FROM Sites WHERE id = ?", id, function (err) {
    if (err) {
      return err.message;
    }
    return true;
  });
}

module.exports = { InsertSite, DeleteSite };
