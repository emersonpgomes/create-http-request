import typescript from "rollup-plugin-typescript";
import closure from "./scripts/closure-plugin";
import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    plugins: [
      typescript({ target: "es5", importHelpers: true }),
      closure({
        rewrite_polyfills: false
        // formatting: 'PRETTY_PRINT',
        // renaming: false,
      })
    ],
    output: {
      name: "Http",
      file: pkg.browser,
      format: "iife"
    }
  },
  {
    input: "src/index.ts",
    plugins: [typescript()],
    output: [
      { name: "Http", file: pkg.main, format: "cjs" },
      { name: "Http", file: pkg.module, format: "es" }
    ]
  }
];
