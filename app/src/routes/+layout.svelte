<script lang="ts">
	import '../app.css';

	import { appWindow } from '@tauri-apps/api/window';
	import windowMinimize from '$lib/svg/window-minimize.svg';
	import windowMaximize from '$lib/svg/window-maximize.svg';
	import windowClose from '$lib/svg/window-close.svg';

	/** Handle listeners within lifecycle. */
	import { initializeLogListener, detachListeners } from '$lib/stores/logs';
	import { onMount } from 'svelte';
	onMount(async () => {
		/** Detach listeners if there are any; mainly for development. */
		detachListeners();

		/** Initialize listeners.*/
		const closeLogListener = await initializeLogListener();

		return async () => {
			console.log('dismounting');
			closeLogListener();
		};
	});

	/** Listen to changes for isAlwaysOnTop */
	import { settings } from '$lib/stores/settings';
	$: appWindow.setAlwaysOnTop($settings.isAlwaysOnTop).catch(console.error);

	/** Modal Handler */
	let isModalOpen = false;

	import Settings from './Settings.svelte';
	import ThemeHandler from './ThemeHandler.svelte';
</script>

<!-- Window Controls -->
<nav class="z-[1000] flex gap-0 absolute top-0 right-0 select-none">
	<button on:click={() => appWindow.minimize()}>
		<img src={windowMinimize} alt="minimize" />
	</button>
	<button
		on:click={async () =>
			(await appWindow.isMaximized()) ? appWindow.unmaximize() : appWindow.maximize()}
	>
		<img src={windowMaximize} alt="maximize" />
	</button>
	<button on:click={() => appWindow.close()}>
		<img src={windowClose} alt="close" />
	</button>
</nav>

<main class="flex h-[100vh] max-w-[100vw] flex-col overflow-y-hidden">
	<!-- Header -->
	<div data-tauri-drag-region class="bg-header">
		<button
			on:click={() => (isModalOpen = !isModalOpen)}
			class="font-black text-xl text-accent hover:bg-buttonHoverBg transition-colors py-1 px-3"
			>NGS Log Observer</button
		>
	</div>

	<!-- Modal -->
	{#if isModalOpen}
		<div class="z-[999] pointer-events-none fixed flex inset-0 justify-center items-center">
			<div class="w-11/12 max-w-lg bg-navBg shadow-lg p-6">
				<Settings />
			</div>
		</div>
	{/if}
	<slot />
</main>

<ThemeHandler />

<style lang="postcss">
	nav button {
		@apply hover:bg-buttonHoverBg px-3 py-1 m-0 transition-colors;
	}
</style>
