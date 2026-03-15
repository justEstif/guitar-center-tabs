import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSession, clearSessionCookie, getSessionToken } from '$lib/server/auth';

export const actions: Actions = {
	default: async (event) => {
		const token = getSessionToken(event);
		if (token) await deleteSession(token);
		clearSessionCookie(event);
		redirect(302, '/login');
	}
};
