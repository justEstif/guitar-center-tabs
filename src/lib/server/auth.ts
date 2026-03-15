import { db } from './db';
import { sessions, users } from './schema';
import { eq, lt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { nanoid } from '$lib/utils';
import type { RequestEvent } from '@sveltejs/kit';

const SESSION_COOKIE = 'session';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// --- PIN ---

export async function hashPin(pin: string): Promise<string> {
	return bcrypt.hash(pin, 10);
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
	return bcrypt.compare(pin, hash);
}

// --- Session ---

export async function createSession(userId: string): Promise<string> {
	const id = nanoid(32);
	const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
	await db.insert(sessions).values({ id, userId, expiresAt });
	return id;
}

export async function getSessionUser(sessionId: string) {
	const session = await db.query.sessions.findFirst({
		where: eq(sessions.id, sessionId)
	});

	if (!session) return null;
	if (session.expiresAt < new Date()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return null;
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, session.userId)
	});

	return user ?? null;
}

export async function deleteSession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

// --- Cookie helpers ---

export function setSessionCookie(event: RequestEvent, token: string) {
	event.cookies.set(SESSION_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: SESSION_DURATION_MS / 1000
	});
}

export function clearSessionCookie(event: RequestEvent) {
	event.cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function getSessionToken(event: RequestEvent): string | undefined {
	return event.cookies.get(SESSION_COOKIE);
}

export async function purgeExpiredSessions() {
	await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}
