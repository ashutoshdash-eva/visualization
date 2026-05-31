import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname is not available in ES modules, so derive it from import.meta.url.
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                cad: resolve(__dirname, './cad/index1.html'),
            },
        },
    },
});
