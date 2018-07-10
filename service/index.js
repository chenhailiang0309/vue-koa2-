const Koa = require('koa')
const app = new Koa()
const { connect, initSchema } = require('./database/init.js')
const mongoose = require('mongoose')
const Router = require('koa-router')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
// koa2解决跨域
const cors = require('koa2-cors')
app.use(cors())


// 装载所有子路由
let router = new Router();

// 引入路由
let user = require('./appApi/user.js')
router.use('/user', user.routes())

let goods = require('./appApi/goods.js')
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;
(async() => {
  await connect()
  initSchema()
})()

app.use(async(ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
