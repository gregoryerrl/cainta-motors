/**
 * Smooth scrolling utilities for enhanced user experience
 */

export interface ScrollOptions {
	behavior?: 'smooth' | 'auto';
	block?: 'start' | 'center' | 'end' | 'nearest';
	inline?: 'start' | 'center' | 'end' | 'nearest';
	offset?: number;
}

/**
 * Smoothly scroll to an element by ID
 */
export function scrollToElement(
	elementId: string,
	options: ScrollOptions = {}
): Promise<void> {
	return new Promise((resolve) => {
		const element = document.getElementById(elementId);
		if (!element) {
			console.warn(`Element with ID '${elementId}' not found`);
			resolve();
			return;
		}

		const {
			behavior = 'smooth',
			block = 'start',
			inline = 'nearest',
			offset = 0
		} = options;

		// Calculate the target position with offset
		const elementRect = element.getBoundingClientRect();
		const targetPosition = window.scrollY + elementRect.top + offset;

		// Use smooth scrolling with offset if specified
		if (offset !== 0) {
			window.scrollTo({
				top: targetPosition,
				behavior
			});
		} else {
			element.scrollIntoView({
				behavior,
				block,
				inline
			});
		}

		// Resolve after animation completes (approximate)
		setTimeout(resolve, behavior === 'smooth' ? 800 : 0);
	});
}

/**
 * Smoothly scroll to the next section
 */
export function scrollToNextSection(currentSectionId?: string): void {
	const sections = [
		'hero',
		'showcase',
		'models',
		'gallery',
		'cta'
	];

	if (!currentSectionId) {
		// If no current section, scroll to first section
		scrollToElement(sections[0]);
		return;
	}

	const currentIndex = sections.indexOf(currentSectionId);
	if (currentIndex >= 0 && currentIndex < sections.length - 1) {
		const nextSectionId = sections[currentIndex + 1];
		scrollToElement(nextSectionId);
	}
}

/**
 * Check if smooth scrolling is supported
 */
export function isSmoothScrollSupported(): boolean {
	return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Add scroll padding for fixed headers
 */
export function setScrollPadding(padding: number): void {
	document.documentElement.style.scrollPaddingTop = `${padding}px`;
}