<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <!-- 商品大类 -->
          <div id="leftNav">
            <ul>
              <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}">
                {{item.MALL_CATEGORY_NAME}}
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <!-- 商品子类 -->
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <!-- 商品列表 -->
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div class="list-item" v-for="(item,index) in goodList" :key="index">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      category: [], //大类
      categorySub: [], //小类
      categoryIndex: 0,
      active: 0,
      loading: false, //上拉加载使用
      finished: false, //上拉加载是否没有了？
      isRefresh: false, //下拉加载
      page: 1, // 商品列表的页数
      goodList: [], // 商品信息
      categorySubId: '', // 商品子类ID
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 + 'px'
  },
  methods: {
    getCategory() {
      this.$http({
          url: url.getCategoryList,
          method: 'get'
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message
            this.getCategorySubByCategoryId(this.category[0].ID)
          } else {
            Toast('服务器错误，数据获得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      this.$http({
          url: url.getCategorySubList,
          method: 'post',
          data: {
            categoryId
          }
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            console.log(res.data.message)
            this.categorySub = res.data.message
            this.active = 0
          } else {
            Toast('服务器错误，数据获取失败')
          }
        })
    },
    // 点击大类显示对应小类
    clickCategory(index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    // 点击子类获取商品信息
    onClickCategorySub(index, title) {
      // console.log(this.categorySub)
      this.categorySubId = this.categorySub[index].ID
      // console.log(this.categorySubId)
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    // 获取商品列表
    getGoodList() {
      this.$http({
          url: url.getGoodsListByCategorySubID,
          method: 'POST',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        })
        .then(res => {
          // console.log(res)
          if (res.data.code == 200 && res.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(res.data.message);
          } else {
            this.finished = true
          }
          this.loading = false;
          // console.log(this.finished)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 下拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page =1;
        this.onLoad();
      }, 500);
    }
  }
}

</script>
<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #E4E7ED;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}

.categoryActive {
  background-color: #fff;
}

#list-div {
  overflow: scroll;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}

#list-div {
  overflow: scroll;
}

.list-item-img {
  flex: 8;
}

.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}

</style>
