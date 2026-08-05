import { defineConfig } from 'vitest/config';

export default defineConfig({
  test:{
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts.cts}'],
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text','json','html'],
    },
  },
})