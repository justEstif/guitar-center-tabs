import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tabs } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	if (!locals.user) redirect(302, '/login');

	const tab = await db.query.tabs.findFirst({ where: eq(tabs.id, params.id) });
	if (!tab) error(404, 'Tab not found');
	if (tab.userId !== locals.user.id) error(403, 'Not your tab');

	return { tab };
};

export const actions: Actions = {
	save: async ({ request, params, locals }) => {
		if (!locals.user) redirect(302, '/login');

		const tab = await db.query.tabs.findFirst({ where: eq(tabs.id, params.id) });
		if (!tab || tab.userId !== locals.user.id) error(403, 'Not your tab');

		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		const artist = (data.get('artist') as string)?.trim() || null;
		const type = data.get('type') as string;
		const content = (data.get('content') as string)?.trim();

		if (!title) return fail(400, { error: 'Title is required.' });
		if (!content) return fail(400, { error: 'Tab content is required.' });
		if (!['TAB', 'CHORDS', 'LYRICS'].includes(type)) return fail(400, { error: 'Invalid type.' });

		await db.update(tabs)
			.set({ title, artist, type: type as 'TAB' | 'CHORDS' | 'LYRICS', content, updatedAt: new Date() })
			.where(eq(tabs.id, params.id));

		redirect(302, `/tab/${params.id}`);
	},

	delete: async ({ params, locals }) => {
		if (!locals.user) redirect(302, '/login');

		const tab = await db.query.tabs.findFirst({ where: eq(tabs.id, params.id) });
		if (!tab || tab.userId !== locals.user.id) error(403, 'Not your tab');

		await db.delete(tabs).where(eq(tabs.id, params.id));

		redirect(302, `/u/${locals.user.username}`);
	}
};
