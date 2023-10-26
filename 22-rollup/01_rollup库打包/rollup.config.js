/* 默认lodash未被打包是因为使用了commonjs，默认rollup使用esmodule */
// 解决了在rollup打包文件时的commonjs兼容问题
const commonjs = require("@rollup/plugin-commonjs");
// 解决了在rollup打包时针对node_modules的commonjs兼容问题
const nodeResolve = require("@rollup/plugin-node-resolve");
// 使用代码转化(ES6转化ES5)和代码压缩
const { babel } = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");
//  npx rollup -c
module.exports = {
	// 入口
	input: "./libs/index.js",
	// 出口
	output: {
		// umd

		// 格式
		format: "umd",
		name: "whyUtils",
		file: "./build/bundle.umd.js",
		// 解决lodash没有放进打包文件的问题
		globals: {
			lodash: "_",
		},

		// // amd
		// {
		// 	// 格式
		// 	format: "amd",
		// 	file: "./build/bundle.amd.js",
		// },
		// // cjs
		// {
		// 	// 格式
		// 	format: "cjs",
		// 	file: "./build/bundle.cjs.js",
		// },
		// // iife(浏览器)
		// {
		// 	// 格式
		// 	format: "iife",
		// 	file: "./build/bundle.browser.js",
		// },
	},
	external: ["lodash"],
	plugins: [
		commonjs(),
		nodeResolve(),
		babel({
			babelHelpers: "bundled",
			exclude: /node_modules/,
		}),
		terser(),
	],
};
