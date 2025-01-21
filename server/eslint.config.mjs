// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    ignores: [
      "dist/*",
      "src/__tests__/**/*",
      "src/__fixture__/**/*",
      "**/*.{js, mjs}",
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-multiple-empty-lines": ["error"],
      "no-console": ["error"],
      "no-duplicate-imports": ["error"],
    },
  },
);
