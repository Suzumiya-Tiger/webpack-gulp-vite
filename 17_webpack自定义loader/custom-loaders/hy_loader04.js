const { validate } = require("schema-utils");
const loader04Schema = require("./schema/loader04_schema.json");
module.exports = function (content) {
  // 1.获取使用loader时传入的options(参数)
  // 通过this.getOptions()直接获取参数
  const options = this.getOptions();
  console.log(options);
  // 2.校验参数是否符合规则
  // validate(校验规则，options)
  validate(loader04Schema, options);
  console.log("hy-loader04:", content);
  return content;
};
