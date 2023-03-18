import { app, BrowserWindow, Menu } from 'electron';
import getGameDirectory from '../lib/utils/getGameDirectory';
import { CHANNELS } from '../lib/types';

export default async function runtime(window: BrowserWindow) {
  console.log('Starting application...');

  function ping() {
    console.log('pinging');
    window.webContents.send(CHANNELS.ACTION_NEW);
  }

  function displayAlert(message: string) {
    window.webContents.send(CHANNELS.ALERT, message);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => ping(),
          label: 'ping!',
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  const gameDirectory = getGameDirectory();
  displayAlert(gameDirectory);
}
