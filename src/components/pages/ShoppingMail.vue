<template>
  <div>
    <!-- search -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" class="location-icon" width="80%">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper -->
    <div class="swiper-area">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>
    <!-- Recommend goods -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <floor :floorData="floor1" :floorName="floorName"></floor>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goods-info :goodsId="item.goodsId"  :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import url from '@/serviceAPI.config'
import floor from '@/components/component/floorComponent'
import goodsInfo from '@/components/component/goodsInfoComponent'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { toMoney } from '@/filter/moneyFilter.js'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [
        { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg' },
        { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg' },
        { imageUrl: 'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg' },
      ],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floorName:{},
      hotGoods:[], // 热卖商品
    }
  },
  created() {
    this.$http({
        url: url.getShopingMallInfo,
        method: 'get'
      })
      .then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }

      })
      .catch(error => {
        console.log(error)
      })
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  components: {
    swiper,
    swiperSlide,
    floor,
    goodsInfo
  },

}

</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #e5017d;
  overflow: hidden;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  border: none;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}

.location-icon {
  padding-top: .2rem;
  padding-left: .3rem;
}

.swiper-area {
  clear: both;
  max-height: 9rem;
  overflow: hidden;
}

.type-bar {
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /*overflow: hidden;*/
}

.type-bar div {
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
  padding: .3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: .3rem;
}

.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}

</style>
