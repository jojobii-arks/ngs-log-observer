<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    api.onAlert((_, value) => {
      alert(value);
    });
  });
</script>
