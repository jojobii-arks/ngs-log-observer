import { contextBridge } from 'electron';
import api from './api';

try {
  contextBridge.exposeInMainWorld('api', api);
} catch (error) {
  console.error(error);
}
