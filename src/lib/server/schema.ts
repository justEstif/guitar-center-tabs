import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(), // random nanoid
	username: text('username').notNull().unique(),
	pinHash: text('pin_hash').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(), // random token
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const tabs = sqliteTable('tabs', {
	id: text('id').primaryKey(), // random slug e.g. "abc123"
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	artist: text('artist'),
	type: text('type', { enum: ['TAB', 'CHORDS', 'LYRICS'] }).notNull().default('TAB'),
	content: text('content').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export type User = typeof users.$inferSelect;
export type Tab = typeof tabs.$inferSelect;
