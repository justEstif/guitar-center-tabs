<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import TabEditor from '$lib/components/TabEditor.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let showDeleteConfirm = $state(false);
</script>

<svelte:head><title>Edit — {data.tab.title} | GC Tabs</title></svelte:head>

<TabEditor
	mode="edit"
	tab={data.tab}
	error={form?.error}
	action="?/save"
/>

<!-- Delete zone — outside editor, at bottom -->
<div class="fixed bottom-0 left-0 right-0 no-print" style="z-index: 40">
	{#if showDeleteConfirm}
		<div class="bg-red-50 border-t border-red-200 px-4 py-4">
			<div class="max-w-2xl mx-auto">
				<p class="text-sm font-medium text-red-800 mb-3 text-center">
					Delete <strong>{data.tab.title}</strong>? This can't be undone.
				</p>
				<div class="flex gap-2">
					<button
						onclick={() => showDeleteConfirm = false}
						class="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50">
						Cancel
					</button>
					<form method="POST" action="?/delete" class="flex-1">
						<button type="submit"
							class="w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700">
							Yes, delete
						</button>
					</form>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-white border-t border-gray-100 px-4 py-3">
			<div class="max-w-2xl mx-auto">
				<button
					onclick={() => showDeleteConfirm = true}
					class="w-full py-2 text-sm text-red-500 hover:text-red-700 font-medium">
					🗑️ Delete this tab
				</button>
			</div>
		</div>
	{/if}
</div>
