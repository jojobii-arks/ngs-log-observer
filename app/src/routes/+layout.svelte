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

	import Settings from './Settings.svelte';
</script>

<!-- Window Controls -->
<div class="z-[1000] flex gap-0 absolute top-0 right-0 text-white select-none">
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
</div>

<main class="flex max-h-[100vh] max-w-[100vw] flex-col overflow-y-hidden">
	<!-- Header -->
	<div data-tauri-drag-region class="bg-base-300">
		<label for="my-modal-4" class="btn btn-ghost normal-case font-black text-xl overflow-hidden"
			>NGS Log Observer</label
		>
	</div>

	<!-- Modal -->
	<input type="checkbox" id="my-modal-4" class="modal-toggle" />
	<label for="my-modal-4" class="modal">
		<label class="modal-box relative bg-base-200" for="">
			<label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

			<Settings />
		</label>
	</label>

	<slot />
</main>

<style lang="postcss">
	button {
		@apply hover:bg-gray-700 active:bg-gray-900 px-3 py-1 m-0 transition-colors;
	}
</style>
