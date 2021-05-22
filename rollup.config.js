import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: './index.js',
  output: {
    file: 'dist/storage-hoo.min.js',
    format: 'umd',
    name: 'storage-hook'
  },
  plugins: [
    babel({
      extensions: [".js"],
      exclude: "node_modules/**",
      babelHelpers: 'bundled'
    }),
   terser()
  ],
  external: [
    'react'
  ]
};