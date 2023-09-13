// 如果配置了CDN资源并且在webpack配置中设置了externals，那么真实调用将采用CDN的资源，
// 而非本地的引入
import axios from "axios";
import vue from "vue";
import "./abc";
import { testMath } from "./utils/math";
import { foo } from "./utils/foo";
// 使用axios
axios.get("http://139.199.212.233:80/moment/list").then(res => {
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

  /* 第二个魔法注释，用于prefetch 
    预获取和按需加载的逻辑不一样，按需加载是触发相关动作时才加载，预获取会先加载，触发工作
    后再进行渲染，两者的区别在于预获取会在空闲时加载，但是按需加载是在触发时加载
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
