import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'GC Tabs',
				short_name: 'GC Tabs',
				description: 'Share guitar tabs with your students',
				theme_color: '#d97706', // amber-600
				background_color: '#fffbeb', // amber-50
				display: 'standalone',
				scope: '/',
				start_url: '/',
				orientation: 'portrait',
				icons: [
					{
						src: '/icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				// Only cache client-side assets — app is SSR (adapter-vercel), no prerendered pages
			globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest}'],
				// Don't precache server-rendered pages (adapter-vercel / SSR)
				navigateFallback: undefined
			}
		})
	]
});
