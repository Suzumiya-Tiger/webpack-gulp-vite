/**
 * TreeShaking: 去除无用代码
 * 在optimization中配置usedExports为true，标记引入未调用的函数，帮助Terser优化
 * 在package.json配置sideEffects为false或指定数组文件，对副作用代码进行删除或优化
 */
import { sum } from "./demo/math";
// 1.正常利用ESModule引用
// import { parselyric } from "./demo/parse-lyric";
// parselyric()
console.log(sum(20, 30));
// 2.只导入模块，但是没有引入任何内容
import "./demo/parse-lyric(副作用演示文件)";
import "./css/index.less";
/* 为了避免副作用控制项影响css文件的引入，应该在package.json的配置中写入：
"sideEffects":[
    "*.less"
  ],
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
console.log(window.lyric);


