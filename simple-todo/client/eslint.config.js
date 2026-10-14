import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNode from "eslint-plugin-n";
import pluginVitest from "eslint-plugin-vitest";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import { defineConfig } from "eslint";

export default defineConfig([
  {
    ignores: ["dist/", "build/", "node_modules/", "coverage/"]
  },

  eslint.configs.recommended,
  pluginNode.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat["jsx-runtime"],
    ],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },

  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      },
    },
  },
  pluginPrettier,
]);
