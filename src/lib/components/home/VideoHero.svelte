<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onMount, getContext } from 'svelte';

	let mounted = $state(false);
	let videoRef = $state<HTMLVideoElement | null>(null);

	// Get loading context to report video loading status
	const loadingContext = getContext<{
		registerAsset: (id: string) => void;
		updateAsset: (
			id: string,
			status: 'pending' | 'loading' | 'loaded' | 'error',
			progress?: number
		) => void;
	}>('loading');

	// Handle video loading events
	function handleVideoLoadStart() {
		console.log('🎥 Video loadstart event');
		if (loadingContext) {
			loadingContext.updateAsset('hero-video', 'loading');
		}
	}

	function handleVideoLoaded() {
		console.log('🎥 Video loadeddata event');
		if (loadingContext) {
			loadingContext.updateAsset('hero-video', 'loaded');
		}
		console.log('Video loaded successfully');
	}

	function handleVideoError() {
		console.log('🎥 Video error event');
		if (loadingContext) {
			loadingContext.updateAsset('hero-video', 'error');
		}
		console.log('Video failed to load, using fallback');
	}

	onMount(() => {
		mounted = true;

		// Register video asset
		if (loadingContext) {
			loadingContext.registerAsset('hero-video');
		}

		// Check if video is already loaded
		setTimeout(() => {
			if (videoRef) {
				if (videoRef.readyState >= 3) {
					// HAVE_FUTURE_DATA or higher
					console.log('🎥 Video already loaded');
					if (loadingContext) {
						loadingContext.updateAsset('hero-video', 'loaded');
					}
				}
				videoRef.play().catch(console.warn);
			}
		}, 100);
	});
</script>

<section class="relative w-full overflow-hidden bg-black" style="height: calc(100vh - 5rem);">
	<!-- Video Background with Mobile Optimization -->
	{#if typeof window !== 'undefined'}
		<video
			bind:this={videoRef}
			class="absolute inset-0 h-full w-full object-cover"
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			onloadstart={handleVideoLoadStart}
			onloadeddata={handleVideoLoaded}
			oncanplaythrough={handleVideoLoaded}
			onerror={handleVideoError}
		>
			<!-- Use same video for all devices until mobile-optimized version is available -->
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
				<h1 class="mb-6 text-4xl font-thin text-white sm:text-6xl md:text-7xl lg:text-8xl">
					<span class="block tracking-[0.3em]">CAINTA MOTORS</span>
					<span
						class="block text-xl font-thin tracking-[0.2em] text-gray-400 sm:text-3xl md:text-4xl lg:text-5xl"
					>
						Premium Automotive Excellence
					</span>
				</h1>
			</div>

			<div
				transition:fly={{ y: 30, delay: 1100, duration: 1000 }}
				class="flex flex-col gap-8 sm:flex-row"
				style="pointer-events: auto;"
			>
				<a
					href="/models"
					class="btn-red-fill border border-red-900 px-12 py-3 text-sm font-light tracking-widest text-white"
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

<!-- Unused CSS removed - scroll indicator uses Tailwind's animate-bounce -->
