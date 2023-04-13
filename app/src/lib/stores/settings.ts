import { parseTheme } from '$lib/themes';
import { defaultDarkThemeString } from '$lib/themes/default';
import { writable } from 'svelte/store';

const defaultSettings = {
	showMeseta: true,
	isAlwaysOnTop: false,
	amountToDisplay: 25
};

export const settings = writable(defaultSettings);

export const theme = writable(parseTheme(defaultDarkThemeString));
export const themeString = writable(defaultDarkThemeString);
