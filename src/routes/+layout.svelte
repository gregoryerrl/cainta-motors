<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import SmoothScrollManager from '$lib/components/SmoothScrollManager.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cainta Motors - Premium Automotive Excellence</title>
</svelte:head>

<!-- Initialize smooth scrolling -->
<SmoothScrollManager />

<Header />
<main class="min-h-screen bg-black pt-20 smooth-scroll-container" style="pointer-events: auto;">
	{@render children?.()}
</main>
<Footer />
