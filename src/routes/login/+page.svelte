<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	let pin = $state('');

	function appendDigit(d: string) {
		if (pin.length < 4) pin += d;
	}
	function backspace() {
		pin = pin.slice(0, -1);
	}
</script>

<svelte:head><title>Log in — GC Tabs</title></svelte:head>

<div class="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="text-center mb-8">
			<div class="text-4xl mb-2">🎸</div>
			<h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
			<p class="text-gray-500 text-sm mt-1">Enter your username and PIN</p>
		</div>

		<form method="POST" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					autocomplete="username"
					autocapitalize="none"
					required
					placeholder="guitarteacher"
					class="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
				/>
			</div>

			<fieldset>
				<legend class="block text-sm font-medium text-gray-700 mb-1">PIN</legend>
				<input type="hidden" name="pin" value={pin} />

				<div class="flex justify-center gap-3 mb-3">
					{#each [0,1,2,3] as i}
						<div class="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-transform duration-100 ease-out
							{pin.length > i ? 'border-amber-600 bg-amber-600 text-white scale-100 opacity-100' : 'border-gray-300 text-gray-300 scale-75 opacity-60'}">
							{pin.length > i ? '●' : '○'}
						</div>
					{/each}
				</div>

				<div class="grid grid-cols-3 gap-2" role="group" aria-label="PIN numpad">
					{#each ['1','2','3','4','5','6','7','8','9'] as d}
						<button type="button" onclick={() => appendDigit(d)}
							class="h-12 rounded-xl border border-gray-200 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150">
							{d}
						</button>
					{/each}
					<div aria-hidden="true"></div>
					<button type="button" onclick={() => appendDigit('0')}
						class="h-12 rounded-xl border border-gray-200 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150">
						0
					</button>
					<button type="button" onclick={backspace} aria-label="Backspace"
						class="h-12 rounded-xl border border-gray-200 text-lg text-gray-600 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150">
						⌫
					</button>
				</div>
			</fieldset>

			{#if form?.error}
				<p class="text-red-600 text-sm text-center">{form.error}</p>
			{/if}

			<button
				type="submit"
				disabled={pin.length < 4}
				class="w-full bg-amber-600 text-white font-semibold py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-700 active:bg-amber-800 transition-colors duration-150">
				Log in
			</button>
		</form>

		<p class="text-center text-sm text-gray-500 mt-4">
			New here? <a href="/register" class="underline text-gray-700">Create account</a>
		</p>
	</div>
</div>
