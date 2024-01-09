// import axios from "axios";
// import dayjs from "dayjs";
/* 在开发环境下，假设这里是第三方库，没有import内部引入，我们可以通过在
   webpack配置中添加ProvidePlugin(webpack内置)来全局引入，这个设置一般是不用的
    */
console.log(axios);
axios.get("http://api/moment/list").then(res => {
  console.log(res);
});
console.log(dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"));
