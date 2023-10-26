const { AsyncParallelHook } = require("tapable");
let count = 0;
class HYCompiler {
  constructor() {
    //   1.创建hooks
    this.hooks = {
      parallelHook: new AsyncParallelHook(["name", "age"])
    };

    // 2.利用hooks进行异步监听
    /* 这两个异步事件不会产生阻塞，而是以并行的方式同步执行 */
    this.hooks.parallelHook.tapAsync("event1", (name, age) => {
      setTimeout(() => {
        // 异步操作
        console.log("event1事件监听已执行：", name, age);
      }, 3000);
    });
    this.hooks.parallelHook.tapAsync("event2", (name, age) => {
      setTimeout(() => {
        // 异步操作
        console.log("event2事件监听已执行：", name, age);
      }, 4000);
    });
  }
}

const compiler = new HYCompiler();
// 3.发射事件
setTimeout(() => {
  // 事件一经发射，立刻开始执行hooks监听事件
  compiler.hooks.parallelHook.callAsync("zhangsan", 18);
}, 0);
