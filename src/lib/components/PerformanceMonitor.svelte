<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		enabled = false,
		showStats = false
	}: {
		enabled?: boolean;
		showStats?: boolean;
	} = $props();

	let performanceStats = $state<{
		loadTime: number;
		domContentLoaded: number;
		firstContentfulPaint: number;
		largestContentfulPaint: number;
		totalBlockingTime: number;
	}>({
		loadTime: 0,
		domContentLoaded: 0,
		firstContentfulPaint: 0,
		largestContentfulPaint: 0,
		totalBlockingTime: 0
	});

	let isVisible = $state(false);

	onMount(() => {
		if (!browser || !enabled) return;

		// Measure load time
		const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
		if (navigationEntry) {
			performanceStats.loadTime = Math.round(navigationEntry.loadEventEnd - navigationEntry.loadEventStart);
			performanceStats.domContentLoaded = Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart);
		}

		// Measure Web Vitals
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				switch (entry.entryType) {
					case 'paint':
						if (entry.name === 'first-contentful-paint') {
							performanceStats.firstContentfulPaint = Math.round(entry.startTime);
						}
						break;
					case 'largest-contentful-paint':
						performanceStats.largestContentfulPaint = Math.round(entry.startTime);
						break;
					case 'long-task':
						performanceStats.totalBlockingTime += Math.max(0, entry.duration - 50);
						break;
				}
			}
		});

		try {
			observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'long-task'] });
		} catch (error) {
			console.warn('Performance observation not supported:', error);
		}

		// Log performance metrics to console in development
		if (import.meta.env.DEV) {
			setTimeout(() => {
				console.group('🚀 Performance Metrics');
				console.log(`Load Time: ${performanceStats.loadTime}ms`);
				console.log(`DOM Content Loaded: ${performanceStats.domContentLoaded}ms`);
				console.log(`First Contentful Paint: ${performanceStats.firstContentfulPaint}ms`);
				console.log(`Largest Contentful Paint: ${performanceStats.largestContentfulPaint}ms`);
				console.log(`Total Blocking Time: ${Math.round(performanceStats.totalBlockingTime)}ms`);
				console.groupEnd();
			}, 2000);
		}

		return () => {
			observer.disconnect();
		};
	});

	function toggleStats() {
		isVisible = !isVisible;
	}

	// Keyboard shortcut to toggle stats (Ctrl+Shift+P)
	onMount(() => {
		if (!browser || !enabled) return;

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.shiftKey && e.key === 'P') {
				e.preventDefault();
				toggleStats();
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

{#if enabled && showStats}
	<!-- Performance Stats Toggle Button -->
	<button
		onclick={toggleStats}
		class="fixed bottom-4 right-4 z-50 rounded-full bg-red-900/90 p-2 text-white backdrop-blur-sm transition-all hover:bg-red-900"
		title="Toggle Performance Stats (Ctrl+Shift+P)"
	>
		<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
		</svg>
	</button>

	{#if isVisible}
		<!-- Performance Stats Panel -->
		<div class="fixed bottom-16 right-4 z-50 w-80 rounded-lg border border-gray-700 bg-black/95 p-4 text-xs font-mono text-white backdrop-blur-sm">
			<div class="mb-3 flex items-center justify-between">
				<h3 class="font-semibold">Performance Metrics</h3>
				<button
					onclick={toggleStats}
					class="text-gray-400 hover:text-white"
				>
					×
				</button>
			</div>
			
			<div class="space-y-2">
				<div class="flex justify-between">
					<span>Load Time:</span>
					<span class={performanceStats.loadTime > 3000 ? 'text-red-400' : performanceStats.loadTime > 1000 ? 'text-yellow-400' : 'text-green-400'}>
						{performanceStats.loadTime}ms
					</span>
				</div>
				
				<div class="flex justify-between">
					<span>DOM Ready:</span>
					<span class={performanceStats.domContentLoaded > 1500 ? 'text-red-400' : performanceStats.domContentLoaded > 800 ? 'text-yellow-400' : 'text-green-400'}>
						{performanceStats.domContentLoaded}ms
					</span>
				</div>
				
				<div class="flex justify-between">
					<span>First Paint:</span>
					<span class={performanceStats.firstContentfulPaint > 2500 ? 'text-red-400' : performanceStats.firstContentfulPaint > 1800 ? 'text-yellow-400' : 'text-green-400'}>
						{performanceStats.firstContentfulPaint}ms
					</span>
				</div>
				
				<div class="flex justify-between">
					<span>Largest Paint:</span>
					<span class={performanceStats.largestContentfulPaint > 4000 ? 'text-red-400' : performanceStats.largestContentfulPaint > 2500 ? 'text-yellow-400' : 'text-green-400'}>
						{performanceStats.largestContentfulPaint}ms
					</span>
				</div>
				
				<div class="flex justify-between">
					<span>Blocking Time:</span>
					<span class={performanceStats.totalBlockingTime > 300 ? 'text-red-400' : performanceStats.totalBlockingTime > 100 ? 'text-yellow-400' : 'text-green-400'}>
						{Math.round(performanceStats.totalBlockingTime)}ms
					</span>
				</div>
			</div>
			
			<div class="mt-3 text-xs text-gray-400">
				Press Ctrl+Shift+P to toggle
			</div>
		</div>
	{/if}
{/if}