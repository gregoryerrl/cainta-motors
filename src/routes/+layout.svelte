<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Cainta Motors - Premium Automotive Excellence</title>
</svelte:head>

<Header />
<main class="min-h-screen bg-black pt-20" style="pointer-events: auto;">
	{@render children?.()}
</main>
<Footer />
