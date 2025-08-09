<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { slide } from 'svelte/transition';

	let mobileMenuOpen = $state(false);

	const navigation = [
		{ name: 'Models', href: '/models' },
		{ name: 'Configurator', href: '/configurator' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<header class="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-md">
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
						<span class="text-xl font-bold text-white">CM</span>
					</div>
					<span class="text-xl font-bold text-white">Cainta Motors</span>
				</a>
			</div>

			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-8">
					{#each navigation as item}
						<a
							href={item.href}
							class="px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
						>
							{item.name}
						</a>
					{/each}
					<button
						class="rounded-full bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
					>
						Schedule Test Drive
					</button>
				</div>
			</div>

			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white md:hidden"
			>
				{#if mobileMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div transition:slide={{ duration: 200 }} class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				{#each navigation as item}
					<a
						href={item.href}
						onclick={() => (mobileMenuOpen = false)}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
					>
						{item.name}
					</a>
				{/each}
				<button
					class="mt-4 w-full rounded-full bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
				>
					Schedule Test Drive
				</button>
			</div>
		</div>
	{/if}
</header>