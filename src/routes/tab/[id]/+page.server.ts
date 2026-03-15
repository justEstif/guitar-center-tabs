import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { tabs, users } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	const tab = await db.query.tabs.findFirst({
		where: eq(tabs.id, params.id)
	});

	if (!tab) error(404, 'Tab not found');

	const author = await db.query.users.findFirst({
		where: eq(users.id, tab.userId)
	});

	return {
		tab,
		author: { username: author?.username ?? 'unknown' },
		isOwner: locals.user?.id === tab.userId
	};
};
