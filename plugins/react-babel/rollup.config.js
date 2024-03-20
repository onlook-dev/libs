import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "index.js",
  output: {
    file: "bundle.js",
    format: "es", // You can choose different formats like 'umd', 'es', etc.
  },
  plugins: [resolve(), commonjs(), json()],
};
