export function parseLyric(lyricString) {
  return [];
}
export function test() {}
// 典型的副作用代码，terser函数可能会认为这是有用的函数
// 就算注释掉，也会认为这个模块不可以被删除
// 如果希望删除这整个模块，则需要在package.json中配置sideEffects为false
// sideEffects:false 代表所有文件没有副作用，可以进行tree shaking
window.lyric = "hahahahaha";

// 代码设计原则应该是尽量不存在副作用代码，而是编写传模块
// 但是如果确实存在副作用代码，那么就需要在package.json中配置sideEffects为一个数组，数组中
// 指定某个文件，该文件的副作用代码会保留，该文件的导入也会保留