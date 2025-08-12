<script lang="ts">
	import VideoHero from '$lib/components/home/VideoHero.svelte';
	import EngineeringExcellence from '$lib/components/home/EngineeringExcellence.svelte';
	import LazyScene from '$lib/components/three/LazyScene.svelte';
	import Gallery from '$lib/components/home/Gallery.svelte';
	import VehicleCard from '$lib/components/ui/VehicleCard.svelte';
	import { vehicles } from '$lib/data/vehicles';
	import { ArrowRight } from 'lucide-svelte';
</script>

<!-- Video Hero Section -->
<section id="hero">
	<VideoHero />
</section>

<!-- Split Section: 3D Model + Engineering Excellence -->
<section id="showcase" class="relative h-[150vh] bg-black lg:h-screen">
	<div class="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
		<!-- Left: 3D Model (Full height) -->
		<div class="relative hidden h-full bg-white/6 lg:block">
			<LazyScene
				class="h-full w-full"
				scale={0.5}
				objectPosition={[4, 2, 4]}
				model="/gltf/mercedes-benz_maybach_2022/scene.gltf"
				selectedColor="#000000"
			/>
		</div>
		<div class="relative h-[40vh] bg-white/6 pt-16 lg:hidden">
			<LazyScene
				class="h-full w-full"
				scale={1}
				objectPosition={[4, 2, 4]}
				model="/gltf/mercedes-benz_maybach_2022/scene.gltf"
				selectedColor="#000000"
			/>
		</div>

		<!-- Right: Engineering Excellence (Full height) -->
		<div class="relative h-[110vh] bg-white/6">
			<div class="flex h-full items-center px-8 lg:px-16">
				<EngineeringExcellence />
			</div>
		</div>
	</div>
</section>

<!-- Browse Models Section -->
<section id="models" class="bg-black py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<div>
				<h2 class="text-4xl font-thin text-white md:text-5xl">Browse Our Models</h2>
				<p class="mt-4 text-lg font-thin text-gray-500">
					Discover our lineup of exceptional vehicles
				</p>
			</div>
			<a
				href="/models"
				class="hidden items-center gap-2 border border-gray-700 px-6 py-2 text-xs font-light tracking-widest text-gray-400 transition-all hover:border-white hover:text-white sm:flex"
			>
				VIEW ALL
				<ArrowRight class="h-3 w-3" />
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
				class="inline-flex items-center gap-2 border border-gray-700 px-6 py-2 text-xs font-light tracking-widest text-gray-400 transition-all hover:border-white hover:text-white"
			>
				VIEW ALL
				<ArrowRight class="h-3 w-3" />
			</a>
		</div>
	</div>
</section>

<section id="gallery">
	<Gallery />
</section>

<section id="cta" class="bg-black py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="text-4xl font-thin text-white md:text-5xl">Ready to Experience Excellence?</h2>
		<p class="mt-4 text-lg font-thin text-gray-500">
			Schedule a test drive today and feel the difference
		</p>
		<div class="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center">
			<a
				href="/contact"
				class="border border-red-900 px-10 py-3 text-xs font-light tracking-widest text-white transition-all hover:bg-red-900/20"
			>
				SCHEDULE TEST DRIVE
			</a>
			<a
				href="/configurator"
				class="border border-gray-700 px-10 py-3 text-xs font-light tracking-widest text-gray-400 transition-all hover:border-white hover:text-white"
			>
				BUILD YOUR CAR
			</a>
		</div>
	</div>
</section>
