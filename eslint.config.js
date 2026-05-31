import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
    // Files/folders ESLint should not touch
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', '**/fonts/**'],
    },

    // Base recommended rules
    js.configs.recommended,

    // Project-specific settings for our browser ES-module source
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            // Surface the issues Theme 2 is about, but as warnings so the
            // build is never blocked while you clean up incrementally.
            'no-unused-vars': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },

    // Config files run in Node, not the browser
    {
        files: ['*.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    // Turn off rules that conflict with Prettier formatting (must be last)
    prettier,
];
