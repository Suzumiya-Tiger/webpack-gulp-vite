// babel.config.js => 被独立出去的babel options配置
module.exports = {
  /* 使用插件，指定具体的插件内容完成对应的工作，但是一一添加过于繁琐，直接使用预设
            plugins: [
              "@babel/plugin-transform-arrow-functions",
              "@babel/plugin-transform-block-scoping"
            ] */
  presets: [
    [
      "@babel/preset-env",
      {
        //    单独设置targets会覆盖browserslistrc的配置
        //   targets: ">5%"
        //   在开发阶段中针对babel的浏览器兼容查询使用browserslist工具，无需设置target

        //   browserslist工具，可以在多个前端工具(postcss之类的)之间共享浏览器兼容性

        // 安装polyfill通过npm install core-js regenerator-runtime来实现
        // 配置polyfill
        corejs: 3,
        //   设置是否配置polyfill，为false无需设置corejs，此时不使用polyfill
        //   usage默认处理当前项目下的代码(除了在webpack babel配置中设置的excludes),
        //   可能导致第三方包无法正常执行(因为没有包括第三方包)
        //   entry根据入口文件进行引入
        useBuiltIns: "entry"
      }
    ],
    ["@babel/preset-react"],
    [
      "@babel/preset-typescript",
      // 在ts代码里面可能包含了需要应用polyfill的代码
      // ts-loader中的typescript complier(tsc)不包含polyfill
      // 所以不要用ts-loader编译ts代码
      // 可以在该ts预设中配置polyfill,这是利用babel-loader处理ts文件的优势
      // 对应的缺点则是babel-loader不会对ts文件的代码进行ts的类型检查
      {
        corejs: 3,
        useBuiltIns: "entry"
      }
    ]
  ]
};
