<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let videoRef = $state<HTMLVideoElement | null>(null);

	onMount(() => {
		mounted = true;
		// Ensure video plays
		if (videoRef) {
			videoRef.play().catch(console.warn);
		}
	});
</script>

<section class="relative h-screen w-full overflow-hidden bg-black">
	<!-- Video Background with Fallback -->
	{#if typeof window !== 'undefined'}
		<video
			bind:this={videoRef}
			class="absolute inset-0 h-full w-full object-cover"
			autoplay
			muted
			loop
			playsinline
			onloadeddata={() => console.log('Video loaded successfully')}
			onerror={() => console.log('Video failed to load, using fallback')}
		>
			<source src="/hero_video.mp4" type="video/mp4" />
		</video>
	{/if}

	<!-- Fallback gradient background -->
	<div class="absolute inset-0 bg-black/60"></div>

	<!-- Dark Overlay -->
	<div class="absolute inset-0 bg-black/40"></div>

	<!-- Content Overlay -->
	<div
		class="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
		style="pointer-events: none;"
	>
		{#if mounted}
			<div transition:fade={{ delay: 500, duration: 1200 }}>
				<h1 class="mb-6 text-6xl font-thin text-white md:text-7xl lg:text-8xl">
					<span class="block tracking-widest">CAINTA MOTORS</span>
					<span
						class="block text-4xl font-thin tracking-wider text-gray-200 md:text-5xl lg:text-6xl"
					>
						Premium Automotive Excellence
					</span>
				</h1>
			</div>

			<div transition:fly={{ y: 30, delay: 800, duration: 1000 }}>
				<p class="mx-auto mb-10 max-w-3xl text-xl font-thin text-gray-200 md:text-2xl">
					Experience the perfect fusion of luxury, performance, and innovation. Discover vehicles
					that redefine automotive excellence.
				</p>
			</div>

			<div
				transition:fly={{ y: 30, delay: 1100, duration: 1000 }}
				class="flex flex-col gap-6 sm:flex-row"
				style="pointer-events: auto;"
			>
				<a
					href="/models"
					class="rounded-full bg-red-600 px-10 py-4 text-xl font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-red-700"
				>
					Explore Our Models
				</a>
				<a
					href="/configurator"
					class="rounded-full border-2 border-white px-10 py-4 text-xl font-semibold text-white shadow-2xl transition-all hover:bg-white hover:text-black"
				>
					Build Your Car
				</a>
			</div>
		{/if}
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<ChevronDown class="h-8 w-8 text-white/70" />
	</div>
</section>

<style>
	@keyframes bounce {
		0%,
		100% {
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
