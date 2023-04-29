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

			/** check if `showSigne` is on, then filter accordingly */
			if (!$settings.showSigne) {
				if (['RestaSign', 'ReverserSign'].includes(e.item_name ?? '')) return false;
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
	let sessionMesetaPerHour = 0;
	$: sessionMesetaPerHour = Math.floor(sessionMesetaTotal / (timeDifference / 1000 / 60 / 60));

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	let sessionMesetaTotalDisplay = sessionMesetaTotal.toLocaleString();
	let sessionMesetaPerHourDisplay = `(${
		!Number.isNaN(sessionMesetaPerHour) ? sessionMesetaPerHour.toLocaleString() : 0
	}/hr)`;

	$: sessionMesetaTotalDisplay = sessionMesetaTotal.toLocaleString();
	$: sessionMesetaPerHourDisplay = `(${
		!Number.isNaN(sessionMesetaPerHour) ? sessionMesetaPerHour.toLocaleString() : 0
	}/hr)`;
	$: seconds = Math.floor(timeDifference / 1000);

	let timeDisplay = '';
	$: timeDisplay = `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m ${
		seconds % 60
	}s`;

	// Map counters to display
	let countersDisplay: {
		counter: {
			id: string;
			itemName: string;
		};
		total: number;
		perHourDisplay: string;
	}[] = [];
	$: countersDisplay = $settings.dropCounters
		.filter((e) => !!e.itemName)
		.map((counter) => {
			if (counter.itemName.length === 0) return { counter, total: 0, perHourDisplay: '' };
			const total = [...$logs]
				.filter(
					(e) => ['[Pickup]'].includes(e.action_type) && e.item_name?.includes(counter.itemName)
				)
				.reduce(
					(total: number, action) => total + Number(/\d+(?=\))(?!\()/.exec(action.item_num ?? '')),
					0
				);
			const perHourDisplay = `(${Math.floor(total / (timeDifference / 1000 / 60 / 60))}/hr)`;
			return {
				counter,
				total,
				perHourDisplay
			};
		});
</script>

<div data-tauri-drag-region class="select-none bg-mk-windowHeader">
	<div data-tauri-drag-region class="p-2 sm:p-3 flex flex-col gap-1">
		<div data-tauri-drag-region class="text-sm">
			⌚
			<span class="select-text">
				{timeDisplay}
			</span>
		</div>
		<div data-tauri-drag-region class="text-sm">
			💰
			<span class="select-text">
				{sessionMesetaTotalDisplay}
				<span class="text-xs">{sessionMesetaPerHourDisplay}</span>
			</span>
		</div>
		<hr class="my-2" />
		<ul class="">
			{#each countersDisplay as display (display.counter.id)}
				<li data-tauri-drag-region class="text-sm">
					📥 <i>"{display.counter.itemName}"</i> -
					<span class="select-text">
						{display.total}
						<span class="text-xs">{display.perHourDisplay}</span>
					</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="flex-auto overflow-y-scroll select-text">
	<table class="relative w-full table-fixed">
		<thead class="sticky top-0 bg-mk-header">
			<tr>
				<th class="w-16 text-center py-1">Type</th>
				<th class="text-left pl-2 py-1">Data</th>
				<th class="text-left pl-2 py-1">Time</th>
			</tr>
		</thead>
		<tbody class="min-h-full">
			{#each logToDisplay as action (action.log_time + action.action_id)}
				<tr
					class="border-b-mk-divider border-b-[0.5px] last-of-type:border-b-0 hover:bg-mk-accentedBg transition-colors duration-75"
					in:fade
					animate:flip={{ duration: 200 }}
				>
					<td class="text-center py-1.5">{action.item_num?.includes('N-Meseta') ? `💰` : `📥`}</td>
					<td class="text-left pl-2">
						{action.item_name
							? action.item_name + ' - x' + /\d+(?=\))(?!\()/.exec(action.item_num ?? '')
							: 'N-Meseta - x' + /\d+(?=\))(?!\()/.exec(action.item_num ?? '')}</td
					>
					<td class="text-left pl-2"
						>{new Date(action.log_time).toLocaleString(undefined, {
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
							day: 'numeric',
							month: 'numeric',
							year: '2-digit'
						})}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
