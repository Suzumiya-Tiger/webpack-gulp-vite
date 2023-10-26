// map指的是source-map

// 耗时操作
module.exports = function (content, map) {
  // const callback=this.callback;
  const callback = this.async();
  // this.async会默认等待调用callback的地方执行，所以会先通知该loader先不要返回参数，等待callback的执行
  // 异步操作
  // 如果使用const callback=this.callback;
  // 那么该代码的后续函数不会等待定时器结束，而是默认 return undefined
  setTimeout(() => {
    console.log("hy_loader02:" + content);
    callback(null, content + "bbb");
  }, 1000);
};
