const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const activeWindow = require("active-win");
const path = require("path");
const Store = require("./utils/store.js");
let mainWindow = null;

// First instantiate the class
const store = new Store({
    configName: "user-details",
  
    defaults: {},
  });

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  
  const template = [
    {
      role: "Help",
      submenu: [
        {
          label: "Change User",
          click:  () => {
            dialog
              .showMessageBox(mainWindow, {
                cancelId: 1,
                title: "Change Agent User",
                message:
                  "This will clear current account details and will be presented with activation screen.",
                detail: "Make sure current session is exited (End work)",
                type: "info",
                buttons: ["OK CONTINUE", "Cancel"],
              })
              .then((result) => {
                if (result.response === 0) {
                                store.set("failedLogs", []);
                }
              });
          },
        },

        {
          label: "Contact Us",
          click:  () => {
            dialog.showMessageBox(mainWindow, {
              cancelId: 0,
              type: "info",
              title: "Contact Us",
              message: "Email: mcntlsupport@molecularconnections.com",
              buttons: ["cancel"],
            });
          },
        },
        {
          label: "Force Quit App",
          click: async () => {
            app.exit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("set-title", (event, title) => {
  const webContents = event.sender;

  const result = activeWindow.getOpenWindowsSync();

  if (!result) {
    return;
  }

 // console.log(result );
  mainWindow.webContents.send('render-send', result)
});
