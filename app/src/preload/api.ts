import { ipcRenderer } from 'electron';
import { CHANNELS } from '../lib/types';
import { SetItAlwaysOnTopResponse } from '../main/ipcHandlers';

// Custom APIs for renderer
const api = {
  onPing: (callback: Parameters<typeof ipcRenderer.on>[1]) =>
    ipcRenderer.on(CHANNELS.ACTION_NEW, callback),
  onAlert: (callback: Parameters<typeof ipcRenderer.on>[1]) =>
    ipcRenderer.on(CHANNELS.ALERT, callback),
  onNewAction: (callback: Parameters<typeof ipcRenderer.on>[1]) =>
    ipcRenderer.on(CHANNELS.ACTION_NEW, callback),
  getGameDirectory: async () => {
    return await ipcRenderer.invoke(CHANNELS.GET_GAME_DIR);
  },
  openGameDirectory: async () => {
    return await ipcRenderer.invoke(CHANNELS.OPEN_GAME_DIR);
  },
  setIsAlwaysOnTop: async (isAlwaysOnTop: boolean) => {
    return (await ipcRenderer.invoke(
      CHANNELS.SET_IS_ALWAYS_ON_TOP,
      isAlwaysOnTop
    )) as SetItAlwaysOnTopResponse;
  },
  // @ts-expect-error It should be able to accept no strings...
  clear: () => ipcRenderer.removeAllListeners(),
};

export default api;
