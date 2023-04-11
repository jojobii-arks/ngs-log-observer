import { writable } from 'svelte/store';

const defaultSettings = {
	showMeseta: true,
	isAlwaysOnTop: false,
	amountToDisplay: 25
};

export const settings = writable(defaultSettings);
