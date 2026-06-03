const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile("index.html");
}

ipcMain.handle("select-and-update-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      { name: "XML/Text Files", extensions: ["xml", "txt"] },
      { name: "All Files", extensions: ["*"] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return "No file selected.";
  }

  const filePath = result.filePaths[0];

  const text = fs.readFileSync(filePath, "utf8");

  const updatedText = text.replace(
    /<StaffIdentifier>([0-9]|[1-3][0-9]|40)<\/StaffIdentifier>/g,
    "<StaffIdentifier>5773</StaffIdentifier><StaffEducationLevelCode>05</StaffEducationLevelCode>"
  );

  const parsedPath = path.parse(filePath);

  const newFilePath = path.join(
    parsedPath.dir,
    `${parsedPath.name}.updated${parsedPath.ext}`
  );

  fs.writeFileSync(newFilePath, updatedText, "utf8");

  return `File updated successfully`;
});

app.whenReady().then(createWindow);