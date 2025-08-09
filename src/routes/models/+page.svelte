<script lang="ts">
	import VehicleCard from '$lib/components/ui/VehicleCard.svelte';
	import { vehicles } from '$lib/data/vehicles';
	import { Filter } from 'lucide-svelte';

	let selectedCategory = $state('all');
	
	const categories = [
		{ value: 'all', label: 'All Models' },
		{ value: 'sedan', label: 'Sedan' },
		{ value: 'suv', label: 'SUV' },
		{ value: 'hatchback', label: 'Hatchback' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'luxury', label: 'Luxury' }
	];

	$effect(() => {
		filteredVehicles = selectedCategory === 'all' 
			? vehicles 
			: vehicles.filter(v => v.category === selectedCategory);
	});

	let filteredVehicles = $state(vehicles);
</script>

<svelte:head>
	<title>Our Models - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-5xl font-thin text-white md:text-6xl">
				Our Models
			</h1>
			<p class="mt-4 text-lg font-thin text-gray-500">
				Explore our complete lineup of premium vehicles
			</p>
		</div>

		<div class="mt-12 flex flex-wrap items-center justify-center gap-4">
			<span class="flex items-center gap-2 text-xs font-light tracking-wider text-gray-500 uppercase">
				<Filter class="h-4 w-4" />
				Filter by:
			</span>
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category.value}
					class="border px-6 py-2 text-xs font-light tracking-widest uppercase transition-all {
						selectedCategory === category.value
							? 'border-red-900 bg-red-900/20 text-white'
							: 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-white'
					}"
				>
					{category.label}
				</button>
			{/each}
		</div>

		{#if filteredVehicles.length > 0}
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredVehicles as vehicle}
					<VehicleCard {vehicle} />
				{/each}
			</div>
		{:else}
			<div class="mt-24 text-center">
				<p class="text-2xl font-thin text-gray-500">No vehicles found in this category</p>
				<button
					onclick={() => selectedCategory = 'all'}
					class="mt-4 border border-red-900 px-6 py-2 text-xs font-light tracking-widest uppercase text-white transition-all hover:bg-red-900/20"
				>
					View All Models
				</button>
			</div>
		{/if}
	</div>
</section>