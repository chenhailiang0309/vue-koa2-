<template>
  <div>
    <!-- floor -->
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one"><img :src="floor1_0.image" width="100%"></div>
        <div>
          <div class="floor-two"><img :src="floor1_1.image" width="100%"></div>
          <div><img :src="floor1_2.image" width="100%"></div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item,index) in floor1.slice(3)" :key="index">
          <img :src="item.image" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['floorData'],
  created:{
    
  }
}

</script>
<style scoped>
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.floor-anomaly div {
  width: 10rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.floor-one {
  border-right: 1px solid #ddd;
}

.floor-two {
  border-bottom: 1px solid #ddd;
}

.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}

.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}

.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}

</style>
