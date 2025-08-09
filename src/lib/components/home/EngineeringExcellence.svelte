<script lang="ts">
	import { Gauge, Shield, Zap, Cpu } from 'lucide-svelte';

	const excellence = [
		{
			icon: Gauge,
			title: 'Performance',
			metric: '121 PS',
			detail: 'VTEC Turbo'
		},
		{
			icon: Shield,
			title: 'Safety',
			metric: '5-Star',
			detail: 'Honda SENSING'
		},
		{
			icon: Zap,
			title: 'Efficiency',
			metric: '17.8 km/L',
			detail: 'Fuel Economy'
		},
		{
			icon: Cpu,
			title: 'Technology',
			metric: '7"',
			detail: 'Smart Display'
		}
	];
</script>

<div class="flex h-full flex-col justify-center">
	<div>
		<h2 class="text-5xl font-bold text-white lg:text-6xl">
			Engineering<br />
			<span class="text-red-600">Excellence</span>
		</h2>
		<p class="mt-4 text-lg text-gray-400">
			Where innovation meets precision
		</p>
	</div>

	<div class="mt-12 grid grid-cols-2 gap-4">
		{#each excellence as item}
			<div class="group relative overflow-hidden rounded-lg bg-gray-900/30 p-6 backdrop-blur-sm transition-all hover:bg-gray-800/50">
				<div class="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
				<div class="relative">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-600/10">
						<svelte:component this={item.icon} class="h-5 w-5 text-red-500" />
					</div>
					<h3 class="mt-3 text-base font-semibold text-white">{item.title}</h3>
					<p class="text-2xl font-bold text-red-500">{item.metric}</p>
					<p class="text-xs text-gray-500 uppercase tracking-wider">{item.detail}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-12">
		<p class="text-gray-300 leading-relaxed">
			Every component meticulously engineered to deliver an uncompromising driving experience.
		</p>
		<div class="mt-6 flex gap-4">
			<a
				href="/models"
				class="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700"
			>
				Explore Models
			</a>
			<a
				href="/configurator"
				class="inline-flex items-center gap-2 rounded-full border-2 border-gray-600 px-6 py-3 font-semibold text-gray-300 transition-all hover:border-white hover:text-white"
			>
				Configure
			</a>
		</div>
	</div>
</div>