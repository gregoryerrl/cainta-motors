<script lang="ts">
	import VideoHero from '$lib/components/home/VideoHero.svelte';
	import EngineeringExcellence from '$lib/components/home/EngineeringExcellence.svelte';
	import Scene from '$lib/components/three/Scene.svelte';
	import Gallery from '$lib/components/home/Gallery.svelte';
	import VehicleCard from '$lib/components/ui/VehicleCard.svelte';
	import { vehicles } from '$lib/data/vehicles';
	import { ArrowRight } from 'lucide-svelte';
</script>

<!-- Video Hero Section -->
<VideoHero />

<!-- Split Section: 3D Model + Engineering Excellence -->
<section class="relative bg-black" style="height: 100vh;">
	<div class="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
		<!-- Left: 3D Model (Full height) -->
		<div class="relative h-full bg-black">
			<Scene class="h-full w-full" />
			<div class="absolute bottom-8 left-8 z-10">
				<p class="text-xs text-gray-500 uppercase tracking-wider">
					Drag to rotate • Scroll to zoom
				</p>
			</div>
		</div>

		<!-- Right: Engineering Excellence (Full height) -->
		<div class="relative h-full bg-black">
			<div class="h-full flex items-center px-8 lg:px-16">
				<EngineeringExcellence />
			</div>
		</div>
	</div>
</section>

<!-- Browse Models Section -->
<section class="bg-gray-900 py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-4xl font-bold text-white md:text-5xl">Browse Our Models</h2>
				<p class="mt-4 text-xl text-gray-400">Discover our lineup of exceptional vehicles</p>
			</div>
			<a
				href="/models"
				class="hidden items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-white transition-all hover:bg-white hover:text-black sm:flex"
			>
				View All Models
				<ArrowRight class="h-5 w-5" />
			</a>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each vehicles.slice(0, 3) as vehicle}
				<VehicleCard {vehicle} />
			{/each}
		</div>

		<div class="mt-8 text-center sm:hidden">
			<a
				href="/models"
				class="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-white transition-all hover:bg-white hover:text-black"
			>
				View All Models
				<ArrowRight class="h-5 w-5" />
			</a>
		</div>
	</div>
</section>

<Gallery />

<section class="bg-gradient-to-b from-black to-gray-900 py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-4xl font-bold text-white md:text-5xl">Ready to Experience Excellence?</h2>
		<p class="mt-4 text-xl text-gray-400">Schedule a test drive today and feel the difference</p>
		<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a
				href="/contact"
				class="rounded-full bg-red-600 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-red-700"
			>
				Schedule Test Drive
			</a>
			<a
				href="/configurator"
				class="rounded-full border-2 border-white px-8 py-3 text-lg font-medium text-white transition-all hover:bg-white hover:text-black"
			>
				Build Your Car
			</a>
		</div>
	</div>
</section>
