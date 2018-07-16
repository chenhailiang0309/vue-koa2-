const BASEURL = "https://www.easy-mock.com/mock/5b14e2a6647ea43344eecc65/shopping/";
const LOCALURL = 'http://127.0.0.1:3000/'
const URL = {
  getShopingMallInfo: BASEURL + 'index', //首页
  getGoodsInfo: BASEURL + 'getGoodsInfo',  //首页
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  loginUser: LOCALURL + 'user/login', //用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', //获取商品详情
  getCategoryList:LOCALURL+'goods/getCategoryList', // 得到大类信息
}

module.exports = URL
