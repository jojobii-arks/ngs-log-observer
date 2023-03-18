import { app } from 'electron';
import fs from 'fs';

import { globSync } from 'glob';

export default function getGameDirectory() {
  try {
    return globSync(
      app.getPath('documents').replace(/\\/g, '/') +
        `/SEGA/PHANTASYSTARONLINE2*`
    )
      .map((name) => ({ name, ctime: fs.statSync(name).ctime }))
      .sort((a, b) => b.ctime.getTime() - a.ctime.getTime())[0].name;
  } catch (error) {
    console.error(error);
    throw Error(`Unable to find PSO2 directory in Documents.`);
  }
}
