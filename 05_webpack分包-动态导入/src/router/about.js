// 模拟路由
const h1 = document.createElement("h1");
h1.textContent = "about page";
document.body.append(h1);

function about() {
  console.log("hello about");
}
const name = "ABOUT!";
export { about };
export default name;
