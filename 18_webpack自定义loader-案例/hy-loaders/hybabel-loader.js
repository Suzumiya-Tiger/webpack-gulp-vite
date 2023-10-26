const babel = require("@babel/core");
const { validate } = require("schema-utils");
const babelSchema = require("../schema/babel_schema.json");
// 动态地通过本地babel.config.js文件来配置babel
module.exports = function (content) {
  // 使用异步loader,利用babel的transform来转化代码
  // 本质上this.async()就是一个异步回调版的this.callback。
  const callback = this.async();
  // 获取options
  let options = this.getOptions();
  if (!Object.keys(options).length) {
    // 导入options
    options = require("../babel.config");
  }
  // 校验options
  validate(babelSchema, options);
  // 传参内容：源代码，配置，回调函数
  /**
   * babel.transform(content, options, (err, result) => { ... });:
   * 这是一个异步操作，它使用 babel.transform 方法来对源代码 content 进行转换，
   * 使用传递给 Loader 的选项 options。
   * 异步回调：
   * 在 babel.transform 的回调函数中，
   * 处理了可能发生的错误和转换后的结果。如果发生错误，就调用 callback(err) 将错误传递给 Webpack，
   * 否则调用 callback(null, result.code) 将转换后的代码传递给 Webpack。
   */
  babel.transform(content, options, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
  //   return content;
};
