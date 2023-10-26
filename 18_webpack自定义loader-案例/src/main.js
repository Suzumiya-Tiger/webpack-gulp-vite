// md文件被解析完成后，生成代码，从而可以正确获取code
import code from "./doc.md";
import "./css/code.css";
const message = "hello world";
console.log(message);

const foo = () => {
  console.log("foo function exec~");
};
foo();

//将md被转换后的代码写入到HTML页面之中
document.body.innerHTML = code;
