import fs from 'fs/promises';
import csv from 'csvtojson';
import { ActionLogItem } from '../types';
const encoding = 'utf16le';

export default async function readActionLog(filepath: string) {
  const data = await fs.readFile(filepath, encoding);
  const result = await csv({
    noheader: true,
    delimiter: '	',
    headers: [
      'log_time',
      'action_id',
      'action_type',
      'player_id',
      'player_name',
      'item_name',
      'item_num',
      'current_meseta',
    ],
  }).fromString(data);
  return result as ActionLogItem[];
}
