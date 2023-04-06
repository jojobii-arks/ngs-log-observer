import { BrowserWindow, ipcMain } from 'electron';
import getGameDirectory from '../lib/node/utils/getGameDirectory';
import { CHANNELS } from '../lib/types';

export type SetItAlwaysOnTopResponse = {
  success: boolean;
  current?: boolean;
};

export function attachIpcHandlers() {
  /** @method CHANNELS.GET_GAME_DIR */
  ipcMain.handle(CHANNELS.GET_GAME_DIR, () => {
    return getGameDirectory();
  });
  ipcMain.handle(CHANNELS.SET_IS_ALWAYS_ON_TOP, (_, isAlwaysOnTop: boolean) => {
    console.log('Toggling always on top');
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      window.setAlwaysOnTop(isAlwaysOnTop);
      return {
        success: true,
        current: window.isAlwaysOnTop(),
      };
    } else {
      console.log('No window focused');
      return {
        success: false,
      };
    }
  });
}
