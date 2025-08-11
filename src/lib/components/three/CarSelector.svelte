<script lang="ts">
	import Car1Generated from './Car1Generated.svelte';
	import Car2Generated from './Car2Generated.svelte';
	
	let { 
		selectedCar = 'car1',
		selectedColor = '#0000FF',
		accessory = 0
	}: { 
		selectedCar: string;
		selectedColor: string;
		accessory: number;
	} = $props();
</script>

{#if selectedCar === 'car1'}
	<Car1Generated {selectedColor} {accessory} />
{:else if selectedCar === 'car2'}
	<Car2Generated {selectedColor} {accessory} />
{/if}