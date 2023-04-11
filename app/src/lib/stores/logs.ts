import getGameDirectory from '$lib/getGameDirectory';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { diffLines } from 'diff';
import parseActionLog from '$lib/parseActionLog';
import { metadata } from 'tauri-plugin-fs-extra-api';
import { readable } from 'svelte/store';
import type { ActionLogItem } from '$lib/types';

const encoding = 'utf-16le';
const twoDays = 1000 * 60 * 60 * 48;

async function readEncodedTextFile(path: string) {
	const data = await readBinaryFile(path);
	return new TextDecoder(encoding).decode(data);
}

const logsArray: ActionLogItem[] = [];

export const gameDirectory = readable<{
	game: { path: string | null; label: string | null };
	log: { path: string | null; label: string | null };
}>({ game: { path: null, label: null }, log: { path: null, label: null } }, function start(set) {
	(async () => {
		const gameDirectory = await getGameDirectory();
		set({
			game: {
				path: gameDirectory.gameDirectoryPath,
				label: gameDirectory.gameDirectoryPath.split('\\').at(-1) as string
			},
			log: {
				path: gameDirectory.gameLogDirectoryPath,
				label: gameDirectory.gameLogDirectoryPath.split('\\').at(-1) as string
			}
		});
	})();
});

export const logs = readable(logsArray, function start(set) {
	let stop;

	(async () => {
		const datamap: Record<string, string> = {};
		const pso2GameLogDirectory = (await getGameDirectory()).gameLogDirectoryPath;

		/** Grab initial data */
		(await readDir(pso2GameLogDirectory)).filter(async (file) => {
			const meta = await metadata(file.path);
			const metaAge = new Date().getTime() - new Date(meta.modifiedAt).getTime();
			if (metaAge >= twoDays) {
				return;
			}

			const data = await readEncodedTextFile(file.path);

			/**
			 * The following sequence blocks the main thread. Maybe rewrite the parsing to be 100% in Rust?
			 */
			// if (!data.length) return false;
			// const actionLog = await parseActionLog(data);
			// const age =
			// 	new Date().getTime() - new Date(actionLog[actionLog.length - 1].log_time).getTime();

			// if (age >= twoDays) {
			// 	return;
			// }

			datamap[file.path] = data;

			return;
		});

		const polling = setInterval(async () => {
			/** Poll the game log directory for changes. */
			await readDir(pso2GameLogDirectory);
		}, 1000);

		const stopWatching = await watchImmediate(
			pso2GameLogDirectory,
			{ recursive: true },
			async (event) => {
				const {
					paths: [path]
				} = event;
				console.log('change found', path);
				const data = await readEncodedTextFile(path);

				diffLines(datamap[path], data).forEach(async (part) => {
					if (part.added) {
						datamap[path] = data;
						const actionLog = await parseActionLog(part.value);
						console.log('new events', actionLog);
						logsArray.push(...actionLog);
						set(logsArray);
					}
				});
			}
		);

		/** Set stop function for store. */
		stop = () => {
			clearInterval(polling);
			stopWatching();
		};
	})();

	return stop;
});
