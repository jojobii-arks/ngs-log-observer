import { ipcMain } from 'electron';
import getGameDirectory from '../lib/node/utils/getGameDirectory';
import { CHANNELS } from '../lib/types';

export function attachIpcHandlers() {
  /** @method CHANNELS.GET_GAME_DIR */
  ipcMain.handle(CHANNELS.GET_GAME_DIR, () => {
    return getGameDirectory();
  });
}
