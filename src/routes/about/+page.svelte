<script lang="ts">
	import { Users, Target, Award, Globe } from 'lucide-svelte';

	const stats = [
		{ label: 'Years of Excellence', value: '15+' },
		{ label: 'Happy Customers', value: '10,000+' },
		{ label: 'Vehicles Sold', value: '25,000+' },
		{ label: 'Service Centers', value: '12' }
	];

	const values = [
		{
			icon: Users,
			title: 'Customer First',
			description:
				'We prioritize our customers needs and satisfaction above all else, ensuring exceptional service at every touchpoint.'
		},
		{
			icon: Target,
			title: 'Innovation',
			description:
				'Continuously pushing boundaries in automotive technology and customer experience to stay ahead of the curve.'
		},
		{
			icon: Award,
			title: 'Excellence',
			description:
				'Committed to delivering only the highest quality vehicles and services that exceed expectations.'
		},
		{
			icon: Globe,
			title: 'Sustainability',
			description:
				'Working towards a greener future with eco-friendly practices and fuel-efficient vehicle options.'
		}
	];
</script>

<svelte:head>
	<title>About Us - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden border border-red-900 bg-gradient-to-br from-red-900/30 to-red-900/10 p-12 text-center"
		>
			<div class="absolute inset-0 bg-black/20" />
			<div class="relative">
				<h1 class="text-5xl font-thin text-white md:text-6xl">About Cainta Motors</h1>
				<p class="mx-auto mt-6 max-w-3xl text-lg font-thin text-white/90">
					For over 15 years, we've been the premier destination for automotive excellence in the
					Philippines, delivering world-class vehicles and unmatched customer service.
				</p>
			</div>
		</div>

		<div class="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat}
				<div class="text-center">
					<p class="text-4xl font-thin text-red-900">{stat.value}</p>
					<p class="mt-2 font-thin text-gray-500">{stat.label}</p>
				</div>
			{/each}
		</div>

		<div class="mt-20">
			<h2 class="text-center text-4xl font-thin text-white">Our Story</h2>
			<div class="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
				<div class="space-y-6 font-thin text-gray-400">
					<p>
						Founded in 2009, Cainta Motors began as a small family-owned dealership with a simple
						vision: to provide the Filipino community with access to premium vehicles and
						exceptional service. What started as a single showroom in Cainta, Rizal, has grown into
						one of the most trusted automotive brands in the region.
					</p>
					<p>
						Our journey has been marked by continuous growth and innovation. We've expanded our
						network to 12 service centers across Metro Manila and surrounding provinces, each
						equipped with state-of-the-art facilities and staffed by certified technicians who share
						our passion for automotive excellence.
					</p>
					<p>
						Today, we're proud to represent some of the world's leading automotive brands, offering
						a diverse range of vehicles that cater to every lifestyle and budget. From
						fuel-efficient city cars to powerful SUVs and luxury sedans, our carefully curated
						selection ensures that every customer finds their perfect match.
					</p>
				</div>
				<div class="aspect-video overflow-hidden border border-gray-800 bg-white/6">
					<img
						src="https://via.placeholder.com/800x600/1a1a1a/ef4444?text=Cainta+Motors+Showroom"
						alt="Cainta Motors Showroom"
						class="h-full w-full object-cover"
					/>
				</div>
			</div>
		</div>

		<div class="mt-20">
			<h2 class="text-center text-4xl font-thin text-white">Our Values</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each values as value}
					<div class="border border-gray-800 bg-white/6 p-6 text-center">
						<div
							class="mx-auto flex h-16 w-16 items-center justify-center border border-red-900/30 bg-red-900/10"
						>
							<svelte:component this={value.icon} class="h-8 w-8 text-red-900" />
						</div>
						<h3 class="mt-4 text-xl font-light text-white">{value.title}</h3>
						<p class="mt-2 font-thin text-gray-500">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="mt-20 border border-gray-800 bg-white/6 p-12 text-center">
			<h2 class="text-3xl font-thin text-white">Ready to Experience the Difference?</h2>
			<p class="mt-4 text-lg font-thin text-gray-500">
				Visit our showroom today and discover why thousands choose Cainta Motors
			</p>
			<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a
					href="/contact"
					class="border border-red-900 px-8 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
				>
					Get in Touch
				</a>
				<a
					href="/models"
					class="border border-gray-700 px-8 py-3 text-xs font-light tracking-widest text-gray-400 uppercase transition-all hover:border-white hover:text-white"
				>
					Browse Our Models
				</a>
			</div>
		</div>
	</div>
</section>
