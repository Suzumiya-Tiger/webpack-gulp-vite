const { SyncWaterfallHook } = require("tapable");
let count = 0;
class HYCompiler {
  constructor() {
    //   1.创建hooks
    this.hooks = {
      waterfallHook: new SyncWaterfallHook(["name", "age"])
    };

    // 2.利用hooks监听事件(自定义plugin)

    this.hooks.waterfallHook.tap("event1", (name, age) => {
      console.log("event1事件监听已执行：", name, age);
      // 返回的值存在时，将作为下一个监听事件回调函数的第一个传参。
      return "哈哈哈哈哈";
    });
    this.hooks.waterfallHook.tap("event2", (name, age) => {
      console.log("event2事件监听已执行：", name, age);
    });
  }
}

const compiler = new HYCompiler();
// 3.发射事件
setTimeout(() => {
  compiler.hooks.waterfallHook.call("zhangsan", 18);
}, 1500);
