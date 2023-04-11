import { BrowserWindow, Menu } from 'electron';
import getGameDirectory from '../lib/node/utils/getGameDirectory';
import { ActionLogItem, CHANNELS } from '../lib/types';
import chokidar from 'chokidar';
import fs from 'fs/promises';
import parseActionLog from '../lib/node/utils/parseActionLog';
import { diffLines } from 'diff';
const encoding = 'utf16le';

export default async function runtime(window: BrowserWindow) {
  console.log('Starting application...');

  // @ts-ignore Using this later
  function displayAlert(message: string) {
    window.webContents.send(CHANNELS.ALERT, message);
  }

  function pushNewAction(action: ActionLogItem[]) {
    window.webContents.send(CHANNELS.ACTION_NEW, action);
  }

  Menu.setApplicationMenu(null);

  const gameDirectory = getGameDirectory();

  const gameLogDirectory = gameDirectory.concat('\\log_ngs\\');

  const datamap = {};

  chokidar
    .watch(gameLogDirectory, { usePolling: true })
    .on('all', async (event, path) => {
      // Don't continue unless it is an ActionLog file.
      if (!path.includes('ActionLog')) {
        return;
      }

      const data = await fs.readFile(path, encoding);
      // Don't continue if there is no data.
      if (!data.length) {
        return;
      }

      if (event === 'add') {
        const actionLog = await parseActionLog(data);
        const age =
          new Date().getTime() -
          new Date(actionLog[actionLog.length - 1].log_time).getTime();

        const twoDays = 1000 * 60 * 60 * 48;

        if (age >= twoDays) {
          return;
        }

        datamap[path] = data;
        console.log(Object.keys(datamap));

        return;
      }

      if (event === 'change') {
        console.log('change found', path);

        diffLines(datamap[path], data).forEach(async (part) => {
          if (part.added) {
            datamap[path] = data;
            const actionLog = await parseActionLog(part.value);
            console.log('new events', actionLog);
            pushNewAction(actionLog);
          }
        });
      }
    });
}
