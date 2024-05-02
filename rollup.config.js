import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const isProd = !process.env.ROLLUP_WATCH;

export default {
    input: './src/index.js',
    output: {
        dir: 'build',
        format: 'es',
        exports: 'named',
        sourcemap: true,
    },
    plugins: [
        external(),
        babel({
            babelHelpers: 'runtime',
            exclude: /node_modules/,
            presets: [
                '@babel/preset-env',
                ['@babel/preset-react', {
                    runtime: 'automatic',
                }],
            ],
            plugins: [
                ['@babel/plugin-transform-runtime', {
                    helpers: true,
                    regenerator: true,
                }],
            ],
            extensions: ['.js', '.jsx'],
        }),
        commonjs({
            extensions: ['.js', '.jsx'],
        }),
        resolve({ extensions: ['.js', '.jsx'] }),
        postcss({
            extract: true,
            use: ['sass'],
            extensions: ['.scss'],
        }),
        isProd && terser(),
    ],
};
