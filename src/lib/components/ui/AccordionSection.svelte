<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ChevronDown } from 'lucide-svelte';

	let {
		title = '',
		isExpanded = $bindable(false),
		children
	}: {
		title: string;
		isExpanded: boolean;
		children: any;
	} = $props();

	function toggleAccordion() {
		isExpanded = !isExpanded;
	}
</script>

<div class="overflow-hidden border border-gray-800 bg-white/6">
	<!-- Accordion Header -->
	<button
		onclick={toggleAccordion}
		class="flex w-full items-center justify-between p-6 text-left transition-all hover:bg-white/8"
	>
		<h3 class="text-lg font-light tracking-widest text-white uppercase">
			{title}
		</h3>
		<ChevronDown
			class="h-4 w-4 text-gray-400 transition-transform duration-200 {isExpanded
				? 'rotate-180'
				: ''}"
		/>
	</button>

	<!-- Accordion Content -->
	{#if isExpanded}
		<div transition:slide={{ duration: 300 }} class="border-t border-gray-800/50 p-6">
			{@render children()}
		</div>
	{/if}
</div>
