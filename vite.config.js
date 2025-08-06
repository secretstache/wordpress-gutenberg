import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json' assert { type: 'json' };
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies || {}),
        /react\/jsx-runtime/
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
});
