// map指的是source-map

// 耗时操作
module.exports = function (content, map) {
  /**
   * 在 Webpack Loader 中，每一个 Loader 都会接收到一个 this 上下文对象，
   * 通过该对象可以访问到 Loader 的一些方法和属性，包括 this.callback。
   * this.callback 是一个由 Webpack 提供的用于返回处理结果的函数。
   * 它是一个用于传递处理后的内容给下一个 Loader 或 Webpack 的函数。
   */

  // 直接调用callback依然执行同步操作，所以针对setTimeout的异步执行没有效果
  // const callback = this.callback;
  // this.async()是一个异步操作的执行函数，返回一个callback函数
  /* 在 Loader 中，有些操作是异步的，比如读取文件、发送网络请求等。
     如果你的 Loader 需要执行异步操作，
     可以使用 this.async() 方法获取一个用于传递结果的回调函数。 */
  const callback = this.async();
  // 异步操作
  // 该代码的后续函数不会等待定时器结束，而是默认 return undefined
  setTimeout(() => {
    console.log("hy_loader03:" + content);
    callback(null, content + "aaa");
  }, 2000);

  //callback进行调用：
  // 参数一：错误信息，这里没有直接设置为null
  // 参数二：传递给下一个loader的内容
  // callback(null, "哈哈哈哈哈");
};

// 同步Loader
/* module.exports = function (content, map) {
  console.log("hy_loader03:" + content);
  return content;
}; */
// pitch操作
/* module.exports.pitch = function () {
  console.log("load pitch 03");
};
 */
