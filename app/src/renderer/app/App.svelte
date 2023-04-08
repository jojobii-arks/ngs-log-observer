<script lang="ts">
  import { onMount } from 'svelte';
  import type { ActionLogItem } from '../../lib/types';

  let log: ActionLogItem[] = [];
  let gameDirectory: string;
  let sessionMesetaTotal: number;
  $: sessionMesetaTotal = [...log]
    .filter(
      (e) =>
        ['[Pickup]', '[DiscradExchange]'].includes(e.action_type) &&
        e.item_num?.includes('N-Meseta')
    )
    .reduce(
      (total: number, action) =>
        total + Number(/\d+(?=\))(?!\()/.exec(action.item_num ?? '')),
      0
    );

  let showMeseta = true;
  let isAlwaysOnTop = false;
  console.log(api);

  onMount(() => {
    api.onAlert((_, value) => {
      alert(value);
    });

    api.onNewAction((_, value) => {
      log = [...log, value];
    });

    api.getGameDirectory().then((value) => {
      gameDirectory = value;
    });

    return () => {
      api.clear();
    };
  });
</script>

<main class="flex h-[100vh] flex-col overflow-y-clip">
  <header class="draggable select-none bg-base-300 p-4">
    <div>
      <h1 class="mb-1 text-2xl font-black">NGS Log Observer</h1>
      <p class="mb-2 text-sm">
        Using logs from{' '}
        <button
          class="link-hover link"
          on:click={() => {
            api.openGameDirectory();
          }}
        >
          {gameDirectory}
        </button>
      </p>
    </div>
    <div class="flex flex-wrap justify-between">
      <div class="stats">
        <div class="no-drag stat">
          <div class="stat-title text-sm">Session 💰</div>
          <div class="stat-value select-text text-xl">
            {sessionMesetaTotal.toLocaleString()}
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="form-control">
          <label class="no-drag label cursor-pointer">
            <span class="label-text mr-4">Show Meseta</span>
            <input
              type="checkbox"
              class="toggle"
              checked={showMeseta}
              on:change={() => {
                /** TODO */
              }}
            />
          </label>
        </div>
        <div class="form-control">
          <label class="no-drag label cursor-pointer">
            <span class="label-text mr-4">Always On Top</span>
            <input
              type="checkbox"
              class="toggle"
              checked={isAlwaysOnTop}
              on:change={() => {
                /** TODO */
              }}
            />
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
        {#each log as item}
          <tr>
            <td>{item.action_type}</td>
            <td>{item.item_name}</td>
            <td>{item.log_time}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>
