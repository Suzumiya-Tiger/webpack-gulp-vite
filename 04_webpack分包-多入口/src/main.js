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
