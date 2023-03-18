import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import getGameDirectory from '../lib/utils/getGameDirectory';
import { CHANNELS } from '../lib/types';

export default async function runtime(window: BrowserWindow) {
  console.log('Starting application...');

  function displayAlert(message: string) {
    window.webContents.send(CHANNELS.ALERT, message);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => displayAlert('pong!'),
          label: 'ping!',
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  const gameDirectory = getGameDirectory();

  ipcMain.handle(CHANNELS.GET_GAME_DIR, () => {
    return gameDirectory;
  });
}
