// content:入口文件的输出内容
// map指的是source-map
module.exports = function (content, map) {
  console.log("hy_loader01:" + content);
  return content;
};
/* module.exports.pitch = function () {
  console.log("load pitch 01");
};
 */