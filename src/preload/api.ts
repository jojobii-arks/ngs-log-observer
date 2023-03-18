import { ipcRenderer } from 'electron';
import { CHANNELS } from '../lib/types';

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
  clear: () => ipcRenderer.removeAllListeners(''),
};

export default api;
