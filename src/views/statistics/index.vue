<template>
  <div id="education_statistics">
    <div class="statistics_container">
      <chart-unit v-model="funnelDateAndCourse" :options="courseList">
        <funnel-chart :funnelData="funnelData"></funnel-chart>
      </chart-unit>

      <chart-unit v-model="pieDateAndCourse" :options="courseList">
        <pie-chart :pieData="pieData"></pie-chart>
      </chart-unit>

      <chart-unit :isShowCourse="false" v-model="barDateAndCourse" :options="courseList">
        <bar-chart :barData="barData"></bar-chart>
      </chart-unit>

      <chart-unit v-model="lineDateAndCourse" :options="courseList">
        <line-chart :lineData="lineData"></line-chart>
      </chart-unit>
    </div>
  </div>
</template>

<script>
import ChartUnit from "./components/ChartUnit";
import Echart from "./components/EcChart";
import FunnelChart from "./components/FunnelChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import { funnel, pie, bar, line } from "./components/echart";
import { mapActions, mapState, mapGetters } from "vuex";
import { timeFormate } from "@/utils";
export default {
  data() {
    return {
      funnelData: [],
      pieData: [],
      barData: {
        data: [[123, 456, 289], [254, 367, 199]],
        x: ["语文", "数学", "英语"]
      },
      lineData: {
        data: [[100, 200, 156, 489]],
        x: ["07-01", "07-03", "07-09", "07-15"]
      },
      funnelDateAndCourse: {},
      pieDateAndCourse: {
        date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()],
        course: ""
      },
      barDateAndCourse: {
        date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()],
        course: ""
      },
      lineDateAndCourse: {
        date: [new Date(new Date().getTime() - 24 * 3600 * 1000), new Date()],
        course: ""
      },
      dateType: [
        "funnelDateAndCourse",
        "pieDateAndCourse",
        "barDateAndCourse",
        "lineDateAndCourse"
      ]
    };
  },
  computed: {
    ...mapState("statistic", ["courseList", "funnel", "pie", "bar", "line"])
  },
  created() {
    this.initCourseList().then(() => {
      this.initDate();
    });
  },
  mounted() {},
  methods: {
    ...mapActions("statistic", [
      "queryCourse",
      "generatePlot",
      "generatePie",
      "generateGraph",
      "generateChart"
    ]),
    //初始化各图表时间数据
    initDate() {
      for (let date of this.dateType) {
        this.$data[date] = {
          date: [
            timeFormate(new Date(new Date().getTime() - 24 * 3600 * 1000)),
            timeFormate(new Date())
          ],
          course: this.courseList[0].id || ""
        };
      }
    },
    //初始化课程列表
    initCourseList() {
      return new Promise(resolve => {
        this.queryCourse().then(res => {
          resolve();
        });
      });
    },
    //初始化漏斗数据
    initFunnel() {
      this.funnelData = [];
      this.generatePlot({
        courseId: this.funnelDateAndCourse.course,
        beginDate: this.funnelDateAndCourse.date[0],
        endDate: this.funnelDateAndCourse.date[1]
      }).then(res => {
        let types = {
          browseTotal: "浏览量",
          createOrderTotal: "生成订单",
          favoriteTotal: "收藏",
          payOrderTotal: "已支付订单"
        };
        for (let key of Object.keys(this.funnel)) {
          this.funnelData.push({
            value: this.funnel[key],
            name: types[key]
          });
        }
      });
    },
    //初始化饼图
    initPie() {
      this.pieData = [];
      this.generatePie({
        courseId: this.pieDateAndCourse.course,
        beginDate: this.pieDateAndCourse.date[0],
        endDate: this.pieDateAndCourse.date[1]
      }).then(res => {
        let types = {
          newUser: "新用户",
          oldUser: "续报"
        };
        for (let key of Object.keys(this.pie)) {
          this.pieData.push({
            value: this.pie[key],
            name: types[key]
          });
        }
      });
    },
    //初始化柱状图
    initBar() {
      this.generateGraph({
        beginDate: this.barDateAndCourse.date[0],
        endDate: this.barDateAndCourse.date[1]
      }).then(res => {
        if (this.bar.length > 0) {
          let new1 = [];
          let renew = [];
          this.barData = this.bar.reduce(
            (acc, cur) => {
              acc["x"].push(cur.name);
              new1.push(cur.newUser);
              renew.push(cur.oldUser);
              return acc;
            },
            { x: [], data: [] }
          );
          this.$set(this.barData["data"], 0, new1);
          this.$set(this.barData["data"], 1, renew);
        }
      });
    },
    //初始化折线图
    initLine() {
      this.generateChart({
        courseId: this.lineDateAndCourse.course,
        beginDate: this.lineDateAndCourse.date[0],
        endDate: this.lineDateAndCourse.date[1]
      }).then(res => {
        if (this.line.length > 0) {
          let total = [];
          let receive = [];
          let refund = [];
          this.lineData = this.line.reduce(
            (acc, cur) => {
              acc["x"].push(cur.date);
              total.push(cur.total);
              receive.push(cur.receivables);
              refund.push(cur.totalRefund);
              return acc;
            },
            { x: [], data: [] }
          );
          this.$set(this.lineData["data"], 0, total);
          this.$set(this.lineData["data"], 1, receive);
          this.$set(this.lineData["data"], 2, refund);
        }
      });
    }
  },
  components: {
    ChartUnit,
    Echart,
    FunnelChart,
    PieChart,
    BarChart,
    LineChart
  },
  watch: {
    funnelDateAndCourse() {
      this.initFunnel();
    },
    pieDateAndCourse() {
      this.initPie();
    },
    barDateAndCourse() {
      this.initBar();
    },
    lineDateAndCourse() {
      this.initLine();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_statistics {
  @include layout;
}

.statistics_container {
  padding: 15px;
  @include display(space-around) {
    flex-wrap: wrap;
  }
  .chart_main {
    width: 100%;
    height: 100%;
  }
}
</style>
