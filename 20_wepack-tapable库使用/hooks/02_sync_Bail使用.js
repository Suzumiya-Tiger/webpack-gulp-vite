const { SyncBailHook } = require("tapable");

class HYCompiler {
  constructor() {
    //   1.创建hooks
    this.hooks = {
      bailHook: new SyncBailHook(["name", "age"])
    };

    // 2.利用hooks监听事件(自定义plugin)

    this.hooks.bailHook.tap("event1", (name, age) => {
      console.log("event1事件监听已执行：", name, age);
      return 123;
    });
    this.hooks.bailHook.tap("event2", (name, age) => {
      console.log("event2事件监听已执行：", name, age);
    });
  }
}

const compiler = new HYCompiler();
// 3.发射事件
compiler.hooks.bailHook.call("zhangsan", 18);
