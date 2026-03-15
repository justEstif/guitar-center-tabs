import type { Handle } from '@sveltejs/kit';
import { getSessionToken, getSessionUser } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const token = getSessionToken(event);
	event.locals.user = token ? await getSessionUser(token) : null;
	return resolve(event);
};
