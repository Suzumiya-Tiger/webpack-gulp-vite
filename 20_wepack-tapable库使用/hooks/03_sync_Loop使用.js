const { SyncLoopHook } = require("tapable");
let count = 0;
class HYCompiler {
  constructor() {
    //   1.创建hooks
    this.hooks = {
      loopHook: new SyncLoopHook(["name", "age"])
    };

    // 2.利用hooks监听事件(自定义plugin)

    this.hooks.loopHook.tap("event1", (name, age) => {
      if (count < 5) {
        console.log("event1事件监听已执行：", name, age);
        count++;
        return true;
      }
      // return 123=>boolean=>true
    });
    this.hooks.loopHook.tap("event2", (name, age) => {
      console.log("event2事件监听已执行：", name, age);
    });
  }
}

const compiler = new HYCompiler();
// 3.发射事件
setTimeout(() => {
  compiler.hooks.loopHook.call("zhangsan", 18);
}, 1500);
