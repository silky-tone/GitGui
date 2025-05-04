import { app, type BrowserWindow } from 'electron';
import { createWindow } from './utils';

// TODO: 启动窗口
let launch: BrowserWindow | undefined;

// TODO: 主窗口
let mainWin: BrowserWindow | undefined;

const port = Number(import.meta.env['VITE_PORT']);

app.on('ready', function() {
  if (!launch) launch = createWindow(`http://localhost:${port}/launch`, {
    width: 400,
    height: 300,
    resizable: false,
    titleBarOverlay: false,
  });
  if (!mainWin) {
    mainWin = createWindow(`http://localhost:${port}`);
    // TODO: 主窗口显示 - 启动窗口关闭
    mainWin.on('show', function() {
      if (launch) launch.destroy();
    });
  }
});

app.on('window-all-closed', function() {
  process.platform !== 'darwin' && app.quit();
});
