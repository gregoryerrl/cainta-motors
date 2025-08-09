import { vehicles } from '$lib/data/vehicles';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const vehicle = vehicles.find((v) => v.slug === params.slug);

	if (!vehicle) {
		error(404, 'Vehicle not found');
	}

	return {
		vehicle
	};
};
