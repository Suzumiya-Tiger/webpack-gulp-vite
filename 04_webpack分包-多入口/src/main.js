// core-js的标准代码全部引入
// 防止第三方包需要新特性api，所以需要在入口文件进行标准引入操作

// import "core-js/stable";
// import "regenerator-runtime/runtime";
// npx babel ./src --out-dir ./dist
// 转换文件=>输出到指定文件夹
// npx babel ./src --out-dir ./build --plugins=@babel/plugin-transform-block-scoping
// --plugins=@babel/plugin-transform-block-scoping可以将ES6+的语法进行转化

//  npm install @babel/preset-env
// 安装babel的预设

import React from "react";
import ReactDom from "react-dom/client";
import axios from "axios";
import App from "./react/App";
import { sum } from "./ts/math";
// 1.ES6以上的语法
const message = "hello babel world";
console.log(message);

const foo = () => {
  console.log("foo function exec~");
};
foo();

const obj = { name: "coder", age: 16 };
const { name, age } = obj;
console.log(name, age);

// 4.使用一些特殊的API，以验证polyfill
// babel不会对新特性的API进行转换操作，它只能执行简单的转换语法操作
const nickInfo = "coderwhy";
console.log(nickInfo.includes("coder"));

// 编写react代码
const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(<App />);

// 6.使用typescript
console.log(sum(20, 30));

// 7.发送网络请求获取数据
axios.get("/api/users/list").then(res => {
  console.log(res.data);
});
