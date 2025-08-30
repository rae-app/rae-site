import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // 👇 Turn off or relax unused vars/imports
      "@typescript-eslint/no-unused-vars": [
        "warn", // or "off" if you don’t want to see them at all
        { argsIgnorePattern: "^_" }, // ignore vars prefixed with _
      ],

      // 👇 If you want to silence unused imports
      "no-unused-vars": "off", // disable core rule (TS handles it)

      // 👇 Optional: disable prop-types (since you use TS)
      "react/prop-types": "off",
    },
  },
];

export default eslintConfig;
