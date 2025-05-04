import type { BrowserWindowConstructorOptions } from 'electron';
import { BrowserWindow } from 'electron';
import { mergeObject } from '@utils';

// TODO: 创建窗口
export function createWindow(url: string, options: BrowserWindowConstructorOptions = {}, callback?: (...args: any[]) => void) {
  const win = new BrowserWindow(mergeObject({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 35,
      color: '#dddddd',
    },
  } as BrowserWindowConstructorOptions, options, { show: false }));

  // TODO: 加载页面
  win.loadURL(url).then((...args: any[]) => {
    callback && callback(...args);
  });

  // TODO: 窗口显示
  if (!('show' in options) || options.show) {
    win.once('ready-to-show', function() {
      win.show();
    });
  }

  return win;
}
