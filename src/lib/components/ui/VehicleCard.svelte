<script lang="ts">
	import type { Vehicle } from '$lib/data/vehicles';
	import { ArrowRight } from 'lucide-svelte';

	let { vehicle }: { vehicle: Vehicle } = $props();

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 0
		}).format(price);
	};
</script>

<article class="group relative overflow-hidden rounded-lg bg-gray-900 transition-all hover:scale-105">
	<div class="aspect-[4/3] overflow-hidden">
		<img
			src={vehicle.image}
			alt="{vehicle.brand} {vehicle.model} {vehicle.variant}"
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
	</div>
	
	<div class="p-6">
		<div class="mb-2 text-sm font-medium text-red-500">{vehicle.category.toUpperCase()}</div>
		<h3 class="text-2xl font-bold text-white">
			{vehicle.brand} {vehicle.model}
		</h3>
		<p class="text-lg text-gray-400">{vehicle.variant}</p>
		
		<div class="mt-4 flex items-center justify-between">
			<div>
				<p class="text-sm text-gray-500">Starting from</p>
				<p class="text-2xl font-bold text-white">{formatPrice(vehicle.price)}</p>
			</div>
			
			<a
				href="/models/{vehicle.slug}"
				class="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
			>
				View Details
				<ArrowRight class="h-4 w-4" />
			</a>
		</div>
	</div>
</article>