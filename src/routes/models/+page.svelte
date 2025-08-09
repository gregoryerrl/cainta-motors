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
			<h1 class="text-5xl font-bold text-white md:text-6xl">
				Our Models
			</h1>
			<p class="mt-4 text-xl text-gray-400">
				Explore our complete lineup of premium vehicles
			</p>
		</div>

		<div class="mt-12 flex flex-wrap items-center justify-center gap-2">
			<span class="flex items-center gap-2 text-gray-400">
				<Filter class="h-5 w-5" />
				Filter by:
			</span>
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category.value}
					class="rounded-full px-6 py-2 text-sm font-medium transition-all {
						selectedCategory === category.value
							? 'bg-red-600 text-white'
							: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
				<p class="text-2xl text-gray-500">No vehicles found in this category</p>
				<button
					onclick={() => selectedCategory = 'all'}
					class="mt-4 rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
				>
					View All Models
				</button>
			</div>
		{/if}
	</div>
</section>