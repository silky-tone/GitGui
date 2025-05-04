import { dirname, resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
    ],
    base: './',
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT),
    },
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          launch: resolve(__dirname, 'launch.html'),
        },
        output: {
          manualChunks: (id) => {
            const manualName = (id.trim().split('node_modules/')[1] || '').trim().split('/')[0];
            manualName && console.log(JSON.stringify({ manualName, id }));
            if (manualName.includes('vue')) return 'vue';
            if (manualName) {
              return 'vendor';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@libs': resolve(__dirname, 'src/libs'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@common': resolve(__dirname, 'src/common'),
        '@components': resolve(__dirname, 'src/components'),
      },
    },
  };
});
