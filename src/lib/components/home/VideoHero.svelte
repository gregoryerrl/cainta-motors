<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount, getContext } from 'svelte';

	// We'll get Lenis instance from context or fallback to our utility
	function handleScrollToNext() {
		// Try to find the next section element
		const showcaseSection = document.getElementById('showcase');
		if (showcaseSection) {
			// Use native smooth scroll as fallback, Lenis will override this
			showcaseSection.scrollIntoView({ behavior: 'smooth' });
		}
	}

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

<section class="relative w-full overflow-hidden bg-black" style="height: calc(100vh - 5rem);">
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
					<span class="block tracking-[0.3em]">CAINTA MOTORS</span>
					<span
						class="block text-3xl font-thin tracking-[0.2em] text-gray-400 md:text-4xl lg:text-5xl"
					>
						Premium Automotive Excellence
					</span>
				</h1>
			</div>

			<div transition:fly={{ y: 30, delay: 800, duration: 1000 }}>
				<p class="mx-auto mb-10 max-w-3xl text-lg font-thin text-gray-400 md:text-xl">
					Experience the perfect fusion of luxury, performance, and innovation.<br />
					Discover vehicles that redefine automotive excellence.
				</p>
			</div>

			<div
				transition:fly={{ y: 30, delay: 1100, duration: 1000 }}
				class="flex flex-col gap-8 sm:flex-row"
				style="pointer-events: auto;"
			>
				<a
					href="/models"
					class="border border-red-900 px-12 py-3 text-sm font-light tracking-widest text-white transition-all hover:border-red-800 hover:bg-red-900/20"
				>
					EXPLORE MODELS
				</a>
				<a
					href="/configurator"
					class="border border-gray-600 px-12 py-3 text-sm font-light tracking-widest text-gray-400 transition-all hover:border-white hover:text-white"
				>
					CONFIGURE
				</a>
			</div>
		{/if}
	</div>

	<!-- Scroll Indicator -->
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
