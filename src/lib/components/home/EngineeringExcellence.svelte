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
		<h2 class="text-5xl font-thin text-white lg:text-6xl">
			Engineering<br />
			<span class="text-red-900">Excellence</span>
		</h2>
		<p class="mt-4 text-base font-thin text-gray-500">Where innovation meets precision</p>
	</div>

	<div class="mt-12 grid grid-cols-2 gap-6">
		{#each excellence as item}
			<div class="group relative border border-gray-800 p-6 transition-all hover:border-gray-600">
				<div class="relative">
					<div class="flex h-8 w-8 items-center justify-center border border-red-900/50">
						<svelte:component this={item.icon} class="h-4 w-4 text-red-900" />
					</div>
					<h3 class="mt-4 text-sm font-normal tracking-wider text-gray-400">
						{item.title.toUpperCase()}
					</h3>
					<p class="text-2xl font-thin text-white">{item.metric}</p>
					<p class="text-xs font-medium tracking-wider text-gray-600">{item.detail}</p>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-12">
		<p class="leading-relaxed font-thin text-gray-500">
			Every component meticulously engineered to deliver an uncompromising driving experience.
		</p>
		<div class="mt-8 flex gap-6">
			<a
				href="/models"
				class="border border-red-900 px-8 py-2 text-xs font-light tracking-widest text-white transition-all hover:bg-red-900/20"
			>
				EXPLORE MODELS
			</a>
			<a
				href="/configurator"
				class="px-8 py-2 text-xs font-light tracking-widest text-gray-500 transition-all hover:text-white"
			>
				CONFIGURE
			</a>
		</div>
	</div>
</div>
