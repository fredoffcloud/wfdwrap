"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var appVersion = electron_1.app.getVersion();
var win = null;


if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
  
require('update-electron-app')({
    repo: 'fredoffcloud/wfdwrap',
    updateInterval: '5 minutes',
    logger: require('electron-log')
});
const log = require('electron-log');
  
log.info('Hello, log, är detta en infotext?');
log.warn('Några problem uppstod');
  



var args = process.argv.slice(1), serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
    });
    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'src/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.once('ready-to-show', function () {
        // autoUpdater.checkForUpdates();
        // autoUpdater.checkForUpdatesAndNotify();
        win.webContents.openDevTools();
        win.setBackgroundColor('#ffffff');

    });
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    return win;
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    electron_1.app.on('ready', function () { return setTimeout(createWindow, 400); });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
/* // const ipc = electron_1.ipcMain
// var electron_1 = require("electron");
// electron_1.ipcMain
electron_1.ipcMain.on('synchronous-message', function (event, arg) {
    event.returnValue = 'I heard you!';
});
electron_1.ipcMain.on('ge-app-version', function (event, arg) {
    // electron_1.autoUpdater.getFeedURL();
    event.returnValue = appVersion;
    event.returnValue = electron_1.app.getVersion();
});
// ipcMain
electron_1.ipcMain.on('updateprojekt1', function (event, arg) {
    // autoUpdater.setFeedURL()
    electron_1.autoUpdater.setFeedURL({
        url: 'https://api.github.com/repos/fredoffcloud/angular-electron/releases/latest'
    });
    var res = electron_1.autoUpdater.getFeedURL();
    event.sender.send('har_kommer_feed_url', { feedUrl: res });
});
 */
electron_1.ipcMain.on('app-version-fraga', function (event) {
  console.log('QqXx - Mottager fråga - QqXx');
  console.log('QqXx - Sänder svar ' + appVersion + ' - QqXx');
  event.reply('app-version-svar', { version: appVersion });
  event.sender.send('app-version-svar', { version: appVersion });
  // electron_1.ipcMain.send()
  // electron_1.ipcMain.send('app-version-svar', { version: appVersion } );
    // event.sender.send('app-version-svar', );
});
/* electron_1.autoUpdater.on('update-available', function () {
    win.webContents.send('update_available');
});
electron_1.autoUpdater.on('update-downloaded', function () {
    win.webContents.send('update_downloaded');
});
//# sourceMappingURL=main.js.map */