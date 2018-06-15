const Koa = require('koa')
const app = new Koa()
const { connect ,initSchema} = require('./database/init.js')
const mongoose = require('mongoose')
;
(async() => {
  await connect()
  initSchema()
  const User = mongoose.model('User')
  
  let onUser = new User({
  	username:'jspang1',password:'123456'
  })
  onUser.save().then(()=>{
  	console.log('插入成功')
  })

  // let user = await User.findOne({}).exec()
  // console.log(user)
})()

app.use(async(ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
