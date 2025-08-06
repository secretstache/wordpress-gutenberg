import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/,
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
      ],
      extensions: ['.js', '.jsx'],
    }),
    viteExternalsPlugin({
      '@wordpress/api-fetch': ['wp', 'apiFetch'],
      '@wordpress/block-editor': ['wp', 'blockEditor'],
      '@wordpress/blocks': ['wp', 'blocks'],
      '@wordpress/components': ['wp', 'components'],
      '@wordpress/data': ['wp', 'data'],
      '@wordpress/dom-ready': ['wp', 'domReady'],
      '@wordpress/element': ['wp', 'element'],
      '@wordpress/hooks': ['wp', 'hooks'],
      '@wordpress/icons': ['wp', 'icons'],
    }),
  ],
  build: {
    outDir: 'build',
    lib: {
      entry: './src/index.js',
      formats: ['es'],
      fileName: 'index',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') {
            return 'styles.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
});
