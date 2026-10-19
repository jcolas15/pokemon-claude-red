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
    // engine files still marked @ts-nocheck are linted once they're typed: un-ignore each one here as it lands
    // (docs/nextjs-migration.md). core/audio.js stays plain JS.
    "src/engine/**/*.{ts,js}",
    "!src/engine/{entry,engine,platform,global}.ts",
    "!src/engine/core/{gfx,font,input,engine}.ts",
    "!src/engine/art/{palette,logo,mondef}.ts",
    "!src/engine/data/gen3_core.ts",
    "!src/engine/data/gen3_rules.ts",
    "!src/engine/data/gen3_world.ts",
    "!src/engine/scripts/gen3.ts",
    "!src/engine/game/resume.ts",
    "!src/engine/game/regionmap.ts",
    "!src/engine/data/text/dex_gen3.ts",
    "!src/engine/data/mons/152-*.ts",
    "!src/engine/data/mons/1[89]*.ts",
    "!src/engine/data/mons/2*.ts",
    "tools/**",
  ]),
]);

export default eslintConfig;
