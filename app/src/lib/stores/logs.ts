import getGameDirectory from '$lib/getGameDirectory';
import { watchImmediate } from 'tauri-plugin-fs-watch-api';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { diffLines } from 'diff';
import parseActionLog from '$lib/parseActionLog';
import { metadata } from 'tauri-plugin-fs-extra-api';
import { get, writable } from 'svelte/store';
import type { ActionLogItem } from '$lib/types';
import { dummyLogs } from '$lib/testing';

const encoding = 'utf-16le';
const twoDays = 1000 * 60 * 60 * 48;

async function readEncodedTextFile(path: string) {
	const data = await readBinaryFile(path);
	return new TextDecoder(encoding).decode(data);
}

export const logs = writable<ActionLogItem[]>([]);

let detacher = () => {
	console.log('Detacher not initialized.');
};

export function detachListeners() {
	detacher();
}

export async function initializeLogListener() {
	console.count('Initializing log listener...');
	const datamap: Record<string, string> = {};
	const pso2GameLogDirectory = (await getGameDirectory()).log.path;

	/** Grab initial data */
	(await readDir(pso2GameLogDirectory)).filter(async (file) => {
		const meta = await metadata(file.path);
		const metaAge = new Date().getTime() - new Date(meta.modifiedAt).getTime();
		if (metaAge >= twoDays) {
			return;
		}

		const data = await readEncodedTextFile(file.path);

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
			if (!path.includes('ActionLog')) return;
			const data = await readEncodedTextFile(path);

			diffLines(datamap[path], data).forEach(async (part) => {
				if (part.added) {
					datamap[path] = data;
					const actionLog = await parseActionLog(part.value);
					console.log('new events', actionLog);
					logs.set([...get(logs), ...actionLog]);
				}
			});
			console.log('all logs', get(logs));
		}
	);

	detacher = () => {
		console.log('Stopping log listener via detacher...');
		console.countReset('Initializing log listener...');
		clearInterval(polling);
		stopWatching();
	};

	/** Stop function for listener. */
	return () => {
		console.log('Stopping log listener...');
		console.countReset('Initializing log listener...');
		clearInterval(polling);
		stopWatching();
	};
}

export function addDummyLogs() {
	logs.set([...dummyLogs]);
}
