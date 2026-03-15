import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { hashPin, createSession, setSessionCookie } from '$lib/server/auth';
import { userId } from '$lib/utils';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = (data.get('username') as string)?.trim().toLowerCase();
		const pin = data.get('pin') as string;

		// Validate
		if (!username || !/^[a-z0-9_]{3,20}$/.test(username)) {
			return fail(400, { error: 'Username must be 3–20 characters: letters, numbers, underscores only.' });
		}
		if (!pin || !/^\d{4}$/.test(pin)) {
			return fail(400, { error: 'PIN must be exactly 4 digits.' });
		}

		// Check username taken
		const existing = await db.query.users.findFirst({ where: eq(users.username, username) });
		if (existing) {
			return fail(400, { error: 'That username is already taken.' });
		}

		// Create user
		const pinHash = await hashPin(pin);
		const id = userId();
		await db.insert(users).values({ id, username, pinHash, createdAt: new Date() });

		// Create session
		const token = await createSession(id);
		setSessionCookie(event, token);

		redirect(302, `/u/${username}`);
	}
};
