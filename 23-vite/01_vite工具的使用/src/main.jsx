import { sum, mul } from "./utils/math";
// 使用vite会自动到node_modules下找到lodash入口文件，会将其所有内容合并到同一个文件之中
import _ from "lodash-es";
import { formatPrice } from "./typescript/format";
import "./css/style.css";
import "./css/normal.less";
import VueApp from "./vue/App.vue";
import { createApp } from "vue";

import ReactApp from "./react/App.jsx";
import React from "react";
import ReactDom from "react-dom/client";
// es6的代码
const message = "Hello World";
console.log(message);

const foo = () => {
	console.log("function foo exec~");
};
foo();

// 模块化代码的使用
console.log(sum(20, 30));
console.log(mul(20, 30));
console.log(_.join(["abcv", "cdc"]));

// ts代码
// vite会利用esbulid自动将其转换为JS代码
/* vite会自动开启一个connect服务器，将浏览器请求的format.ts进行读取，再利用ESbuild转化为JS代码，再发给浏览器 */
console.log(formatPrice(1000));

// DOM操作
const titleEl = document.createElement("h2");
titleEl.textContent = "hello haruhi";
titleEl.className = "title";
document.body.appendChild(titleEl);

// Vue代码渲染
const app = createApp(VueApp);
app.mount(document.querySelector("#app"));

// React代码渲染
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<ReactApp />);
