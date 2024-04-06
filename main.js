const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

ipcMain.on("crawl", (event, args) => {
  const crawl = require("./crawler/crawl");
  const { url, workType } = args;
  crawl(url, workType);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
