import axios from "axios";
import react from "react";

import { testMath } from "./utils/math";
import { foo } from "./utils/foo";
// 使用axios
axios.get("/api/info").then(res => {
  console.log(res);
});
const btn1 = document.createElement("button");
const btn2 = document.createElement("button");
btn1.textContent = "about";
btn2.textContent = "category";
document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
  // 按需导入，不加入主分包文件，作为一个单独的分包文件
  // 为分包名称加入魔法注释，要结合chunkFilename的占位插槽使用
  import(/*webpackChunkName:"about"*/ "./router/about").then(res => {
    res.about();
    console.log(res.default);
  });
};
btn2.onclick = () => {
  import(/*webpackChunkName:"category"*/ "./router/category");
};
testMath();
foo();
