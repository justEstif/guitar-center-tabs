<svelte:head>
	<title>GC Tabs — Guitar tabs, anywhere</title>
	<meta name="description" content="Create and share guitar tabs from your phone. No account needed to view." />
</svelte:head>

<div class="min-h-screen bg-amber-50 text-stone-900 flex flex-col">
	<!-- Nav -->
	<nav class="px-6 py-5 flex items-center justify-between max-w-4xl mx-auto w-full">
		<span class="text-xl font-bold">🎸 GC Tabs</span>
		<div class="flex gap-3">
			<a href="/login" class="text-sm text-stone-600 hover:text-stone-900 px-3 py-2 transition-colors duration-150">Log in</a>
			<a href="/register" class="text-sm font-semibold bg-amber-600 text-white px-4 py-1.5 rounded-lg hover:bg-amber-700 transition-colors duration-150">
				Create account
			</a>
		</div>
	</nav>

	<!-- Hero -->
	<main class="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center max-w-2xl mx-auto w-full">
		<h1 class="text-4xl sm:text-5xl font-bold leading-tight mb-4">
			Guitar tabs,<br />on your phone.
		</h1>
		<p class="text-stone-500 text-lg mb-10 max-w-md">
			Write a tab in seconds. Share a link. Students open it on any device — no app, no account.
		</p>

		<a href="/register"
			class="bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:bg-amber-700 active:bg-amber-800 mb-4 w-full max-w-xs transition-colors duration-150">
			Create free account
		</a>
		<a href="/login" class="text-stone-500 text-sm hover:text-stone-700">Already have an account? Log in</a>
	</main>

	<!-- Features -->
	<section class="border-t border-amber-200 px-6 py-12 bg-white/60">
		<div class="max-w-2xl mx-auto">
			<!-- Mobile toolbar — the hero feature -->
			<div class="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm p-6 mb-6">
				<div class="text-3xl mb-3">📱</div>
				<h3 class="text-lg font-bold mb-2">Built for writing tabs on your phone</h3>
				<p class="text-stone-500 text-sm">
					The quick-tap toolbar puts string labels, symbols, and fret numbers one tap away —
					no hunting for <code class="font-mono bg-amber-50 px-1 rounded">|</code> or
					<code class="font-mono bg-amber-50 px-1 rounded">-</code> on a tiny keyboard.
					Write complete tabs in minutes, not sessions.
				</p>
			</div>
			<!-- Secondary features -->
			<div class="grid sm:grid-cols-2 gap-4 text-center">
				<div class="bg-white/80 rounded-xl border border-amber-100 p-4">
					<div class="text-2xl mb-2">🔗</div>
					<h3 class="font-semibold mb-1">Share a link</h3>
					<p class="text-stone-500 text-sm">Every tab gets a shareable link. Students open it on any device — no login needed.</p>
				</div>
				<div class="bg-white/80 rounded-xl border border-amber-100 p-4">
					<div class="text-2xl mb-2">🖨️</div>
					<h3 class="font-semibold mb-1">Print ready</h3>
					<p class="text-stone-500 text-sm">Need a physical copy? Every tab prints cleanly — no clutter, just the music.</p>
				</div>
			</div>
		</div>
	</section>

	<footer class="text-center text-sm text-stone-500 py-6 px-4">
		Built for guitar teachers. Made with ❤️
	</footer>
</div>
