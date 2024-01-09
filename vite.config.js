import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/src/App.jsx'],
            refresh: true,
        }),
        react(),
        svgr(),
        eslint()
    ],
    build: {
        commonjsOptions: {
            transformMixedEsModules: true
        }
    } // for support all old js files
});
