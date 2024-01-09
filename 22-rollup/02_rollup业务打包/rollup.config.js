/* 默认lodash未被打包是因为使用了commonjs，默认rollup使用esmodule */
// 解决了在rollup打包文件时的commonjs兼容问题
const commonjs = require("@rollup/plugin-commonjs");
// 解决了在rollup打包时针对node_modules的commonjs兼容问题
const nodeResolve = require("@rollup/plugin-node-resolve");
// 使用代码转化(ES6转化ES5)和代码压缩
const { babel } = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");

const postcss = require("rollup-plugin-postcss");
const vue = require("rollup-plugin-vue");
// 为了解决安装vue后对process环境变量的依赖问题
const replace = require("@rollup/plugin-replace");

const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");

const isProduction = process.env.NODE_ENV === "production";
const plugins = [
  commonjs(),
  nodeResolve(),
  babel({
    babelHelpers: "bundled",
    exclude: /node_modules/
  }),
  postcss(),
  vue(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true
  })
];
// 区分环境
if (isProduction) {
  plugins.push(terser());
} else {
  const extraPlugins = [
    serve({
      port: 8000,
      open: true,
      contentBase: "."
    }),
    livereload()
  ];
  plugins.push(...extraPlugins);
}
//  npx rollup -c
module.exports = {
  // 入口
  input: "./src/index.js",
  // 出口
  output: {
    // iife

    // 格式
    format: "iife",
    name: "whyUtils",
    file: "./build/bundle.umd.js"
    // 解决lodash没有放进打包文件的问题
    /* 		globals: {
			lodash: "_",
		}, */
  },

  // 常规库文件无需lodash，业务文件需要
  // external: ["lodash"],
  plugins: plugins
};
