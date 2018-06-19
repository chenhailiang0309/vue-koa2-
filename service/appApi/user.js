const Router = require('koa-router')
const mongoose = require('mongoose')


let router = new Router()
router.get('/', async(ctx) => {
  ctx.body = "首页"
})

router.post('/register', async(ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.post('/login', async(ctx) => {
  let loginUser = ctx.request.body
  // console.log(loginUser)

  let username = loginUser.username
  let password = loginUser.password
  //引入User的model
  const User = mongoose.model('User')
  // 查找用户名是否存在，如果存在开始比对密码
  await User.findOne({ username: username }).exec().then(async(res) => {
    // console.log(res)
    if (res) {
      // console.log(User)
      let newUser = new User()
      await newUser.comparePassword(password, res.password)
        .then((isMatch) => {
          console.log(isMatch)
          ctx.body = { code: 200, message: isMatch }
        })
        .catch(error => {
          console.log(error)
          ctx.body = { code: 500, message: error }
        })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(error => {
    console.log(error)
    ctx.body = { code: 500, message: error }
  })
})

module.exports = router;
