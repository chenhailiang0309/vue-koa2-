const Router = require('koa-router')
let router = new Router()
router.get('/', async(ctx) => {
  ctx.body = "首页"
})

router.get('/register', async(ctx) => {
  // console.log(ctx.request.body)
  // ctx.body = ctx.request.body
  ctx.body = "注册"
})

module.exports = router;
