<script lang="ts">
	import '../app.css';

	import { appWindow } from '@tauri-apps/api/window';

	import IconRectangle from '$lib/icons/IconRectangle.svelte';
	import IconMinimize from '$lib/icons/IconMinimize.svelte';
	import IconX from '$lib/icons/IconX.svelte';

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
	import { scale, fade } from 'svelte/transition';
	let isModalOpen = false;

	import Settings from './Settings.svelte';
	import ThemeHandler from './ThemeHandler.svelte';
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'Escape' && isModalOpen) isModalOpen = false;
	}}
/>

<ThemeHandler />

<!-- Window Controls -->
<nav
	class={`z-[1000] flex gap-0 absolute top-0 right-0 select-none transition-colors ${
		isModalOpen && 'bg-mk-acrylicPanel'
	}`}
>
	<button
		tabindex="-1"
		class="text-mk-fg hover:text-mk-fgHighlighted"
		on:click={() => {
			appWindow.minimize();
		}}
	>
		<IconMinimize size={18} />
	</button>

	<button
		tabindex="-1"
		class="text-mk-fg hover:text-mk-fgHighlighted"
		on:click={async () =>
			(await appWindow.isMaximized()) ? appWindow.unmaximize() : appWindow.maximize()}
	>
		<IconRectangle size={18} />
	</button>

	<button
		tabindex="-1"
		class="text-mk-fg hover:text-mk-fgHighlighted"
		on:click={() => {
			appWindow.close();
		}}
	>
		<IconX size={18} />
	</button>
</nav>

<main class="flex h-[100vh] max-w-[100vw] flex-col overflow-y-hidden select-none">
	<!-- Header -->
	<div data-tauri-drag-region class="bg-mk-windowHeader">
		<button
			tabindex="-1"
			on:click={(e) => {
				// @ts-ignore - Svelte doesn't like this.
				e.target?.blur();
				isModalOpen = !isModalOpen;
			}}
			class="font-black text-xl text-accent hover:bg-mk-accentedBg hover:text-mk-accent transition-colors py-1 px-3"
			>NGS Log Observer</button
		>
	</div>

	<!-- Modal -->
	{#if isModalOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			transition:fade={{ duration: 200 }}
			on:click|self={() => (isModalOpen = false)}
			class="z-[999] bg-mk-modalBg fixed inset-0 flex justify-center items-center backdrop-blur-sm"
		>
			<div
				transition:scale={{ duration: 200 }}
				class="w-11/12 max-w-sm max-h-[70vh] overflow-y-scroll bg-mk-panel shadow-xl p-6"
			>
				<Settings />
			</div>
		</div>
	{/if}
	<slot />
</main>

<style lang="postcss">
	nav button {
		@apply hover:bg-mk-panelHighlight px-3 py-1 m-0 transition-colors;
	}
</style>
