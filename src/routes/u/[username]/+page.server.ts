import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, tabs } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
	const profileUser = await db.query.users.findFirst({
		where: eq(users.username, params.username)
	});

	if (!profileUser) error(404, 'User not found');

	const userTabs = await db
		.select()
		.from(tabs)
		.where(eq(tabs.userId, profileUser.id))
		.orderBy(tabs.updatedAt);

	return {
		profileUser: { id: profileUser.id, username: profileUser.username },
		tabs: userTabs,
		isOwner: locals.user?.id === profileUser.id
	};
};
