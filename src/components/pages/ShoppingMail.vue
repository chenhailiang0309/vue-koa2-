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
              <div>￥{{item.price}}(￥item.mallPrice)</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div>
      
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView:3
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
      floor1:[],
      floor1_0:[],
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this.$http({
        url: 'https://www.easy-mock.com/mock/5aeeafc4ee70f3596f06e50d/vue+koa2-shopping/index',
        method: 'get'
      })
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
        }

      })
      .catch(error => {
        console.log(error)
      })
  }
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
  max-height: 15rem;
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
}

.type-bar div {
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

</style>
