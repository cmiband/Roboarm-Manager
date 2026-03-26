const { app, BrowserWindow } = require('electron');

require('dotenv').configDotenv();
console.log(process.env['DEVICE_NAME']);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadFile('dist/main-app/browser/index.html');
}

app.whenReady().then(() => {
  createWindow();
})