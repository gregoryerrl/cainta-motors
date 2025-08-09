<script lang="ts">
	import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-svelte';
</script>

<footer class="bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center space-x-3">
					<div class="flex h-8 w-8 items-center justify-center border border-red-900">
						<span class="text-sm font-light text-white">CM</span>
					</div>
					<span class="text-sm font-light tracking-[0.2em] text-white">CAINTA MOTORS</span>
				</div>
				<p class="mt-4 text-sm font-thin text-gray-500">
					Premium automotive excellence. Experience luxury, performance, and innovation with our
					carefully curated selection of vehicles.
				</p>
				<div class="mt-6 flex space-x-4">
					<a href="#" class="text-gray-400 hover:text-white">
						<Facebook class="h-5 w-5" />
					</a>
					<a href="#" class="text-gray-400 hover:text-white">
						<Instagram class="h-5 w-5" />
					</a>
					<a href="#" class="text-gray-400 hover:text-white">
						<Twitter class="h-5 w-5" />
					</a>
					<a href="#" class="text-gray-400 hover:text-white">
						<Youtube class="h-5 w-5" />
					</a>
				</div>
			</div>

			<div>
				<h3 class="text-xs font-light uppercase tracking-[0.2em] text-gray-400">QUICK LINKS</h3>
				<ul class="mt-4 space-y-2">
					<li>
						<a href="/models" class="text-sm font-thin text-gray-500 hover:text-white">Our Models</a>
					</li>
					<li>
						<a href="/configurator" class="text-sm font-thin text-gray-500 hover:text-white">Configurator</a>
					</li>
					<li>
						<a href="/about" class="text-sm font-thin text-gray-500 hover:text-white">About Us</a>
					</li>
					<li>
						<a href="/contact" class="text-sm font-thin text-gray-500 hover:text-white">Contact</a>
					</li>
					<li>
						<a href="#" class="text-sm font-thin text-gray-500 hover:text-white">Financing</a>
					</li>
					<li>
						<a href="#" class="text-sm font-thin text-gray-500 hover:text-white">Service</a>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-xs font-light uppercase tracking-[0.2em] text-gray-400">CONTACT INFO</h3>
				<ul class="mt-4 space-y-3">
					<li class="flex items-start space-x-2">
						<MapPin class="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
						<span class="text-sm font-thin text-gray-500">
							123 Main Street<br />
							Cainta, Rizal 1900<br />
							Philippines
						</span>
					</li>
					<li class="flex items-center space-x-2">
						<Phone class="h-4 w-4 flex-shrink-0 text-gray-600" />
						<span class="text-sm font-thin text-gray-500">+63 123 456 7890</span>
					</li>
					<li class="flex items-center space-x-2">
						<Mail class="h-4 w-4 flex-shrink-0 text-gray-600" />
						<span class="text-sm font-thin text-gray-500">info@caintamotors.com</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-800 pt-8">
			<p class="text-center text-xs font-thin text-gray-600">
				© {new Date().getFullYear()} Cainta Motors. All rights reserved. | Privacy Policy | Terms of Service
			</p>
		</div>
	</div>
</footer>