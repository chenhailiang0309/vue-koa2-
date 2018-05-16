<template>
  <div>
    <!--floor one area-->
    <div class="floor">
      <div class="floor-anomaly">
        <div class="floor-one"><img :src="floorData0.image" width="100%" /></div>
        <div>
          <div class="floor-two"><img :src="floorData1.image" width="100%" /></div>
          <div><img :src="floorData2.image" width="100%" /></div>
        </div>
      </div>
      <div class="floor-rule">
        <div v-for="(item ,index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        props
    }
</script>
