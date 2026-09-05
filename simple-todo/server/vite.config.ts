import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    extensions: [".ts", ".js", ".mts", ".cjs"],
  },
  test: {
    alias: {
      'typeorm': resolve(import.meta.dirname, './node_modules/typeorm/index.js'),
    },
    environment: "node",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts.cts}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    setupFiles: ["./vitest.setup.ts"],
    server: {
      deps: {
        inline: ["typeorm", "reflect-metadata"],
      },
    },
    deps: {
      optimizer: {
        web: { enabled: false },
        ssr: { enabled: false },
      },
      web: {
        transformCss: false,
        transformAssets: false,
      },
    },
    fileParallelism: false,
    pool: 'forks',
    execArgv: ['--import', 'tsx'],
  },
});