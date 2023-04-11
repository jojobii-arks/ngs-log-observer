<script lang="ts">
	import { open } from '@tauri-apps/api/shell';
	import { appWindow } from '@tauri-apps/api/window';
	import { logs, gameDirectory } from '$lib/stores/logs';
	import type { ActionLogItem } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	const name = 'NT NGS Log Observer';
	const version = 'v1.0.1';

	$: sessionMesetaTotal = [...$logs]
		.filter(
			(e) =>
				['[Pickup]', '[DiscradExchange]'].includes(e.action_type) &&
				e.item_num?.includes('N-Meseta')
		)
		.reduce(
			(total: number, action) => total + Number(/\d+(?=\))(?!\()/.exec(action.item_num ?? '')),
			0
		);
	let logToDisplay: ActionLogItem[] = [];
	$: logToDisplay = [...$logs]
		.reverse()
		.filter((e) => {
			/** check if `showMeseta` is on, then filter accordingly */
			if (!showMeseta) {
				if (e.item_num?.includes('N-Meseta')) return false;
			}
			/** only show pickups and sells */
			return ['[Pickup]', '[DiscradExchange]'].includes(e.action_type);
		})
		.slice(0, amountToDisplay - 1);

	let showMeseta = true;
	let isAlwaysOnTop = false;
	$: appWindow.setAlwaysOnTop(isAlwaysOnTop).then(console.log).catch(console.error);

	let amountToDisplay = 25;
	const amountToDisplayOptions = [
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' }
	];
</script>

<main class="flex h-[100vh] flex-col overflow-y-clip">
	<header data-tauri-drag-region class="draggable select-none bg-base-300 p-4">
		<div data-tauri-drag-region>
			<h1
				data-tauri-drag-region
				class="mb-1 text-2xl font-black"
				title={name + '\n' + 'Version: ' + version}
			>
				NT NGS Log Observer
			</h1>
			<p data-tauri-drag-region class="mb-2 text-sm">
				Using logs from{' '}
				<button
					class="link-hover link"
					on:click={async () => {
						console.log('clicked');
						open($gameDirectory.game.path ?? '');
					}}
				>
					{$gameDirectory.game.label}
				</button>
			</p>
		</div>
		<div data-tauri-drag-region class="flex flex-wrap justify-between">
			<div data-tauri-drag-region class="stats">
				<div class="stat">
					<div class="stat-title text-sm">Session 💰</div>
					<div class="stat-value select-text text-xl">
						{sessionMesetaTotal.toLocaleString()}
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text mr-4">Show Meseta</span>
						<input type="checkbox" class="toggle" bind:checked={showMeseta} />
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text mr-4">Always On Top</span>
						<input type="checkbox" class="toggle" bind:checked={isAlwaysOnTop} />
					</label>
				</div>
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text mr-4">Amount To Display</span>
						<select bind:value={amountToDisplay} class="select select-xs">
							{#each amountToDisplayOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</label>
				</div>
			</div>
		</div>
	</header>
	<div class="flex-auto overflow-y-scroll">
		<table class="table-compact relative table w-full">
			<thead class="sticky top-0">
				<tr>
					<th class="rounded-none">Type</th>
					<th>Data</th>
					<th class="rounded-none">Time</th>
				</tr>
			</thead>
			<tbody class="min-h-full">
				{#each logToDisplay as action (action.log_time + action.action_id)}
					<tr in:fade animate:flip={{ duration: 200 }}>
						<td>{action.item_num?.includes('N-Meseta') ? `💰` : `📥`}</td>
						<td>
							{action.item_name
								? action.item_name + ' - x' + /\d+(?=\))(?!\()/.exec(action.item_num ?? '')
								: 'N-Meseta - x' + /\d+(?=\))(?!\()/.exec(action.item_num ?? '')}</td
						>
						<td>{new Date(action.log_time).toLocaleString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
