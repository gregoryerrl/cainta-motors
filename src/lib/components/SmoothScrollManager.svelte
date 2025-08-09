<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Lenis from 'lenis';

	let lenis: Lenis | null = null;
	let rafId: number;

	onMount(() => {
		// Check user motion preferences
		const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Don't initialize smooth scrolling if user prefers reduced motion
		if (isReducedMotion) {
			console.log('Lenis: Skipping smooth scroll due to user preference for reduced motion');
			return;
		}

		// Initialize Lenis with autoRaf (recommended approach)
		lenis = new Lenis({
			autoRaf: true // Let Lenis handle its own RAF loop
		});

		// Debug: log scroll events to verify it's working
		lenis.on('scroll', (e) => {
			console.log('Lenis scroll event:', e.scroll, e.velocity);
		});

		console.log('Lenis initialized successfully');
	});

	onDestroy(() => {
		console.log('Cleaning up Lenis');

		// Destroy Lenis instance (autoRaf cleanup is handled automatically)
		lenis?.destroy();
		lenis = null;
	});

	// Export lenis instance for external use
	export function getLenis(): Lenis | null {
		return lenis;
	}

	// Utility function to scroll to element with Lenis
	export function scrollToElement(target: string | HTMLElement, offset: number = 0) {
		if (lenis) {
			lenis.scrollTo(target, {
				offset,
				duration: 1.2
			});
		}
	}
</script>

<!-- This component doesn't render anything, it just manages smooth scrolling -->
