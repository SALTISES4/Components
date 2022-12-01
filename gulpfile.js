/* Build tools */
const gulp = require("gulp");

/* Build modules for scripts */
const commonjs = require("@rollup/plugin-commonjs"); // loader
const eslint = require("@rollup/plugin-eslint"); // linter
const { babel } = require("@rollup/plugin-babel"); // transpiler + polyfills
const resolve = require("@rollup/plugin-node-resolve"); // loader
const strip = require("@rollup/plugin-strip"); // remove console.log statements
const rollup = require("rollup"); // bundler
const { terser } = require("rollup-plugin-terser"); // minifier
const nodeResolve = resolve.default;
const alias = require("@rollup/plugin-alias");
const replace = require("@rollup/plugin-replace");

/* Add new apps to the list */
const modules = ["dashboard", "navigation"];

function buildScript(module) {
  const inputOptions = {
    input: `./components/static/components/js/${module}.jsx`,
    plugins: [
      alias({
        entries: [
          { find: "react", replacement: "preact/compat" },
          { find: "react-dom", replacement: "preact/compat" },
        ],
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      eslint({
        fix: true,
      }),
      // https://github.com/rollup/plugins/tree/master/packages/commonjs#using-with-rollupplugin-node-resolve
      nodeResolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        mainFields: ["module", "main", "browser"],
      }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      strip(),
    ],
  };
  const outputOptions = {
    extend: true,
    file: `./components/static/components/js/build/${module}.min.js`,
    format: "iife",
    name: `${module}`,
    plugins: [terser()],
    sourcemap: true,
  };

  return rollup
    .rollup(inputOptions)
    .then((bundle) => bundle.write(outputOptions));
}

exports.scripts = gulp.parallel(
  ...[].concat(
    ...modules.map((m) => {
      function task() {
        return buildScript(m);
      }
      task.displayName = m;
      return task;
    }),
  ),
);
