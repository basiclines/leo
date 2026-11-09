import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: { src: path.resolve(import.meta.dirname, 'src') }
	},
	oxc: {
		jsx: { runtime: 'classic', pragma: 'createElement', pragmaFrag: 'Fragment' }
	},
	test: {
		globals: true,
		environment: 'jsdom',
		environmentOptions: { jsdom: { url: 'http://localhost/' } },
		include: ['tests/unit/**/*_tests.{js,jsx}']
	}
})
