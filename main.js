const { app, BrowserWindow, ipcMain, screen } = require("electron");
const path = require("node:path");

let win;
const createWindow = () => {
  win = new BrowserWindow({
    x: 10,
    y: 400,
    width: 700,
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
  win.maximize();
  win.webContents.openDevTools();
};

const { Menu } = require("electron");

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);

// IPC events

ipcMain.on("crawl", (event, args) => {
  const crawl = require("./crawler/crawl");
  const { url, workType } = args;
  const result = crawl(url, workType);
  event.reply("crawl-result", result);
});

// App Events

app.whenReady().then(() => {
  createWindow();

  // This event is emitted when the app is activated, e.g. when the user clicks on the app's dock icon
  // If no browser windows are open, a new one is created. Otherwise, the first window is focused.
  // This is useful when the app is closed and then reopened, as it ensures that there is always a window visible and focused.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
