import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import path from 'path';

export default defineConfig({
    build: {
        outDir: 'build',
        emptyOutDir: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.js'),
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'styles',
        },
        sourcemap: true,
        rollupOptions: {
            external: [
                'react',
                'react-dom',
            ],
        },
    },
    plugins: [
        react(),
        viteExternalsPlugin({
            '@wordpress/api-fetch': ['wp', 'apiFetch'],
            '@wordpress/block-editor': ['wp', 'blockEditor'],
            '@wordpress/blocks': ['wp', 'blocks'],
            '@wordpress/components': ['wp', 'components'],
            '@wordpress/data': ['wp', 'data'],
            '@wordpress/dom-ready': ['wp', 'domReady'],
            '@wordpress/element': ['wp', 'element'],
            '@wordpress/hooks': ['wp', 'hooks'],
        }),
    ],
});
