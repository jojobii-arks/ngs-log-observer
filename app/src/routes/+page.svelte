<script lang="ts">
	import { logs } from '$lib/stores/logs';
	import type { ActionLogItem } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { settings } from '$lib/stores/settings';

	let sessionMesetaTotal = 0;
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
			if (!$settings.showMeseta) {
				if (e.item_num?.includes('N-Meseta')) return false;
			}
			/** only show pickups and sells */
			return ['[Pickup]', '[DiscradExchange]'].includes(e.action_type);
		})
		.slice(0, $settings.amountToDisplay - 1);

	import { onMount } from 'svelte';

	let timeInitial = new Date();
	let time = new Date();
	let timeDifference = 0;
	$: timeDifference = time.getTime() - timeInitial.getTime();
	let sessionMesetaPerMinute = 0;
	$: sessionMesetaPerMinute = Math.floor(sessionMesetaTotal / (timeDifference / 1000 / 60));

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let sessionMesetaTotalDisplay = sessionMesetaTotal.toLocaleString();
	let sessionMesetaPerMinuteDisplay = `(${
		!Number.isNaN(sessionMesetaPerMinute) ? sessionMesetaPerMinute.toLocaleString() : 0
	}/min)`;

	$: sessionMesetaTotalDisplay = sessionMesetaTotal.toLocaleString();
	$: sessionMesetaPerMinuteDisplay = `(${
		!Number.isNaN(sessionMesetaPerMinute) ? sessionMesetaPerMinute.toLocaleString() : 0
	}/min)`;
	$: seconds = Math.floor(timeDifference / 1000);

	let timeDisplay = '';
	$: timeDisplay = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ${
		seconds % 60
	}s`;
</script>

<header data-tauri-drag-region class="select-none bg-base-300 p-2">
	<div class="p-2 flex flex-col gap-1 bg-neutral text-content rounded-lg">
		<div data-tauri-drag-region class="text-sm">
			💰
			<span class="select-text">
				{sessionMesetaTotalDisplay}
				<span class="text-xs">{sessionMesetaPerMinuteDisplay}</span>
			</span>
		</div>
		<div data-tauri-drag-region class="text-sm">
			⌚
			<span class="select-text">
				{timeDisplay}
			</span>
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
