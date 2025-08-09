<script lang="ts">
	import Scene from '../three/Scene.svelte';
	import { ChevronDown } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section class="relative h-screen w-full overflow-hidden bg-black">
	<Scene class="absolute inset-0 h-full w-full" />
	
	<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" style="pointer-events: none;" />
	
	<div class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center" style="pointer-events: none;">
		{#if mounted}
			<div transition:fade={{ delay: 300, duration: 1000 }}>
				<h1 class="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
					<span class="block">HONDA CITY RS</span>
					<span class="block text-3xl font-light tracking-wider text-gray-300 md:text-4xl lg:text-5xl">
						Redefine Your Drive
					</span>
				</h1>
			</div>

			<div transition:fly={{ y: 20, delay: 600, duration: 800 }}>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
					Experience the perfect blend of style, performance, and innovation. 
					The Honda City RS sets new standards in urban luxury.
				</p>
			</div>

			<div transition:fly={{ y: 20, delay: 900, duration: 800 }} class="flex flex-col gap-4 sm:flex-row" style="pointer-events: auto;">
				<a
					href="/configurator"
					class="rounded-full bg-red-600 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-red-700 hover:scale-105"
				>
					Configure Your Car
				</a>
				<a
					href="/models/honda-city-rs"
					class="rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white transition-all hover:bg-white hover:text-black"
				>
					View Details
				</a>
			</div>
		{/if}
	</div>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<ChevronDown class="h-8 w-8 text-white/50" />
	</div>
</section>

<style>
	@keyframes bounce {
		0%, 100% {
			transform: translateY(0) translateX(-50%);
		}
		50% {
			transform: translateY(-10px) translateX(-50%);
		}
	}
	
	.animate-bounce {
		animation: bounce 2s infinite;
	}
</style>