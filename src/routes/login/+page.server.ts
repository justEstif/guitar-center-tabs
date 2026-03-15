import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { verifyPin, createSession, setSessionCookie } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = (data.get('username') as string)?.trim().toLowerCase();
		const pin = data.get('pin') as string;

		if (!username || !pin) {
			return fail(400, { error: 'Username and PIN are required.' });
		}

		const user = await db.query.users.findFirst({ where: eq(users.username, username) });

		// Use constant-time comparison to avoid user enumeration
		const valid = user ? await verifyPin(pin, user.pinHash) : await verifyPin(pin, '$2a$10$invalidhashpadding000000000000000000000000000000000000000');

		if (!user || !valid) {
			return fail(400, { error: 'Incorrect username or PIN.' });
		}

		const token = await createSession(user.id);
		setSessionCookie(event, token);

		redirect(302, `/u/${user.username}`);
	}
};
