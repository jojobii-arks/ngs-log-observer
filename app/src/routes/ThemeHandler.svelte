<script lang="ts">
	import { theme } from '$lib/stores/settings';
	import { applyTheme, parseTheme } from '$lib/themes';

	import { onMount } from 'svelte';

	onMount(() => {
		applyTheme($theme);
	});

	$: if ($theme) {
		applyTheme($theme);
	}
</script>
