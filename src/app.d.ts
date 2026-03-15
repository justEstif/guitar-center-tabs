import type { User } from '$lib/server/schema';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
		}
	}
}

export {};

