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
            <van-tabs v-model="active" @click="getGoodsListByCategorySubID">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
              </van-tab>
            </van-tabs>
          </div>
          <!-- 商品列表 -->
          <div id="list-div">
            <van-list v-model="loading" :finished="finished" @load="onload">
              <div v-for="item in list" :key="item" class="list-item">
                {{item}}
              </div>
            </van-list>
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
      list: [], // 商品列表
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
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
      this.getCategorySubByCategoryId(categoryId)
    },
    // 根据商品类别获取商品列表
    getGoodsListByCategorySubID(index, title) {
      console.log(title)
      this.$http({
          url: url.getGoodsListByCategorySubID,
          method: 'POST',
          data: {
            categoryId: ID
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 下拉加载
    onload() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false;
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500)
    },
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
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

</style>
