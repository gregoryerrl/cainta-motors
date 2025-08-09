<script lang="ts">
	import { ChevronLeft, ChevronRight, Expand } from 'lucide-svelte';

	let currentIndex = $state(0);

	const images = [
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Front',
			alt: 'Honda City RS Front View',
			title: 'Bold Front Design'
		},
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Side',
			alt: 'Honda City RS Side Profile',
			title: 'Sleek Profile'
		},
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Rear',
			alt: 'Honda City RS Rear View',
			title: 'Dynamic Rear'
		},
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Interior',
			alt: 'Honda City RS Interior',
			title: 'Premium Interior'
		},
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Dashboard',
			alt: 'Honda City RS Dashboard',
			title: 'Advanced Dashboard'
		},
		{
			src: 'https://via.placeholder.com/1920x1080/1a1a1a/ef4444?text=Honda+City+RS+Seats',
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
	}
</script>

<section class="bg-black py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-4xl font-thin text-white md:text-5xl">Gallery</h2>
			<p class="mt-4 text-lg font-thin text-gray-500">Explore every angle of perfection</p>
		</div>

		<div class="mt-12">
			<div class="relative overflow-hidden rounded-lg bg-white/6">
				<div class="relative aspect-video">
					<img
						src={images[currentIndex].src}
						alt={images[currentIndex].alt}
						class="h-full w-full object-cover"
					/>

					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

					<div class="absolute bottom-0 left-0 p-8">
						<h3 class="text-3xl font-thin text-white">{images[currentIndex].title}</h3>
					</div>

					<button
						onclick={prevImage}
						class="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer p-3 font-light backdrop-blur-sm transition-all hover:scale-120 hover:font-black"
					>
						<ChevronLeft class="h-6 w-6 text-white" />
					</button>

					<button
						onclick={nextImage}
						class="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer p-3 font-light backdrop-blur-sm transition-all hover:scale-120 hover:font-black"
					>
						<ChevronRight class="h-6 w-6 text-white" />
					</button>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
				{#each images as image, index}
					<button
						onclick={() => selectImage(index)}
						class="relative aspect-video overflow-hidden border transition-all {currentIndex ===
						index
							? 'border-2 border-red-900'
							: 'border border-gray-800 opacity-60 hover:border-gray-600 hover:opacity-100'}"
					>
						<img src={image.src} alt={image.alt} class="h-full w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>
