// pnpm add marked -D=>md文档的解析
const { marked } = require("marked");
const hljs = require("highlight.js");
module.exports = function (content) {
  // 让marked库解析语法的时候，将代码高亮出来
  marked.setOptions({
    highlight: function (code,lang) {
      // 传参类型:语言,代码
      return hljs.highlight(code,{lang}).value;
    }
  });
  // 将md语法转化成html的元素结构
  const htmlContent = marked(content);
  // 返回的结果必须是模块化的内容

  // 先转换为字符串形式
  const innerContent = "`" + htmlContent + "`";
  // 再转化为JavaScript代码
  // 将变量code的值作为默认导出的内容
  const moduleContent = `var code=${innerContent};export default code`;
  return moduleContent;
};
