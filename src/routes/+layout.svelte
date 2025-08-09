<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SmoothScrollManager from '$lib/components/SmoothScrollManager.svelte';
	import LoadingManager from '$lib/components/LoadingManager.svelte';
	import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cainta Motors - Premium Automotive Excellence</title>
</svelte:head>

<!-- Initialize smooth scrolling -->
<SmoothScrollManager />

<!-- Wrap everything in LoadingManager for asset tracking -->
<LoadingManager>
	<Header />
	<main class="smooth-scroll-container min-h-screen bg-black pt-20" style="pointer-events: auto;">
		{@render children?.()}
	</main>
	<Footer />
	
	<!-- Loading screen overlay - positioned last for proper z-index layering -->
	<LoadingScreen />
</LoadingManager>
