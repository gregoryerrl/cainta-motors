<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Get loading context
	const loadingContext = getContext<{
		isLoading: () => boolean;
		progress: () => number;
	}>('loading');

	let mounted = $state(false);
	let showScreen = $state(true);

	onMount(() => {
		mounted = true;
		// Prevent body scrolling when loading screen is active
		document.body.style.overflow = 'hidden';
		document.body.style.height = '100vh';
	});

	// Reactive values from context
	$effect(() => {
		if (loadingContext && !loadingContext.isLoading()) {
			// Minimal delay for smooth fade transition
			setTimeout(() => {
				showScreen = false;
				// Re-enable scrolling when loading screen is hidden
				document.body.style.overflow = '';
				document.body.style.height = '';
			}, 200);
		}
	});
</script>

{#if showScreen && mounted}
	<div
		class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
		style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: all; overflow: hidden;"
		transition:fade={{ duration: 800 }}
		onwheel={(e) => e.preventDefault()}
		ontouchmove={(e) => e.preventDefault()}
		onscroll={(e) => e.preventDefault()}
	>
		<!-- Main Content -->
		<div class="text-center">
			<!-- Brand -->
			<h1 class="mb-8 text-4xl font-thin tracking-[0.3em] text-white md:text-5xl">CAINTA MOTORS</h1>

			<p class="mb-12 text-sm font-light tracking-widest text-gray-500 uppercase">
				Premium Automotive Excellence
			</p>

			<!-- Progress Container -->
			<div class="mx-auto w-64 md:w-80">
				<!-- Progress Bar Background -->
				<div class="mb-4 h-px bg-gray-800">
					<!-- Progress Bar Fill -->
					<div
						class="h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-500 ease-out"
						style="width: {loadingContext?.progress() || 0}%"
					></div>
				</div>

				<!-- Progress Text -->
				<div class="flex justify-between text-xs font-light text-gray-600">
					<span>Loading Assets</span>
					<span>{loadingContext?.progress() || 0}%</span>
				</div>
			</div>
		</div>

		<!-- Subtle Animation Dots -->
		<div class="absolute bottom-12 flex space-x-2">
			<div class="h-1 w-1 animate-pulse rounded-full bg-gray-700"></div>
			<div
				class="h-1 w-1 animate-pulse rounded-full bg-gray-700"
				style="animation-delay: 0.2s;"
			></div>
			<div
				class="h-1 w-1 animate-pulse rounded-full bg-gray-700"
				style="animation-delay: 0.4s;"
			></div>
		</div>
	</div>
{/if}
