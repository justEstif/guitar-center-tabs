<script lang="ts">
	import type { ActionData } from './$types';
	import TabEditor from '$lib/components/TabEditor.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head><title>New Tab — GC Tabs</title></svelte:head>

<TabEditor
	mode="create"
	error={form?.error}
	action="?/default"
/>
