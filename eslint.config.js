import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    "rules": {
      "no-unused-vars": "off", // Disable base ESLint rule
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_", // Allows ignoring parameters starting with "_"
        "varsIgnorePattern": "^_", // Allows ignoring variables starting with "_"
        "caughtErrorsIgnorePattern": "^_" // Allows ignoring catch errors starting with "_"
      }]
    }
  },
])
