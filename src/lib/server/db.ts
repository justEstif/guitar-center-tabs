import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

function getDb() {
	const url = process.env.POSTGRES_URL;
	if (!url) throw new Error('POSTGRES_URL is not set');
	return drizzle(neon(url), { schema });
}

// Singleton — created on first use, not at module load time
let _db: ReturnType<typeof getDb> | null = null;
export function getDatabase() {
	if (!_db) _db = getDb();
	return _db;
}

export const db = new Proxy({} as ReturnType<typeof getDb>, {
	get(_, prop) {
		return (getDatabase() as Record<string | symbol, unknown>)[prop];
	}
});
