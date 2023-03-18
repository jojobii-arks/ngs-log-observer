import { app, BrowserWindow, Menu } from 'electron';
import getGameDirectory from '../lib/node/utils/getGameDirectory';
import { ActionLogItem, CHANNELS } from '../lib/types';
import chokidar from 'chokidar';
import readActionLog from '../lib/node/utils/readActionLog';

export default async function runtime(window: BrowserWindow) {
  console.log('Starting application...');

  function displayAlert(message: string) {
    window.webContents.send(CHANNELS.ALERT, message);
  }

  function pushNewAction(action: ActionLogItem[]) {
    window.webContents.send(CHANNELS.ACTION_NEW, action);
  }

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => window.webContents.openDevTools(),
          label: 'dev tools',
        },
        {
          click: () => displayAlert('pong!'),
          label: 'ping!',
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

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
      const data = await readActionLog(path);
      // Don't continue if there is no data.
      if (!data.length) {
        return;
      }

      if (event === 'add') {
        const age =
          new Date().getTime() -
          new Date(data[data.length - 1].log_time).getTime();

        const twoDays = 1000 * 60 * 60 * 48;

        if (age >= twoDays) {
          return;
        }

        datamap[path] = [...data];
        console.log(Object.keys(datamap));

        return;
      }

      if (event === 'change') {
        console.log('change found', data.length);
        console.log('final id:', data[data.length - 1].action_id);
        console.log(path);

        const previousLength = datamap[path].length;

        if (data.length > previousLength) {
          const difference = data.length - previousLength;

          const payload: ActionLogItem[] = [];
          for (let index = difference; index > 0; index--) {
            const action = data[data.length - index];
            console.log('new event', action);
            datamap[path].push(action);
            payload.push(action);
          }
          pushNewAction(payload);
        }
        return;
      }
    });
}
