import { writable } from 'svelte/store';

export const metadata = writable({
	appName: '',
	appVersion: '',
	tauriVersion: '',
	gameDirectoryPath: '',
	gameDirectoryLabel: ''
});

import { getName, getVersion, getTauriVersion } from '@tauri-apps/api/app';
import getGameDirectory from '$lib/getGameDirectory';
(async () => {
	const gameDirectory = await getGameDirectory();
	metadata.set({
		appName: await getName(),
		appVersion: await getVersion(),
		tauriVersion: await getTauriVersion(),
		gameDirectoryPath: gameDirectory.game.path,
		gameDirectoryLabel: gameDirectory.game.label
	});
})();
