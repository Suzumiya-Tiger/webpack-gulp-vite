module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: 3,

        useBuiltIns: "entry"
      }
    ],
    ["@babel/preset-react"],
    [
      "@babel/preset-typescript",

      {
        corejs: 3,
        useBuiltIns: "entry"
      }
    ]
  ]
};
