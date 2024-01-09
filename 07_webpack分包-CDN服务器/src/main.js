// 如果配置了CDN资源并且在webpack配置中设置了externals，那么真实调用将采用CDN的资源，
// 而非本地的引入
import axios from "axios";
import vue from "vue";

import { testMath } from "./utils/math";
import { foo } from "./utils/foo";
// 使用axios
axios.get("/api/moment/list").then(res => {
  console.log(res);
});
const btn1 = document.createElement("button");
const btn2 = document.createElement("button");
btn1.textContent = "about";
btn2.textContent = "category";
document.body.append(btn1);
document.body.append(btn2);

btn1.onclick = () => {
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
