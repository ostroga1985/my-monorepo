// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // 👈 ЭТО ВАЖНО! Добавляет test, expect, describe в глобальную область
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
