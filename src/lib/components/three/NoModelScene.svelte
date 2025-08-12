<script lang="ts">
	let {
		class: className = ''
	}: {
		class?: string;
	} = $props();
</script>

<div class="{className} flex items-center justify-center border border-gray-800 bg-white/6">
	<div class="text-center">
		<div class="mb-4">
			<svg
				class="mx-auto h-12 w-12 text-gray-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				></path>
			</svg>
		</div>
		<h3 class="mb-2 text-lg font-thin tracking-wider text-gray-500 uppercase">3D Model</h3>
		<p class="text-sm font-thin tracking-widest text-gray-600 uppercase">Not Available</p>
		<p class="mt-2 text-xs font-thin text-gray-700">View photos in the gallery below</p>
	</div>
</div>
