import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}", "test/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", 
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "warn",
      "no-unused-vars": "error",
      "react/jsx-uses-vars": "warn",
      "semi": ["error", "always"],
      "eol-last": ["error", "always"],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "no-multi-spaces": "error", 
      "no-var": "error", 
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-duplicate-imports": "error",
      "no-magic-numbers": ["error", { "ignore": [0, 1, -1, 2] }],
      "no-duplicate-imports": "error",
    },
  },
]);
