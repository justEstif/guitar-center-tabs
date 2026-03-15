<script lang="ts">
	import { onMount } from 'svelte';
	import type { Tab } from '$lib/server/schema';

	let {
		mode,
		tab,
		error,
		action
	}: {
		mode: 'create' | 'edit';
		tab?: Tab;
		error?: string;
		action: string;
	} = $props();

	// Form state — use tab prop as initial value only (it won't change after mount)
	let title = $state(tab?.title ?? '');
	let artist = $state(tab?.artist ?? '');
	let type = $state<'TAB' | 'CHORDS' | 'LYRICS'>(tab?.type ?? 'TAB');
	let content = $state(tab?.content ?? '');
	// suppress svelte's "captures initial value" warning — intentional here
	void tab;

	// Toolbar + viewport
	let textarea: HTMLTextAreaElement;
	let toolbarBottom = $state(0); // px from bottom of screen

	// Toolbar characters
	const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
	const chars = ['|', '-', '/', '\\', 'h', 'p', 'b', 'x'];
	const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	function insert(char: string) {
		if (!textarea) return;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const before = content.slice(0, start);
		const after = content.slice(end);
		content = before + char + after;
		// Restore cursor after Svelte re-renders
		requestAnimationFrame(() => {
			textarea.focus();
			textarea.setSelectionRange(start + char.length, start + char.length);
		});
	}

	function insertString(s: string) {
		// Insert "e|" style prefix at start of a new line
		insert(s + '|');
	}

	// Track visual viewport (keyboard height) on mobile
	onMount(() => {
		function updateViewport() {
			if (!window.visualViewport) return;
			const keyboardHeight = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
			toolbarBottom = Math.max(0, keyboardHeight);
		}

		window.visualViewport?.addEventListener('resize', updateViewport);
		window.visualViewport?.addEventListener('scroll', updateViewport);
		updateViewport();

		return () => {
			window.visualViewport?.removeEventListener('resize', updateViewport);
			window.visualViewport?.removeEventListener('scroll', updateViewport);
		};
	});
</script>

<div class="min-h-screen bg-gray-50 flex flex-col" style="padding-bottom: {mode === 'edit' ? '140px' : '80px'}">
	<!-- Header -->
	<header class="bg-white border-b border-gray-200 px-4 py-4 shrink-0">
		<div class="max-w-2xl mx-auto flex items-center justify-between">
			<button type="button" onclick={() => history.back()} class="text-gray-500 hover:text-gray-900">
				← Back
			</button>
			<span class="font-semibold text-gray-900">{mode === 'create' ? 'New tab' : 'Edit tab'}</span>
			<button
				form="tab-form"
				type="submit"
				disabled={!title.trim() || !content.trim()}
				class="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-gray-700">
				Save
			</button>
		</div>
	</header>

	<!-- Form -->
	<form id="tab-form" method="POST" {action} class="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 pt-4 gap-4">

		<!-- Title + Artist -->
		<div class="flex gap-2">
			<input
				name="title"
				type="text"
				bind:value={title}
				placeholder="Song title *"
				required
				class="flex-1 min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
			/>
			<input
				name="artist"
				type="text"
				bind:value={artist}
				placeholder="Artist"
				class="flex-1 min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
			/>
		</div>

		<!-- Type selector -->
		<div class="flex gap-2">
			{#each (['TAB', 'CHORDS', 'LYRICS'] as const) as t}
				<button
					type="button"
					onclick={() => type = t}
					class="flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors
						{type === t
							? 'bg-gray-900 text-white border-gray-900'
							: 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'}">
					{t === 'TAB' ? '🎸 Tab' : t === 'CHORDS' ? '🎵 Chords' : '📝 Lyrics'}
				</button>
			{/each}
		</div>
		<input type="hidden" name="type" value={type} />

		<!-- Editor -->
		<div class="flex-1 flex flex-col min-h-0">
			<textarea
				bind:this={textarea}
				bind:value={content}
				name="content"
				placeholder={type === 'TAB'
					? 'e|--0--2--3--\nB|--1--3--3--\nG|--0--2--0--\n...'
					: type === 'CHORDS'
					? 'Am   G   F   E\n...'
					: 'Verse 1:\n[Am] Today is gonna be the [G] day...'}
				spellcheck="false"
				autocorrect="off"
				autocapitalize="off"
				class="tab-content flex-1 w-full min-h-48 border border-gray-300 rounded-xl p-4 bg-white text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-gray-900"
			></textarea>
		</div>

		{#if error}
			<p class="text-red-600 text-sm text-center">{error}</p>
		{/if}
	</form>
</div>

<!-- Sticky toolbar — floats above keyboard on mobile -->
<div
	class="fixed left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 shadow-lg"
	style="bottom: {toolbarBottom}px">
	<div class="max-w-2xl mx-auto space-y-1.5">
		<!-- String shortcuts -->
		<div class="flex gap-1 items-center">
			<span class="text-xs text-gray-400 font-medium w-10 shrink-0">str</span>
			{#each strings as s}
				<button
					type="button"
					onclick={() => insertString(s)}
					class="flex-1 h-9 rounded-lg bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 active:bg-gray-600">
					{s}
				</button>
			{/each}
		</div>
		<!-- Common chars -->
		<div class="flex gap-1 items-center">
			<span class="text-xs text-gray-400 font-medium w-10 shrink-0">sym</span>
			{#each chars as c}
				<button
					type="button"
					onclick={() => insert(c)}
					class="flex-1 h-9 rounded-lg bg-gray-100 text-gray-800 text-sm font-mono font-semibold hover:bg-gray-200 active:bg-gray-300 border border-gray-200">
					{c}
				</button>
			{/each}
		</div>
		<!-- Digits -->
		<div class="flex gap-1 items-center">
			<span class="text-xs text-gray-400 font-medium w-10 shrink-0">num</span>
			{#each digits as d}
				<button
					type="button"
					onclick={() => insert(d)}
					class="flex-1 h-9 rounded-lg bg-gray-100 text-gray-800 text-sm font-mono font-semibold hover:bg-gray-200 active:bg-gray-300 border border-gray-200">
					{d}
				</button>
			{/each}
		</div>
	</div>
</div>
