<script lang="ts">
	interface Color {
		name: string;
		hex: string;
	}

	let {
		colors = [],
		selectedColor = '',
		onColorSelect = (color: Color) => {}
	}: {
		colors: Color[];
		selectedColor: string;
		onColorSelect: (color: Color) => void;
	} = $props();
</script>

<div class="space-y-4">
	<h3 class="text-lg font-light tracking-widest text-white uppercase">Choose Color</h3>

	<div class="grid grid-cols-5 gap-3">
		{#each colors as color}
			<button
				class="group relative aspect-square w-12 rounded-none border-2 transition-all duration-200 {selectedColor ===
				color.hex
					? 'border-white shadow-lg'
					: 'border-gray-600 hover:border-gray-400'}"
				style="background-color: {color.hex}"
				onclick={() => onColorSelect(color)}
				title={color.name}
			>
				<!-- Selected indicator -->
				{#if selectedColor === color.hex}
					<div class="absolute inset-0 flex items-center justify-center">
						<div class="h-4 w-4 rounded-full bg-white/20 backdrop-blur-sm">
							<div class="h-full w-full rounded-full border-2 border-white"></div>
						</div>
					</div>
				{/if}

				<!-- Hover overlay -->
				<div
					class="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"
				></div>
			</button>
		{/each}
	</div>

	<!-- Selected color name -->
	{#if selectedColor}
		{@const selectedColorName = colors.find((c) => c.hex === selectedColor)?.name}
		{#if selectedColorName}
			<p class="text-sm font-light tracking-wider text-gray-400 uppercase">
				{selectedColorName}
			</p>
		{/if}
	{/if}
</div>
