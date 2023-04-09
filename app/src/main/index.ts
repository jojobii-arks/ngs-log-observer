import { app, shell, BrowserWindow } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { attachIpcHandlers } from './ipcHandlers';
import runtime from './runtime';

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 250,
    minHeight: 250,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
    alwaysOnTop: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#20252e',
      symbolColor: '#a6adbb',
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // Open the DevTools during development.
  if (is.dev) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.ngs-log-observer');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window, {
      zoom: true,
      escToCloseWindow: true,
    });
  });

  // Attach IPC Handlers before window creation.
  attachIpcHandlers();

  // Create window and execute runtime.
  const window = createWindow();
  runtime(window);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});
