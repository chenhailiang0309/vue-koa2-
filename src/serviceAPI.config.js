const BASEURL = "https://www.easy-mock.com/mock/5b14e2a6647ea43344eecc65/shopping/";
const LOCALURL = 'http://127.0.0.1:3000/'
const URL = {
  getShopingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
}

module.exports = URL
