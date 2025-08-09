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

<article class="group relative border border-gray-800 bg-black transition-all hover:border-gray-600">
	<div class="aspect-[4/3] overflow-hidden">
		<img
			src={vehicle.image}
			alt="{vehicle.brand} {vehicle.model} {vehicle.variant}"
			class="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-80"
		/>
	</div>
	
	<div class="p-6">
		<div class="mb-2 text-xs font-light tracking-widest text-red-900">{vehicle.category.toUpperCase()}</div>
		<h3 class="text-xl font-thin text-white">
			{vehicle.brand} {vehicle.model}
		</h3>
		<p class="text-sm font-thin text-gray-500">{vehicle.variant}</p>
		
		<div class="mt-6 flex items-end justify-between">
			<div>
				<p class="text-xs font-thin text-gray-600">Starting from</p>
				<p class="text-2xl font-thin text-white">{formatPrice(vehicle.price)}</p>
			</div>
			
			<a
				href="/models/{vehicle.slug}"
				class="flex items-center gap-2 text-xs font-light tracking-wider text-gray-500 transition-colors hover:text-white"
			>
				VIEW DETAILS
				<ArrowRight class="h-3 w-3" />
			</a>
		</div>
	</div>
</article>