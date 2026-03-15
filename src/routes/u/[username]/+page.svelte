<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const typeLabel = { TAB: 'Tab', CHORDS: 'Chords', LYRICS: 'Lyrics' };
	const typeColor = {
		TAB: 'bg-blue-50 text-blue-700',
		CHORDS: 'bg-purple-50 text-purple-700',
		LYRICS: 'bg-green-50 text-green-700'
	};
</script>

<svelte:head>
	<title>{data.profileUser.username}'s tabs — GC Tabs</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white border-b border-gray-200 px-4 py-4">
		<div class="max-w-2xl mx-auto flex items-center justify-between">
			<a href="/" class="text-xl font-bold text-gray-900">🎸 GC Tabs</a>
			{#if data.isOwner}
				<form method="POST" action="/logout">
					<button class="text-sm text-gray-500 hover:text-gray-800">Log out</button>
				</form>
			{/if}
		</div>
	</header>

	<main class="max-w-2xl mx-auto px-4 py-6">
		<!-- Profile header -->
		<div class="flex items-center justify-between mb-6">
			<div>
				<h1 class="text-xl font-bold text-gray-900">@{data.profileUser.username}</h1>
				<p class="text-sm text-gray-500">{data.tabs.length} tab{data.tabs.length !== 1 ? 's' : ''}</p>
			</div>
			{#if data.isOwner}
				<a href="/tab/new"
					class="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-700 active:bg-gray-800">
					+ New tab
				</a>
			{/if}
		</div>

		<!-- Tab list -->
		{#if data.tabs.length === 0}
			<div class="text-center py-16 text-gray-400">
				<div class="text-5xl mb-3">🎵</div>
				{#if data.isOwner}
					<p class="font-medium text-gray-600">No tabs yet.</p>
					<p class="text-sm mt-1">Tap <strong>+ New tab</strong> to create your first one.</p>
				{:else}
					<p>No tabs here yet.</p>
				{/if}
			</div>
		{:else}
			<ul class="space-y-3">
				{#each data.tabs as tab}
					<li>
						<a href="/tab/{tab.id}"
							class="block bg-white border border-gray-200 rounded-2xl px-4 py-4 hover:border-gray-300 active:bg-gray-50">
							<div class="flex items-start justify-between gap-2">
								<div class="min-w-0">
									<p class="font-semibold text-gray-900 truncate">{tab.title}</p>
									{#if tab.artist}
										<p class="text-sm text-gray-500 truncate">{tab.artist}</p>
									{/if}
								</div>
								<span class="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full {typeColor[tab.type]}">
									{typeLabel[tab.type]}
								</span>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</main>
</div>
