<script lang="ts">
	import { logs } from '$lib/stores/logs';
	import type { ActionLogItem } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { settings } from '$lib/stores/settings';

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
</script>

<header data-tauri-drag-region class="draggable select-none bg-base-300 p-4">
	<div data-tauri-drag-region class="flex flex-wrap justify-between">
		<div data-tauri-drag-region>
			<div data-tauri-drag-region>Session 💰</div>
			<div class="font-semibold select-text text-xl">
				{sessionMesetaTotal.toLocaleString()}
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
