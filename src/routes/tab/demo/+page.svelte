<script lang="ts">
	const tab = {
		title: 'Wonderwall',
		artist: 'Oasis',
		type: 'TAB' as 'TAB' | 'CHORDS' | 'LYRICS',
		createdBy: 'guitarteacher',
		content: `Intro / Verse riff (repeat)

e|--3--3--3--3--3--3--3--3--|
B|--3--3--3--3--3--3--3--3--|
G|--0--0--2--2--0--0--2--2--|
D|--0--0--3--3--0--0--3--3--|
A|--2--2--3--3--2--2--3--3--|
E|--3--3--1--1--3--3--1--1--|

Chords used:
  Em7     G       Dsus4    A7sus4
e|--0--|--3--|---3---|---0---|
B|--3--|--3--|---3---|---3---|
G|--0--|--0--|---2---|---0---|
D|--2--|--0--|---0---|---2---|
A|--2--|--2--|-------|---0---|
E|--0--|--3--|-------|-------|

Chorus strum pattern (Down Down Up Up Down):
  Em7  G  Dsus4  A7sus4
  /    /   /      /

Today is gonna be the day...
[Em7] Today is gonna be the [G] day
That they're gonna [Dsus4] throw it back to [A7sus4] you`
	};

	const typeLabel = { TAB: 'Tab', CHORDS: 'Chords', LYRICS: 'Lyrics' }[tab.type];
</script>

<svelte:head>
	<title>{tab.title} — {tab.artist}</title>
</svelte:head>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="border-b border-gray-200 px-4 py-4 no-print">
		<div class="max-w-2xl mx-auto flex items-center justify-between">
			<a href="/" class="text-xl font-bold text-gray-900">🎸 GC Tabs</a>
			<button
				onclick={() => window.print()}
				class="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 active:bg-gray-100"
			>
				🖨️ Print
			</button>
		</div>
	</header>

	<!-- Tab sheet -->
	<main class="max-w-2xl mx-auto px-4 py-6">
		<!-- Meta -->
		<div class="mb-6">
			<div class="flex items-center gap-2 mb-1">
				<span class="text-xs font-medium uppercase tracking-wide text-gray-400 bg-gray-100 rounded px-2 py-0.5">
					{typeLabel}
				</span>
			</div>
			<h1 class="text-2xl font-bold text-gray-900">{tab.title}</h1>
			<p class="text-gray-500 mt-0.5">{tab.artist}</p>
			<p class="text-xs text-gray-400 mt-2">
				by <a href="/u/{tab.createdBy}" class="underline hover:text-gray-600">{tab.createdBy}</a>
			</p>
		</div>

		<!-- Divider -->
		<hr class="border-gray-200 mb-6" />

		<!-- Tab content -->
		<div class="tab-content text-gray-800 bg-gray-50 rounded-xl p-4">
			{tab.content}
		</div>
	</main>
</div>
