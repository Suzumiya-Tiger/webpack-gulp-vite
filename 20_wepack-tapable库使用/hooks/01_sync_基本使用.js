const { SyncHook } = require("tapable");
// SyncHook 是 tapable 库提供的一种钩子类型，
// 它是同步钩子，可以用于在特定的时机执行注册的回调函数。
class HYCompiler {
  constructor() {
    //   1.创建hooks
    this.hooks = {
      /* 创建了一个 hooks 对象，并在其中定义了一个名为 syncHook 的钩子。
        这个钩子接受两个参数，
        分别是 "name" 和 "age"，用于在调用钩子时传递参数。 */
      // 这里数组传参决定了在回调该hook的时候，可以给该hook传递哪些参数
      syncHook: new SyncHook(["name", "age"])
    };

    // 2.利用hooks监听事件(自定义plugin)
    // tap用于监听事件，第一个参数是插件名，第二个参数是回调函数
    /* 这段代码会将一个名为 "event1" 的监听器注册到 syncHook 钩子上，
    当调用 syncHook 时(下面的发射事件代码)，会执行回调函数，并传递相应的参数 name 和 age。 */
    this.hooks.syncHook.tap("event1", (name, age) => {
      console.log("event1事件监听已执行：", name, age);
    });
    this.hooks.syncHook.tap("event2", (name, age) => {
      console.log("event2事件监听已执行：", name, age);
    });
  }
}

const compiler = new HYCompiler();
// 3.发射事件
// 这里无需传事件名称，只需要传参数，此处一经触发，立刻调用上面的tap监听事件
compiler.hooks.syncHook.call("zhangsan", 18);
