<template>
  <div>
    <router-link :to="{path:'/goods',query:{goodsId:goodsId}}" class="goods-info">
      <div class="goods-image">
        <img v-lazy="goodsImage" width="90%" />
      </div>
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </router-link>
  </div>
</template>
<script>
import { toMoney } from '@/filter/moneyFilter'
export default {
  props: ['goodsImage', 'goodsName', 'goodsPrice', 'goodsId'],
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
}

</script>
<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
