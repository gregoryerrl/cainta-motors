<script lang="ts">
	import Scene from '$lib/components/three/Scene.svelte';
	import { vehicles } from '$lib/data/vehicles';
	import { Check, Download, Share2 } from 'lucide-svelte';

	let selectedVehicle = $state(vehicles[0]);
	let selectedColor = $state(selectedVehicle.colors[0]);
	let selectedOptions = $state({
		wheels: 'standard',
		interior: 'black',
		package: 'standard'
	});

	const wheelOptions = [
		{ id: 'standard', name: '17" Alloy Wheels', price: 0 },
		{ id: 'sport', name: '18" Sport Wheels', price: 45000 },
		{ id: 'premium', name: '19" Premium Wheels', price: 75000 }
	];

	const interiorOptions = [
		{ id: 'black', name: 'Black Leather', price: 0 },
		{ id: 'beige', name: 'Beige Leather', price: 15000 },
		{ id: 'red', name: 'Red Sport Leather', price: 25000 }
	];

	const packageOptions = [
		{ id: 'standard', name: 'Standard', price: 0, features: ['Basic Audio', 'Manual Seats'] },
		{ id: 'premium', name: 'Premium', price: 120000, features: ['Premium Audio', 'Power Seats', 'Ambient Lighting'] },
		{ id: 'sport', name: 'Sport', price: 180000, features: ['Sport Suspension', 'Sport Exhaust', 'Track Mode'] }
	];

	const calculateTotal = () => {
		const wheelPrice = wheelOptions.find(w => w.id === selectedOptions.wheels)?.price || 0;
		const interiorPrice = interiorOptions.find(i => i.id === selectedOptions.interior)?.price || 0;
		const packagePrice = packageOptions.find(p => p.id === selectedOptions.package)?.price || 0;
		return selectedVehicle.price + wheelPrice + interiorPrice + packagePrice;
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 0
		}).format(price);
	};
</script>

<svelte:head>
	<title>Configure Your Car - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<h1 class="text-center text-4xl font-bold text-white md:text-5xl">
			Configure Your Dream Car
		</h1>
		<p class="mt-4 text-center text-xl text-gray-400">
			Customize every detail to match your style
		</p>

		<div class="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="aspect-video overflow-hidden rounded-lg bg-gray-900">
					<Scene class="h-full w-full" />
				</div>

				<div class="mt-8 rounded-lg bg-gray-900 p-6">
					<h2 class="mb-4 text-xl font-semibold text-white">Select Model</h2>
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{#each vehicles as vehicle}
							<button
								onclick={() => {
									selectedVehicle = vehicle;
									selectedColor = vehicle.colors[0];
								}}
								class="rounded-lg border-2 p-4 text-left transition-all {
									selectedVehicle.id === vehicle.id
										? 'border-red-600 bg-red-600/10'
										: 'border-gray-700 hover:border-gray-600'
								}"
							>
								<p class="font-semibold text-white">
									{vehicle.brand} {vehicle.model} {vehicle.variant}
								</p>
								<p class="text-sm text-gray-400">{formatPrice(vehicle.price)}</p>
							</button>
						{/each}
					</div>
				</div>

				<div class="mt-6 rounded-lg bg-gray-900 p-6">
					<h2 class="mb-4 text-xl font-semibold text-white">Exterior Color</h2>
					<div class="flex gap-3">
						{#each selectedVehicle.colors as color}
							<button
								onclick={() => selectedColor = color}
								class="relative h-16 w-16 rounded-full border-2 transition-all {
									selectedColor.hex === color.hex
										? 'border-red-600 scale-110'
										: 'border-gray-600'
								}"
								style="background-color: {color.hex}"
								title={color.name}
							>
								{#if selectedColor.hex === color.hex}
									<Check class="absolute inset-0 m-auto h-8 w-8 {
										color.hex === '#000000' || color.hex === '#4a4a4a' 
											? 'text-white' 
											: 'text-black'
									}" />
								{/if}
							</button>
						{/each}
					</div>
					<p class="mt-3 text-gray-400">{selectedColor.name}</p>
				</div>

				<div class="mt-6 rounded-lg bg-gray-900 p-6">
					<h2 class="mb-4 text-xl font-semibold text-white">Wheels</h2>
					<div class="space-y-3">
						{#each wheelOptions as wheel}
							<label class="flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all {
								selectedOptions.wheels === wheel.id
									? 'border-red-600 bg-red-600/10'
									: 'border-gray-700 hover:border-gray-600'
							}">
								<div class="flex items-center gap-3">
									<input
										type="radio"
										name="wheels"
										value={wheel.id}
										checked={selectedOptions.wheels === wheel.id}
										onchange={() => selectedOptions.wheels = wheel.id}
										class="h-4 w-4 text-red-600"
									/>
									<span class="text-white">{wheel.name}</span>
								</div>
								<span class="text-gray-400">
									{wheel.price > 0 ? `+${formatPrice(wheel.price)}` : 'Included'}
								</span>
							</label>
						{/each}
					</div>
				</div>

				<div class="mt-6 rounded-lg bg-gray-900 p-6">
					<h2 class="mb-4 text-xl font-semibold text-white">Interior</h2>
					<div class="space-y-3">
						{#each interiorOptions as interior}
							<label class="flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all {
								selectedOptions.interior === interior.id
									? 'border-red-600 bg-red-600/10'
									: 'border-gray-700 hover:border-gray-600'
							}">
								<div class="flex items-center gap-3">
									<input
										type="radio"
										name="interior"
										value={interior.id}
										checked={selectedOptions.interior === interior.id}
										onchange={() => selectedOptions.interior = interior.id}
										class="h-4 w-4 text-red-600"
									/>
									<span class="text-white">{interior.name}</span>
								</div>
								<span class="text-gray-400">
									{interior.price > 0 ? `+${formatPrice(interior.price)}` : 'Included'}
								</span>
							</label>
						{/each}
					</div>
				</div>

				<div class="mt-6 rounded-lg bg-gray-900 p-6">
					<h2 class="mb-4 text-xl font-semibold text-white">Package</h2>
					<div class="space-y-3">
						{#each packageOptions as pkg}
							<label class="cursor-pointer rounded-lg border-2 p-4 transition-all {
								selectedOptions.package === pkg.id
									? 'border-red-600 bg-red-600/10'
									: 'border-gray-700 hover:border-gray-600'
							}">
								<div class="flex items-start gap-3">
									<input
										type="radio"
										name="package"
										value={pkg.id}
										checked={selectedOptions.package === pkg.id}
										onchange={() => selectedOptions.package = pkg.id}
										class="mt-1 h-4 w-4 text-red-600"
									/>
									<div class="flex-1">
										<div class="flex items-center justify-between">
											<span class="font-semibold text-white">{pkg.name}</span>
											<span class="text-gray-400">
												{pkg.price > 0 ? `+${formatPrice(pkg.price)}` : 'Included'}
											</span>
										</div>
										<ul class="mt-2 space-y-1">
											{#each pkg.features as feature}
												<li class="text-sm text-gray-500">• {feature}</li>
											{/each}
										</ul>
									</div>
								</div>
							</label>
						{/each}
					</div>
				</div>
			</div>

			<div class="lg:col-span-1">
				<div class="sticky top-24 space-y-6">
					<div class="rounded-lg bg-gray-900 p-6">
						<h2 class="mb-4 text-xl font-semibold text-white">Your Configuration</h2>
						
						<div class="space-y-3 border-b border-gray-800 pb-4">
							<div class="flex justify-between">
								<span class="text-gray-400">Model</span>
								<span class="text-white">
									{selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.variant}
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Color</span>
								<span class="text-white">{selectedColor.name}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Wheels</span>
								<span class="text-white">
									{wheelOptions.find(w => w.id === selectedOptions.wheels)?.name}
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Interior</span>
								<span class="text-white">
									{interiorOptions.find(i => i.id === selectedOptions.interior)?.name}
								</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-400">Package</span>
								<span class="text-white">
									{packageOptions.find(p => p.id === selectedOptions.package)?.name}
								</span>
							</div>
						</div>

						<div class="mt-4">
							<div class="flex justify-between text-2xl font-bold">
								<span class="text-white">Total Price</span>
								<span class="text-red-500">{formatPrice(calculateTotal())}</span>
							</div>
						</div>
					</div>

					<div class="space-y-3">
						<button class="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 font-medium text-white transition-all hover:bg-red-700">
							<Download class="h-5 w-5" />
							Save Configuration
						</button>
						<button class="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-medium text-white transition-all hover:bg-white hover:text-black">
							<Share2 class="h-5 w-5" />
							Share
						</button>
						<a
							href="/contact"
							class="block w-full rounded-full bg-gray-800 px-6 py-3 text-center font-medium text-white transition-all hover:bg-gray-700"
						>
							Contact Dealer
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>