<template>
  <div id="echart">
    <div class="echart_container">
      <div ref="echart" id="_echart"></div>
    </div>
  </div>
</template>

<script>
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
//引入折线图
require("echarts/lib/chart/line");
//引入漏斗图
require("echarts/lib/chart/funnel");
//引入饼图
require("echarts/lib/chart/pie");
// 引入提示框
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import { funnel, pie, bar, line } from "./echart";
export default {
  props: {
    datas: {
      type: [Object, Array]
    },
    type: String
  },
  data() {
    return {
      echart: "",
      typeList: {
        funnel: {
          callback: () => {
            funnel.series[0]["data"] = this.datas;
            funnel.series[0]['max']=this.datas.reduce((acc,cur)=>{
              return acc+=cur.value
            },0)
            return funnel;
          }
        },
        pie: {
          callback: () => {
            pie.series[0]["data"] = this.datas;
            return pie;
          }
        },
        bar: {
          callback: () => {
            for (let [index, item] of this.datas.data.entries()) {
              bar.series[index]["data"] = item;
            }
            bar.xAxis[0].data = this.datas.x;
            return bar;
          }
        },
        line: {
          callback: () => {
            for (let [index, item] of this.datas.data.entries()) {
              line.series[index]["data"] = item;
            }
            line.xAxis.data=this.datas.x;
            return line;
          }
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.echart = echarts.init(this.$refs.echart);
      this.echart.setOption(this.typeList[this.type].callback());
    }
  },
  watch: {
    datas(val) {
      this.echart.setOption(this.typeList[this.type].callback());
    }
  }
};
</script>

<style lang="scss" scoped>
#echart {
  width: 100%;
  height: 100%;
  .echart_container {
    height: 100%;
    #_echart {
      height: 100%;
    }
  }
}
</style>
