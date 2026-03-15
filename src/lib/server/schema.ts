import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull().unique(),
	pinHash: text('pin_hash').notNull(),
	createdAt: timestamp('created_at').notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull()
});

export const tabs = pgTable('tabs', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	artist: text('artist'),
	type: text('type').$type<'TAB' | 'CHORDS' | 'LYRICS'>().notNull().default('TAB'),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export type User = typeof users.$inferSelect;
export type Tab = typeof tabs.$inferSelect;
