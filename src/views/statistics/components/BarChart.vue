<template>
  <div id="bar_chart">
    <div class="bar_container">
        <echart type="bar"  :datas="barData"></echart>
    </div>
  </div>
</template>

<script>
import Echart from "./EcChart";
export default {
  props: {
    barData: {
      type: [Array, Object]
    }
  },
  components: {
    Echart
  }
};
</script>

<style lang='scss' scoped>
#bar_chart {
  height: 100%;
  .bar_container {
    height: 100%;
  }
}
</style>
