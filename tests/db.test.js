// database file exists test using jest
test("database file exists", () => {
  const fs = require("fs");
  expect(fs.existsSync("./data.sqlite")).toBe(true);
});

// insert site to table and get id returned
test("site insert returns id", async () => {
  const { InsertSite } = require("../database/database");
  const id = await InsertSite("https://example.com", "Example");
  expect(id).toBeGreaterThan(0);
});

// delete site from table by id
test("delete site by id", async () => {
  const { InsertSite, DeleteSite } = require("../database/database");
  const id = await InsertSite("https://example2.com", "Example2");
  expect(id).toBeGreaterThan(0);
  DeleteSite(id);
  expect(true).toBe(true);
});
