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
				<a href="/" class="flex items-center space-x-3">
					<div class="flex h-8 w-8 items-center justify-center border border-red-900">
						<span class="text-sm font-light text-white">CM</span>
					</div>
					<span class="text-sm font-light tracking-[0.2em] text-white">CAINTA MOTORS</span>
				</a>
			</div>

			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-10">
					{#each navigation as item}
						<a
							href={item.href}
							class="text-xs font-light tracking-widest text-gray-400 transition-colors hover:text-white"
						>
							{item.name.toUpperCase()}
						</a>
					{/each}
					<button
						class="btn-red-fill border border-red-900 px-6 py-2 text-xs font-light tracking-widest text-white"
					>
						TEST DRIVE
					</button>
				</div>
			</div>

			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white md:hidden"
			>
				{#if mobileMenuOpen}
					<X class="h-5 w-5" />
				{:else}
					<Menu class="h-5 w-5" />
				{/if}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div transition:slide={{ duration: 200 }} class="md:hidden">
			<div class="space-y-1 px-4 pt-2 pb-4">
				{#each navigation as item}
					<a
						href={item.href}
						onclick={() => (mobileMenuOpen = false)}
						class="block px-3 py-3 text-sm font-light tracking-widest text-gray-400 hover:text-white"
					>
						{item.name.toUpperCase()}
					</a>
				{/each}
				<button
					class="btn-red-fill mt-4 w-full border border-red-900 px-6 py-3 text-sm font-light tracking-widest text-white"
				>
					TEST DRIVE
				</button>
			</div>
		</div>
	{/if}
</header>
