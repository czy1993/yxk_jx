<template>
  <div id="line_chart">
    <div class="line_container">
      <echart type="line" :datas="lineData"></echart>
    </div>
  </div>
</template>

<script>
import Echart from "./EcChart";
export default {
  props: {
    lineData: {
      type: [Array, Object]
    }
  },
  components: {
    Echart
  }
};
</script>

<style lang="scss" scoped>
#line_chart {
  height: 100%;
  .line_container {
    height: 100%;
  }
}
</style>
