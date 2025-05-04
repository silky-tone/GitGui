import { dirname, resolve } from 'path';
import { builtinModules } from 'module';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [],
  base: './',
  build: {
    target: 'esnext',
    lib: {
      formats: ['cjs'],
      fileName: 'index',
      entry: resolve(__dirname, 'src/apps/electron/main.ts'),
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules, // Node.js 内置模块
        ...builtinModules.map(m => `node:${m}`), // Node.js 协议导入
      ],
    },
  },
  resolve: {
    alias: {
      '@libs': resolve(__dirname, 'src/libs'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
});
