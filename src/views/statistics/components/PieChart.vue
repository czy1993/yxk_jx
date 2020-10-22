<template>
  <div id="pie_chart">
    <div class="pie_container">
      <echart type="pie" :datas="pieData"></echart>
    </div>
  </div>
</template>

<script>
import Echart from "./EcChart";
export default {
  props: {
    pieData: {
      type: [Array, Object]
    }
  },
  components: {
    Echart
  }
};
</script>

<style lang="scss" scoped>
#pie_chart {
  height: 100%;
  .pie_container {
    height: 100%;
  }
}
</style>
