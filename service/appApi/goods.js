const Router = require('koa-router')
let router = new Router()

const path = require('path') // 路径模块  获取绝对路径

const mongoose = require('mongoose')
const fs = require('fs')

// 商品详情页数据接口
router.post('/getDetailGoodsInfo', async(ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (e) {
    ctx.body = { code: 500, message: e }
  }
  /*let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ ID: goodsId }).exec()
    .then(async(res) => {
      ctx.body = { code: 200, message: result }
    })
    .catch(error => {
      ctx.body = { code: 500, message: error }
    })*/
})

// 读取大类别API
router.get('/getCategoryList', async(ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = { code: 200, message: result }
  } catch (e) {
    ctx.body = { code: 500, message: e }
  }
})

// 读取子类别API
router.get('/getCategorySubList', async(ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    // let categoryId = 1
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 根据商品类别获取商品列表
router.get('/getGoodsListByCategorySubID', async(ctx) => {
  try {
    // let categorySubId = ctx.request.body.categoryId
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({ SUB_ID: categorySubId }).exec()
    // console.log(result)
    ctx.body = { code: 200, message: result }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }
})

// 插入商品信息到数据库
router.get('/insertAllGoodsInfo', async(ctx) => {
  const fsPath = path.join(__dirname, '../data_json/newGoods.json')
  fs.readFile(fsPath, 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0

    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        // console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败' + error)
      })
    })
  })
  ctx.body = "导入数据"
})

// 插入商品大类到数据库
router.get('/insertAllCategory', async(ctx) => {
  const fsPath = path.join(__dirname, '../data_json/category.json')
  fs.readFile(fsPath, 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0;

    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        // console.log('成功' + saveCount)
      }).catch(errpr => {
        console.log('error' + error)
      })
    })
  })
  ctx.body = '导入商品大类'
})

// 插入商品子类到数据库
router.get('/insertAllCategorySub', async(ctx) => {
  const fsPath = path.join(__dirname, '../data_json/category_sub.json')
  fs.readFile(fsPath, 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0;

    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        // console.log('成功'+saveCount)
      }).catch(error => {
        console.log('失败' + error)
      })
    })
  })
  ctx.body = '导入子类数据'
})



module.exports = router;
