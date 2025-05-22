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
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
});
