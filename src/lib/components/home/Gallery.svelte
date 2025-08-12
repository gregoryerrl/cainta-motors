<script lang="ts">
	import { ChevronLeft, ChevronRight, Expand } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';

	let currentIndex = $state(0);
	let autoScrollInterval: ReturnType<typeof setInterval> | null = null;

	const images = [
		{
			src: '/honda/honda_front.jpg',
			alt: 'Honda City RS Front View',
			title: 'Bold Front Design'
		},
		{
			src: '/honda/honda4.jpg',
			alt: 'Honda City RS Side Profile',
			title: 'Sleek Profile'
		},
		{
			src: '/honda/honda2.jpg',
			alt: 'Honda City RS Rear View',
			title: 'Dynamic Rear'
		},
		{
			src: '/honda/honda1.jpg',
			alt: 'Honda City RS Interior',
			title: 'Premium Interior'
		},
		{
			src: '/honda/honda6.jpg',
			alt: 'Honda City RS Dashboard',
			title: 'Advanced Dashboard'
		},
		{
			src: '/honda/honda5.jpg',
			alt: 'Honda City RS Seats',
			title: 'Comfort Redefined'
		}
	];

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function selectImage(index: number) {
		currentIndex = index;
		// Reset auto-scroll timer when user manually selects
		resetAutoScroll();
	}

	function startAutoScroll() {
		autoScrollInterval = setInterval(() => {
			nextImage();
		}, 7000); // 3 seconds
	}

	function stopAutoScroll() {
		if (autoScrollInterval) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = null;
		}
	}

	function resetAutoScroll() {
		stopAutoScroll();
		startAutoScroll();
	}

	onMount(() => {
		startAutoScroll();
	});

	onDestroy(() => {
		stopAutoScroll();
	});
</script>

<section class="bg-black py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div>
			<div class="relative overflow-hidden rounded-lg bg-white/6" style="contain: layout;">
				<div class="relative aspect-video" style="contain: layout style;">
					{#each images as image, index}
						{#if index === currentIndex}
							<img
								src={image.src}
								alt={image.alt}
								class="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
								in:fade={{ duration: 600, delay: 100 }}
								out:fade={{ duration: 300 }}
							/>
						{/if}
					{/each}

					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

					<div class="absolute bottom-0 left-0 p-8">
						{#each images as image, index}
							{#if index === currentIndex}
								<h3
									class="text-3xl font-thin text-white"
									in:fade={{ duration: 600, delay: 200 }}
									out:fade={{ duration: 200 }}
								>
									{image.title}
								</h3>
							{/if}
						{/each}
					</div>

					<button
						type="button"
						onclick={(e) => {
							e.preventDefault();
							prevImage();
							resetAutoScroll();
						}}
						class="absolute top-1/2 left-4 -translate-y-1/2 scale-90 cursor-pointer p-3 font-light transition-all hover:scale-120 hover:font-black"
					>
						<ChevronLeft class="h-6 w-6 text-white" />
					</button>

					<button
						type="button"
						onclick={(e) => {
							e.preventDefault();
							nextImage();
							resetAutoScroll();
						}}
						class="absolute top-1/2 right-4 -translate-y-1/2 scale-90 cursor-pointer p-3 font-light transition-all hover:scale-120 hover:font-black"
					>
						<ChevronRight class="h-6 w-6 text-white" />
					</button>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-0 sm:grid-cols-6">
				{#each images as image, index}
					<button
						type="button"
						onclick={(e) => {
							e.preventDefault();
							selectImage(index);
						}}
						class="relative aspect-video overflow-hidden border transition-all {currentIndex ===
						index
							? 'border-2 border-red-900'
							: 'border border-gray-800 opacity-60 hover:border-gray-600 hover:opacity-100'}"
					>
						<img
							src={image.src}
							alt={image.alt}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>
