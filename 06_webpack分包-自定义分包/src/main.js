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
  // 第一个魔法注释：用于标记分包的名称
  // 按需导入，不加入主分包文件，作为一个单独的分包文件
  // 为分包名称加入魔法注释，要结合chunkFilename的占位插槽使用

  /* 第二个魔法注释，用于prefetch 
    预获取(prefetch)和预加载(preload)的逻辑不一样，预获取是触发相关动作时才加载，预加载会和浏览器一起同步加载，
    两者的区别在于预加载会在浏览器空闲时加载，但是预获取是同步浏览器进行加载的
  */
  import(
    /* webpackChunkName:"about" */
    /* webpackPrefetch: true */
    "./router/about"
  ).then(res => {
    res.about();
    console.log(res.default);
  });
};
btn2.onclick = () => {
  import(
    /* webpackChunkName:"category" */
    /* webpackPrefetch: true */
    "./router/category"
  );
};
testMath();
foo();
