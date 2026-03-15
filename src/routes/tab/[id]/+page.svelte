<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const { tab, author, isOwner } = data;

	const typeLabel = { TAB: 'Tab', CHORDS: 'Chords', LYRICS: 'Lyrics' };
	const typeColor = {
		TAB: 'bg-blue-50 text-blue-700',
		CHORDS: 'bg-purple-50 text-purple-700',
		LYRICS: 'bg-green-50 text-green-700'
	};

	let copied = $state(false);
	async function copyLink() {
		await navigator.clipboard.writeText(window.location.href);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>{tab.title}{tab.artist ? ` — ${tab.artist}` : ''} | GC Tabs</title>
	<meta name="description" content="Guitar tab for {tab.title}{tab.artist ? ` by ${tab.artist}` : ''}" />
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="border-b border-gray-200 px-4 py-4 no-print">
		<div class="max-w-2xl mx-auto flex items-center justify-between gap-3">
			<a href="/u/{author.username}" class="text-xl font-bold text-gray-900 shrink-0">🎸 GC Tabs</a>

			<div class="flex items-center gap-2">
				<!-- Copy link -->
				<button
					onclick={copyLink}
					class="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 active:bg-gray-100">
					{copied ? '✅ Copied!' : '🔗 Share'}
				</button>

				<!-- Print -->
				<button
					onclick={() => window.print()}
					class="flex items-center gap-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 active:bg-gray-100">
					🖨️ Print
				</button>

				<!-- Edit (owner only) -->
				{#if isOwner}
					<a href="/tab/{tab.id}/edit"
						class="flex items-center gap-1.5 text-sm font-semibold bg-gray-900 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700">
						✏️ Edit
					</a>
				{/if}
			</div>
		</div>
	</header>

	<!-- Tab sheet -->
	<main class="max-w-2xl mx-auto px-4 py-6">
		<!-- Meta -->
		<div class="mb-6">
			<span class="text-xs font-medium uppercase tracking-wide {typeColor[tab.type]} rounded px-2 py-0.5">
				{typeLabel[tab.type]}
			</span>
			<h1 class="text-2xl font-bold text-gray-900 mt-2">{tab.title}</h1>
			{#if tab.artist}
				<p class="text-gray-500 mt-0.5">{tab.artist}</p>
			{/if}
			<p class="text-xs text-gray-400 mt-2">
				by <a href="/u/{author.username}" class="underline hover:text-gray-600">@{author.username}</a>
			</p>
		</div>

		<hr class="border-gray-200 mb-6" />

		<!-- Content -->
		<div class="tab-content text-gray-800 bg-gray-50 rounded-xl p-4">
			{tab.content}
		</div>
	</main>
</div>
