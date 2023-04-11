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
	<button on:click={() => open(repositoryUrl)}>{appName}</button>
</h1>
<p class="text-xs mb-4">
	App: v{appVersion} | Tauri: v{tauriVersion}
</p>
<p class="text-sm">
	Using logs from{' '}
	<button
		class="link-hover link"
		on:click={async () => {
			open(gameDirectoryPath ?? '');
		}}
	>
		{gameDirectoryLabel}
	</button>
</p>
<hr class="border-base-content opacity-50 my-4" />
<div class="flex flex-col">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text mr-4">Show Meseta</span>
			<input type="checkbox" class="toggle" bind:checked={$settings.showMeseta} />
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text mr-4">Always On Top</span>
			<input type="checkbox" class="toggle" bind:checked={$settings.isAlwaysOnTop} />
		</label>
	</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text mr-4">Log Items To Display</span>
			<select bind:value={$settings.amountToDisplay} class="select select-xs">
				{#each amountToDisplayOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</label>
	</div>
</div>
