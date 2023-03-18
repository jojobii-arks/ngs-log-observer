import { app } from 'electron';
import fs from 'fs';

import { sync } from 'glob';

export default function getGameDirectory() {
  try {
    return sync(app.getPath('documents') + '\\SEGA\\PHANTASYSTARONLINE2*')
      .map((name) => ({ name, ctime: fs.statSync(name).ctime }))
      .sort((a, b) => b.ctime.getTime() - a.ctime.getTime())[0]
      .name.replaceAll('/', '\\');
  } catch (error) {
    console.error(error);
    throw Error(
      // @ts-ignore asdf
      error
    );
  }
}
