const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  });

  win.setMenu(null);
  win.loadFile('dist/main-app/browser/index.html');
}

app.whenReady().then(() => {
  createWindow();
})