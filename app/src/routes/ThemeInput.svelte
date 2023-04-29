<script lang="ts">
	import { themeString, theme } from '$lib/stores/settings';
	import { parseTheme } from '$lib/themes';
	import { message } from '@tauri-apps/api/dialog';
	import { open } from '@tauri-apps/api/shell';

	import { defaultDarkThemeString, defaultLightThemeString } from '$lib/themes/default';
	import { onMount } from 'svelte';
	let themeInput = '';
	let error: string | null = null;
	let ready = false;

	// Theme validation.
	$: try {
		(() => {
			if (!ready) return;
			parseTheme(themeInput);
			error = null;
		})(); // Hack to make Svelte happy.
	} catch (err) {
		console.log(err);
		if (err instanceof SyntaxError) {
			error = err.message;
		} else if (err instanceof Error) {
			error = err.message;
		} else {
			error = 'Unknown error';
		}
	}

	// Initialize text input to current theme.
	onMount(() => {
		themeInput = $themeString;
		ready = true;
	});

	async function handleApply() {
		if (error) return;
		try {
			const newTheme = parseTheme(themeInput);
			$themeString = themeInput;
			$theme = newTheme;
		} catch {
			await message('The theme you entered is invalid. Please fix it and try again.');
			return;
		}
	}
</script>

<div class="mb-4">
	<div class="flex justify-between">
		<h2 class="font-semibold">Theme Settings</h2>
		<button
			on:click={() => {
				open('https://misskey-hub.net/en/docs/features/theme.html');
			}}
			class="text-mk-fgTransparentWeak hover:text-mk-accent text-xs">via Misskey Theme</button
		>
	</div>
</div>

<div class="flex flex-col gap-2 mb-4">
	<button on:click={() => (themeInput = defaultLightThemeString)} class="btn"
		>Load Light Theme</button
	>
	<button on:click={() => (themeInput = defaultDarkThemeString)} class="btn">Load Dark Theme</button
	>
	<button on:click={() => (themeInput = $themeString)} class="btn">Load Current Theme</button>
</div>

<textarea bind:value={themeInput} class="w-full bg-mk-panel h-32" />

{#if error}
	<div class="text-mk-error">
		{error}
	</div>
{/if}

<button
	on:click={handleApply}
	disabled={!!error}
	class="transition-colors rounded-md px-4 py-2 text-sm disabled:opacity-50 w-full mt-2 bg-mk-accent hover:bg-mk-accentLighten font-semibold text-mk-fgOnAccent"
	>Apply Theme</button
>

<style lang="postcss">
	button.btn {
		@apply bg-mk-buttonBg hover:bg-mk-buttonHoverBg transition-colors  rounded-md px-4 py-2 text-sm disabled:opacity-50;
	}
	textarea {
		@apply text-xs p-1 border-[1px] border-mk-inputBorder hover:border-mk-inputBorderHover focus:ring-mk-accent;
	}
</style>
