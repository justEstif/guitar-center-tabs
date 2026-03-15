import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tabs } from '$lib/server/schema';
import { tabId } from '$lib/utils';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/login');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) redirect(302, '/login');

		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const artist = (data.get('artist') as string)?.trim() || null;
		const type = (data.get('type') as string) ?? 'TAB';
		const content = (data.get('content') as string)?.trim();

		if (!title) return fail(400, { error: 'Title is required.' });
		if (!content) return fail(400, { error: 'Tab content is required.' });
		if (!['TAB', 'CHORDS', 'LYRICS'].includes(type)) return fail(400, { error: 'Invalid type.' });

		const id = tabId();
		const now = new Date();

		await db.insert(tabs).values({
			id,
			userId: locals.user.id,
			title,
			artist,
			type: type as 'TAB' | 'CHORDS' | 'LYRICS',
			content,
			createdAt: now,
			updatedAt: now
		});

		redirect(302, `/tab/${id}`);
	}
};
