type Settings = {
	showMeseta: boolean;
	isAlwaysOnTop: boolean;
	amountToDisplay: number;
};

const defaultSettings: Settings = {
	showMeseta: true,
	isAlwaysOnTop: false,
	amountToDisplay: 25
};

import { z } from 'zod';
const settingsSchema = z.object({
	showMeseta: z.boolean(),
	isAlwaysOnTop: z.boolean(),
	amountToDisplay: z.number()
});

import { writable } from 'svelte/store';
import { Store } from 'tauri-plugin-store-api';
const store = new Store('.settings.dat');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTauriWritable<T>(key: string, defaultValue: T, schema: z.ZodType) {
	const { subscribe, set } = writable<T>(defaultValue);
	store.get(key).then((value: unknown) => {
		if (value === undefined) {
			console.log('No value found for key', key, 'setting to default', defaultValue);
			store.set(key, defaultValue);
		}
		const parsed = schema.safeParse(value);
		if (parsed.success) {
			console.log('Value found for key', key, 'setting to', parsed.data);
			set(parsed.data);
		}
	});
	return {
		subscribe,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		set: (value: T) => {
			store.set(key, value);
			set(value);
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		reset: () => {
			store.set(key, defaultValue);
			set(defaultValue);
		}
	};
}

import { parseTheme } from '$lib/themes';
import { defaultDarkThemeString } from '$lib/themes/default';

export const settings = createTauriWritable('settings', defaultSettings, settingsSchema);

export const theme = writable(parseTheme(defaultDarkThemeString));
export const themeString = writable(defaultDarkThemeString);
