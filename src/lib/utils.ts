import { customAlphabet } from 'nanoid';

// Short random ID for tab slugs (e.g. "abc123")
const tabAlphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
export const nanoid = customAlphabet(tabAlphabet);
export const tabId = () => nanoid(8);
export const userId = () => nanoid(16);
