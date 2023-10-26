import { sum, mul } from "./utils/math";
import { formatPrice } from "./utils/format";
import "./css/style.css";
import App from "./vue/App.vue";
import { createApp } from "vue";
// import _ from "lodash";

function foo() {
	console.log("foo exection~");
	// console.log(_.join(["abc", "cba"]));
	console.log(formatPrice());
}
const message = "hello world";
foo();
// DOM操作
const titleEl = document.createElement("h2");
titleEl.textContent = "我是标题，哈哈哈哈哈";
titleEl.className = "title";
document.body.appendChild(titleEl);

// 编写vue代码
const app = createApp(App);
app.mount(document.querySelector("#app"));
