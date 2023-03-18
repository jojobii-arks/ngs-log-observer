import { ipcRenderer } from 'electron';

// Custom APIs for renderer
const api = {
  onPing: (callback: Parameters<typeof ipcRenderer.on>[1]) =>
    ipcRenderer.on('ping', callback),
  clear: () => ipcRenderer.removeAllListeners(''),
};

export default api;
