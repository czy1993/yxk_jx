<template>
  <div id="funnel_chart">
    <div class="funnel_container">
      <echart type="funnel" :datas="funnelData"></echart>
    </div>
  </div>
</template>

<script>
import Echart from "./EcChart";
export default {
  props: {
    funnelData: {
      type: [Array, Object]
    }
  },
  components: {
    Echart
  },
  mounted(){


  }
};
</script>

<style lang="scss" scoped>
#funnel_chart {
  height: 100%;
  .funnel_container {
    height: 100%;
  }
}
</style>
