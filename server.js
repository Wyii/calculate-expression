const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
var router = new Router();

router.get('/xx',(ctx, next) => {
    ctx.body = 'x';
  })

app.use(router.routes()).use(router.allowedMethods());
app.listen(8080);