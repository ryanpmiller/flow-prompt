import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: './postcss.config.js',
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5173,
		open: true,
		proxy: {
			'/api/openai': {
				target: 'https://api.openai.com/v1',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/openai/, ''),
				headers: {
					Origin: 'http://localhost:5174',
				},
			},
			'/api/anthropic': {
				target: 'https://api.anthropic.com/v1',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
				headers: {
					Origin: 'http://localhost:5174',
				},
			},
			// Add real-time data source proxies
			'/api/weather': {
				target: 'https://api.openweathermap.org/data/2.5',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/weather/, ''),
			},
			'/api/news': {
				target: 'https://newsapi.org/v2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/news/, ''),
			},
			'/api/stocks': {
				target: 'https://api.polygon.io/v2',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/stocks/, ''),
			},
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
});
