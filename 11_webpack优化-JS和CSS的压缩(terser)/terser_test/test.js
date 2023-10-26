// npx terser 指定需要打包的文件名称 -o 输出文件的名称
// npx terser test.js -o test.min.js
/**
 * 后缀指令描述
 * -c compress option压缩
 * -c arrows=true,arguments=true 函数转换为箭头函数,携参自动转化为对应形参
 * -m mangle option绞肉机配置
 * -m toplevel=true 变量名混淆，针对变量名进行优化操作
 * -m keep_fnames=true 保留函数名，不做优化
 * -m keep classnames=true
 */
const message = "Hello World";
console.log(message);

function foo(num1, num2) {
  console.log("foo function exec~");
  console.log(arguments[0], arguments[1]);
}
foo();

const obj = {
  name: "why",
  bar() {
    return "bar";
  }
};

// 不可达代码可通过-c dead_code=true来移除
if (false) {
  console.log("dsdasdsa");
}

class Person {}
const p = new Person();
