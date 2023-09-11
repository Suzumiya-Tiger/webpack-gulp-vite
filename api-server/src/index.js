// koa代码搭建api服务器
const Koa = require("koa");
const KoaRouter = require("@koa/router");
const app = new Koa();

const userRouter = new KoaRouter({ prefix: "/users" });
userRouter.get("/list", (ctx, next) => {
  console.log(ctx.headers);

  ctx.body = [
    { name: "tom", age: 20 },
    { name: "jerry", age: 21 },
    { name: "tony", age: 22 }
  ];
});
app.use(userRouter.routes());
app.listen(9000, () => {
  console.log("api服务器启动成功");
});
