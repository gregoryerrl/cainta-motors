<script lang="ts">
	import { Zap, Shield, Gauge, Wifi, Car, Award } from 'lucide-svelte';

	const features = [
		{
			icon: Gauge,
			title: 'Performance',
			description: '1.5L VTEC Turbo engine delivering exceptional power and efficiency'
		},
		{
			icon: Shield,
			title: 'Safety First',
			description: 'Honda SENSING suite with advanced driver assistance systems'
		},
		{
			icon: Zap,
			title: 'Fuel Efficiency',
			description: 'Outstanding fuel economy without compromising performance'
		},
		{
			icon: Wifi,
			title: 'Connected',
			description: 'Smart connectivity with Apple CarPlay and Android Auto'
		},
		{
			icon: Car,
			title: 'Spacious Interior',
			description: 'Best-in-class cabin space with premium materials'
		},
		{
			icon: Award,
			title: 'Award Winning',
			description: 'Multiple awards for design, safety, and reliability'
		}
	];
</script>

<section class="bg-gray-900 py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-4xl font-bold text-white md:text-5xl">
				Engineered for Excellence
			</h2>
			<p class="mt-4 text-xl text-gray-400">
				Every detail crafted to deliver an exceptional driving experience
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<div class="group relative overflow-hidden rounded-lg bg-gray-800 p-8 transition-all hover:bg-gray-700">
					<div class="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
					<div class="relative">
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10">
							<svelte:component this={feature.icon} class="h-6 w-6 text-red-500" />
						</div>
						<h3 class="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
						<p class="mt-2 text-gray-400">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>