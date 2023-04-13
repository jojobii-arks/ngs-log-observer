<script lang="ts">
	import '../app.css';

	import { appWindow } from '@tauri-apps/api/window';

	/** Handle listeners within lifecycle. */
	import { initializeLogListener, detachListeners, addDummyLogs } from '$lib/stores/logs';
	import { onMount } from 'svelte';
	onMount(async () => {
		/** Detach listeners if there are any; mainly for development. */
		detachListeners();

		/** Initialize listeners.*/
		const closeLogListener = await initializeLogListener();

		addDummyLogs();

		return async () => {
			console.log('dismounting');
			closeLogListener();
		};
	});

	/** Listen to changes for isAlwaysOnTop */
	import { settings } from '$lib/stores/settings';
	$: appWindow.setAlwaysOnTop($settings.isAlwaysOnTop).catch(console.error);

	/** Modal Handler */
	let isModalOpen = true;

	import Settings from './Settings.svelte';
	import ThemeHandler from './ThemeHandler.svelte';
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape' && isModalOpen) isModalOpen = false;
	}}
/>

<!-- Window Controls -->
<nav class="z-[1000] flex gap-0 absolute top-0 right-0 select-none">
	<button tabindex="-1" on:click={() => appWindow.minimize()}> &#128469;&#xFE0E; </button>
	<button
		tabindex="-1"
		on:click={async () =>
			(await appWindow.isMaximized()) ? appWindow.unmaximize() : appWindow.maximize()}
	>
		&#128470;&#xFE0E;
	</button>
	<button tabindex="-1" on:click={() => appWindow.close()}> &#128473;&#xFE0E; </button>
</nav>

<main class="flex h-[100vh] max-w-[100vw] flex-col overflow-y-hidden select-none">
	<!-- Header -->
	<div data-tauri-drag-region class="bg-mk-panel-header">
		<button
			tabindex="-1"
			on:click={(e) => {
				// @ts-ignore - Svelte doesn't like this.
				e.target?.blur();
				isModalOpen = !isModalOpen;
			}}
			class="font-black text-xl text-accent hover:bg-mk-accent-focus transition-colors py-1 px-3"
			>NGS Log Observer</button
		>
	</div>

	<!-- Modal -->
	{#if isModalOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click|self={() => (isModalOpen = false)}
			class="z-[999] bg-mk-misc-modalBg fixed inset-0 flex justify-center items-center"
		>
			<div class="w-11/12 max-w-sm max-h-[70vh] overflow-y-scroll bg-mk-panel shadow-lg p-6">
				<Settings />
			</div>
		</div>
	{/if}
	<slot />
</main>

<ThemeHandler />

<style lang="postcss">
	nav button {
		@apply hover:bg-mk-accent-focus px-3 py-1 m-0 transition-colors;
	}
</style>
