import { documentDir, join } from '@tauri-apps/api/path';
import { readDir } from '@tauri-apps/api/fs';
import { metadata } from 'tauri-plugin-fs-extra-api';

export default async function getGameDirectory() {
	const documentDirPath = await join(await documentDir(), 'SEGA');
	const entries = await readDir(documentDirPath);
	const pso2Directories = entries.filter((entry) => entry.name?.includes('PHANTASYSTARONLINE2'));

	const pso2DirectoriesWithMetadata = await Promise.all(
		pso2Directories.map(async (directory) => {
			const directoryMetadata = await metadata(directory.path);
			return { ...directory, metadata: directoryMetadata };
		})
	);

	const sortedPso2Directories = pso2DirectoriesWithMetadata.sort(
		(a, b) => b.metadata.modifiedAt.getTime() - a.metadata.modifiedAt.getTime()
	);

	const pso2DirectoryToUse = sortedPso2Directories[0];

	const pso2GameLogDirectory = await join(pso2DirectoryToUse.path, 'log_ngs');

	return {
		game: {
			path: pso2DirectoryToUse.path,
			label: pso2DirectoryToUse.path.split('\\').at(-1) as string
		},
		log: {
			path: pso2GameLogDirectory,
			label: pso2GameLogDirectory.split('\\').at(-1) as string
		}
	};
}

export type GameDirectory = {
	game: {
		path: string | null;
		label: string | null;
	};
	log: {
		path: string | null;
		label: string | null;
	};
};
