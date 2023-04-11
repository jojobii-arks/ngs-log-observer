import csv from 'csvtojson';
import type { ActionLogItem } from './types';

export default async function parseActionLog(actionLog: string) {
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
			'current_meseta'
		]
	}).fromString(actionLog);
	return result as ActionLogItem[];
}
