<script lang="ts">
	import { settings } from '$lib/stores/settings';
	import { metadata } from '$lib/stores/metadata';
	import { open } from '@tauri-apps/api/shell';

	$: ({ appName, appVersion, tauriVersion, gameDirectoryPath, gameDirectoryLabel } = $metadata);

	const amountToDisplayOptions = [
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' }
	];

	const repositoryUrl = 'https://github.com/jojobii-arks/nt-ngs-log-observer';
</script>

<h1 class="text-xl font-black">
	<button class="hover:text-mk-fgHighlighted" on:click={() => open(repositoryUrl)}>{appName}</button
	>
</h1>
<p class="text-xs mb-4 text-mk-fgTransparentWeak select-text">
	App: v{appVersion} | Tauri: v{tauriVersion}
</p>
<p class="text-sm">
	Using logs from{' '}
	<button
		class="hover:text-mk-fgHighlighted"
		on:click={async () => {
			open(gameDirectoryPath ?? '');
		}}
	>
		{gameDirectoryLabel}
	</button>
</p>
<hr class="border-mk-divider my-4" />
<div class="flex flex-col">
	<label class="form-control cursor-pointer">
		<span class="label-text mr-4">Show Meseta</span>
		<input type="checkbox" class="cursor-pointer" bind:checked={$settings.showMeseta} />
	</label>
	<label class="form-control cursor-pointer">
		<span class="label-text mr-4">Always On Top</span>
		<input type="checkbox" class="cursor-pointer" bind:checked={$settings.isAlwaysOnTop} />
	</label>
	<label class="form-control cursor-pointer">
		<span class="label-text mr-4">Log Items To Display</span>
		<select bind:value={$settings.amountToDisplay} class="">
			{#each amountToDisplayOptions as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</label>
</div>

<style lang="postcss">
	select {
		@apply bg-mk-panel text-mk-fg border-0 focus-visible:ring-mk-focus py-1 rounded-md;
	}
	input[type='checkbox'] {
		@apply w-4 h-4 focus:ring-mk-focus  bg-mk-fgOnAccent checked:bg-mk-accent;
	}
	.form-control {
		@apply flex justify-between items-center hover:bg-mk-panelHighlight p-2;
	}
</style>
