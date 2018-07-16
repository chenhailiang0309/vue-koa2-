<template>
  <div class="navbar-div">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from '@/serviceAPI.config.js'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {} // 商品详细数据
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
    this.getInfo(); // 获取商品详情
  },
  methods: {
    // 获取商品详情
    getInfo() {
      this.$http({
          url: url.getDetailGoodsInfo,
          method: 'post',
          data: {
            goodsId: this.goodsId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.code == 200 && res.data.message) {
            this.goodsInfo = res.data.message
          } else {
            Toast('服务器错误，获取数据失败')
          }

        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
}

</script>
<style scoped>
.detail {
  font-size: 0;
}

.goods-name {
  background-color: #fff;
}

.goods-price {
  background-color: #fff;
}

.goods-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}

.goods-bottom div{
  flex:1;
  padding: 5px;
}
</style>
