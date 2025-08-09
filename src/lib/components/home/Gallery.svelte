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
			<h2 class="text-4xl font-bold text-white md:text-5xl">
				Gallery
			</h2>
			<p class="mt-4 text-xl text-gray-400">
				Explore every angle of perfection
			</p>
		</div>

		<div class="mt-12">
			<div class="relative overflow-hidden rounded-lg bg-gray-900">
				<div class="relative aspect-video">
					<img
						src={images[currentIndex].src}
						alt={images[currentIndex].alt}
						class="h-full w-full object-cover"
					/>
					
					<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
					
					<div class="absolute bottom-0 left-0 p-8">
						<h3 class="text-3xl font-bold text-white">{images[currentIndex].title}</h3>
					</div>

					<button
						onclick={prevImage}
						class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
					>
						<ChevronLeft class="h-6 w-6 text-white" />
					</button>

					<button
						onclick={nextImage}
						class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
					>
						<ChevronRight class="h-6 w-6 text-white" />
					</button>

					<button class="absolute right-4 top-4 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20">
						<Expand class="h-5 w-5 text-white" />
					</button>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
				{#each images as image, index}
					<button
						onclick={() => selectImage(index)}
						class="relative aspect-video overflow-hidden rounded-lg transition-all {currentIndex === index ? 'ring-2 ring-red-600' : 'opacity-60 hover:opacity-100'}"
					>
						<img
							src={image.src}
							alt={image.alt}
							class="h-full w-full object-cover"
						/>
					</button>
				{/each}
			</div>
		</div>
	</div>
</section>