import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import path from 'path'

export default defineConfig({
	plugins: [react(), eslintPlugin()],
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks')
		}
	}
})
