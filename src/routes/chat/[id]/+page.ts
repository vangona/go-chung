import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: { id: string } }) {
	if (params.id === 'error') error(404, 'Not found');

	return {
		id: params.id
	};
}
