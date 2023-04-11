<script lang="ts">
	import '../app.css';

	import { appWindow } from '@tauri-apps/api/window';
	import windowMinimize from '$lib/svg/window-minimize.svg';
	import windowMaximize from '$lib/svg/window-maximize.svg';
	import windowClose from '$lib/svg/window-close.svg';
</script>

<!-- Window Controls -->
<div class="flex gap-0 absolute top-0 right-0 text-white select-none">
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

<slot />

<style lang="postcss">
	button {
		@apply hover:bg-gray-700 active:bg-gray-900 px-3 py-1 m-0 transition-colors;
	}
</style>
