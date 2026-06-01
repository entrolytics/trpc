import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    fixedExtension: false,
    dts: true,
  },
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
  },
  staged: {
    "*.{ts,tsx,js,jsx,mjs,cjs,json,md,yml,yaml}": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
