<script lang="ts">
	import { MapPin, Phone, Mail, Clock, Send } from 'lucide-svelte';

	let formData = $state({
		name: '',
		email: '',
		phone: '',
		subject: 'general',
		message: ''
	});

	let submitted = $state(false);

	function handleSubmit(e: Event) {
		e.preventDefault();
		console.log('Form submitted:', formData);
		submitted = true;
		setTimeout(() => {
			submitted = false;
			formData = {
				name: '',
				email: '',
				phone: '',
				subject: 'general',
				message: ''
			};
		}, 3000);
	}
</script>

<svelte:head>
	<title>Contact Us - Cainta Motors</title>
</svelte:head>

<section class="min-h-screen bg-black py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-5xl font-thin text-white md:text-6xl">Get in Touch</h1>
			<p class="mt-4 text-lg font-thin text-gray-500">
				We're here to help you find your perfect vehicle
			</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="border border-gray-800 bg-white/6 p-8">
					<h2 class="mb-6 text-2xl font-thin text-white">Send us a Message</h2>

					{#if submitted}
						<div class="border border-green-700 bg-green-600/10 p-6 text-center">
							<p class="text-lg font-thin text-green-500">
								Thank you for your message! We'll get back to you soon.
							</p>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-6">
							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label
										for="name"
										class="block text-xs font-light tracking-wider text-gray-400 uppercase"
									>
										Full Name *
									</label>
									<input
										type="text"
										id="name"
										bind:value={formData.name}
										required
										class="mt-2 w-full border border-gray-700 bg-gray-800 px-4 py-3 font-thin text-white focus:border-red-900 focus:outline-none"
									/>
								</div>
								<div>
									<label
										for="email"
										class="block text-xs font-light tracking-wider text-gray-400 uppercase"
									>
										Email Address *
									</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										required
										class="mt-2 w-full border border-gray-700 bg-gray-800 px-4 py-3 font-thin text-white focus:border-red-900 focus:outline-none"
									/>
								</div>
							</div>

							<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label
										for="phone"
										class="block text-xs font-light tracking-wider text-gray-400 uppercase"
									>
										Phone Number
									</label>
									<input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										class="mt-2 w-full border border-gray-700 bg-gray-800 px-4 py-3 font-thin text-white focus:border-red-900 focus:outline-none"
									/>
								</div>
								<div>
									<label
										for="subject"
										class="block text-xs font-light tracking-wider text-gray-400 uppercase"
									>
										Subject *
									</label>
									<select
										id="subject"
										bind:value={formData.subject}
										required
										class="mt-2 w-full border border-gray-700 bg-gray-800 px-4 py-3 font-thin text-white focus:border-red-900 focus:outline-none"
									>
										<option value="general">General Inquiry</option>
										<option value="sales">Sales Inquiry</option>
										<option value="service">Service Appointment</option>
										<option value="testdrive">Test Drive Request</option>
										<option value="financing">Financing Options</option>
									</select>
								</div>
							</div>

							<div>
								<label
									for="message"
									class="block text-xs font-light tracking-wider text-gray-400 uppercase"
								>
									Message *
								</label>
								<textarea
									id="message"
									bind:value={formData.message}
									required
									rows="5"
									class="mt-2 w-full border border-gray-700 bg-gray-800 px-4 py-3 font-thin text-white focus:border-red-900 focus:outline-none"
								></textarea>
							</div>

							<button
								type="submit"
								class="flex w-full items-center justify-center gap-2 border border-red-900 px-8 py-3 text-xs font-light tracking-widest text-white uppercase transition-all hover:bg-red-900/20"
							>
								<Send class="h-4 w-4" />
								Send Message
							</button>
						</form>
					{/if}
				</div>
			</div>

			<div class="space-y-6">
				<div class="border border-gray-800 bg-white/6 p-6">
					<h3 class="mb-4 text-xl font-thin text-white">Contact Information</h3>
					<div class="space-y-4">
						<div class="flex items-start gap-3">
							<MapPin class="mt-1 h-5 w-5 flex-shrink-0 text-red-900" />
							<div>
								<p class="font-light text-white">Main Showroom</p>
								<p class="text-sm font-thin text-gray-500">
									123 Main Street<br />
									Cainta, Rizal 1900<br />
									Philippines
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Phone class="mt-1 h-5 w-5 flex-shrink-0 text-red-900" />
							<div>
								<p class="font-light text-white">Phone</p>
								<p class="text-sm font-thin text-gray-500">+63 123 456 7890</p>
								<p class="text-sm font-thin text-gray-500">+63 987 654 3210</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Mail class="mt-1 h-5 w-5 flex-shrink-0 text-red-900" />
							<div>
								<p class="font-light text-white">Email</p>
								<p class="text-sm font-thin text-gray-500">info@caintamotors.com</p>
								<p class="text-sm font-thin text-gray-500">sales@caintamotors.com</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<Clock class="mt-1 h-5 w-5 flex-shrink-0 text-red-900" />
							<div>
								<p class="font-light text-white">Business Hours</p>
								<p class="text-sm font-thin text-gray-500">Monday - Friday: 9:00 AM - 7:00 PM</p>
								<p class="text-sm font-thin text-gray-500">Saturday: 9:00 AM - 6:00 PM</p>
								<p class="text-sm font-thin text-gray-500">Sunday: 10:00 AM - 5:00 PM</p>
							</div>
						</div>
					</div>
				</div>

				<div class="border border-gray-800 bg-white/6 p-6">
					<h3 class="mb-4 text-xl font-thin text-white">Quick Links</h3>
					<div class="space-y-3">
						<a
							href="/models"
							class="block text-sm font-thin text-gray-500 transition-colors hover:text-white"
						>
							Browse Our Models →
						</a>
						<a
							href="/configurator"
							class="block text-sm font-thin text-gray-500 transition-colors hover:text-white"
						>
							Build Your Car →
						</a>
						<a
							href="#"
							class="block text-sm font-thin text-gray-500 transition-colors hover:text-white"
						>
							Schedule Service →
						</a>
						<a
							href="#"
							class="block text-sm font-thin text-gray-500 transition-colors hover:text-white"
						>
							Financing Calculator →
						</a>
						<a
							href="#"
							class="block text-sm font-thin text-gray-500 transition-colors hover:text-white"
						>
							Download Brochure →
						</a>
					</div>
				</div>

				<div class="overflow-hidden border border-gray-800 bg-white/6">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30890.46364778895!2d121.09876064316406!3d14.58660985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b8f52c4f8b45%3A0x8b3d6f3d0f3d6f3d!2sCainta%2C%20Rizal!5e0!3m2!1sen!2sph!4v1635000000000!5m2!1sen!2sph"
						width="100%"
						height="250"
						style="border:0;"
						allowfullscreen={true}
						loading="lazy"
						title="Cainta Motors Location"
						class="grayscale"
					></iframe>
				</div>
			</div>
		</div>
	</div>
</section>
