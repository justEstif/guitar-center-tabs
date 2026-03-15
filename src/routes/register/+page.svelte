<script lang="ts">
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	let pin = $state('');
	let pinDisplay = $derived('●'.repeat(pin.length));

	function appendDigit(d: string) {
		if (pin.length < 4) pin += d;
	}
	function backspace() {
		pin = pin.slice(0, -1);
	}
</script>

<svelte:head><title>Register — GC Tabs</title></svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
	<div class="w-full max-w-sm">
		<div class="text-center mb-8">
			<div class="text-4xl mb-2">🎸</div>
			<h1 class="text-2xl font-bold text-gray-900">Create account</h1>
			<p class="text-gray-500 text-sm mt-1">Pick a username and a 4-digit PIN</p>
		</div>

		<form method="POST" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-5">
			<!-- Username -->
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
				<input
					id="username"
					name="username"
					type="text"
					autocomplete="username"
					autocapitalize="none"
					required
					placeholder="e.g. guitarteacher"
					class="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900"
				/>
			</div>

			<!-- PIN -->
			<div>
				<label for="pin-numpad" class="block text-sm font-medium text-gray-700 mb-1">4-digit PIN</label>
				<input type="hidden" name="pin" value={pin} />

				<!-- PIN display -->
				<div class="flex justify-center gap-3 mb-3">
					{#each [0,1,2,3] as i}
						<div class="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold
							{pin.length > i ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-300'}">
							{pin.length > i ? '●' : '○'}
						</div>
					{/each}
				</div>

				<!-- Numpad -->
				<div id="pin-numpad" class="grid grid-cols-3 gap-2">
					{#each ['1','2','3','4','5','6','7','8','9'] as d}
						<button type="button" onclick={() => appendDigit(d)}
							class="h-12 rounded-xl border border-gray-200 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 active:bg-gray-200">
							{d}
						</button>
					{/each}
					<div></div>
					<button type="button" onclick={() => appendDigit('0')}
						class="h-12 rounded-xl border border-gray-200 text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 active:bg-gray-200">
						0
					</button>
					<button type="button" onclick={backspace}
						class="h-12 rounded-xl border border-gray-200 text-lg text-gray-600 bg-gray-50 hover:bg-gray-100 active:bg-gray-200">
						⌫
					</button>
				</div>
			</div>

			{#if form?.error}
				<p class="text-red-600 text-sm text-center">{form.error}</p>
			{/if}

			<button
				type="submit"
				disabled={pin.length < 4}
				class="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl disabled:opacity-40 hover:bg-gray-700 active:bg-gray-800">
				Create account
			</button>
		</form>

		<p class="text-center text-sm text-gray-500 mt-4">
			Already have an account? <a href="/login" class="underline text-gray-700">Log in</a>
		</p>
	</div>
</div>
