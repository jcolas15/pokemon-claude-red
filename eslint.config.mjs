import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "vendor/**",
    // the plain-JS engine and its Node tools are linted as they move to TypeScript (Step 2)
    "src/engine/**/*.js",
    "tools/**",
    "dist/**",
  ]),
]);

export default eslintConfig;
