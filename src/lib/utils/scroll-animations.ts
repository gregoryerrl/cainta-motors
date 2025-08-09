/**
 * Scroll-driven animation utilities for enhanced UX
 */

export interface ScrollAnimationOptions {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
}

/**
 * Create a parallax effect based on scroll position
 */
export function createParallaxEffect(element: HTMLElement, speed: number = 0.5) {
	let ticking = false;

	function updateParallax() {
		const rect = element.getBoundingClientRect();
		const scrolled = window.scrollY;
		const rate = scrolled * speed;
		
		// Only apply parallax when element is in viewport
		if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
			element.style.transform = `translate3d(0, ${rate}px, 0)`;
		}
		
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(updateParallax);
			ticking = true;
		}
	}

	// Use passive listener for better performance
	window.addEventListener('scroll', onScroll, { passive: true });

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
		}
	};
}

/**
 * Fade in elements as they come into view
 */
export function createFadeInOnScroll(
	element: HTMLElement, 
	options: ScrollAnimationOptions = {}
) {
	const { threshold = 0.1, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fade-in-visible');
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					entry.target.classList.remove('fade-in-visible');
				}
			});
		},
		{ threshold, rootMargin }
	);

	// Set initial state
	element.classList.add('fade-in-hidden');
	observer.observe(element);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Scale elements as they come into view
 */
export function createScaleOnScroll(
	element: HTMLElement,
	options: ScrollAnimationOptions = {}
) {
	const { threshold = 0.2, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('scale-in-visible');
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					entry.target.classList.remove('scale-in-visible');
				}
			});
		},
		{ threshold, rootMargin }
	);

	element.classList.add('scale-in-hidden');
	observer.observe(element);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Slide in elements from different directions
 */
export function createSlideInOnScroll(
	element: HTMLElement,
	direction: 'left' | 'right' | 'up' | 'down' = 'up',
	options: ScrollAnimationOptions = {}
) {
	const { threshold = 0.1, rootMargin = '0px', once = true } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('slide-in-visible');
					if (once) {
						observer.unobserve(entry.target);
					}
				} else if (!once) {
					entry.target.classList.remove('slide-in-visible');
				}
			});
		},
		{ threshold, rootMargin }
	);

	element.classList.add('slide-in-hidden', `slide-in-${direction}`);
	observer.observe(element);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Progress bar based on scroll position
 */
export function createScrollProgressBar(element: HTMLElement) {
	function updateProgress() {
		const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
		element.style.transform = `scaleX(${Math.min(scrollPercent, 100)}%)`;
	}

	window.addEventListener('scroll', updateProgress, { passive: true });
	updateProgress(); // Initial call

	return {
		destroy() {
			window.removeEventListener('scroll', updateProgress);
		}
	};
}