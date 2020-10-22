<template>
  <div id="teacher_attendance">
    <div class="attendance_container" ref="container">
      <!-- <EcRouterBack  routerName='teacher'  /> -->
      <header ref="header">
        <div class="_title">
          教师姓名：
          <span>{{$route.query.name}}</span>
        </div>
        <div>
          <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
        </div>
      </header>
      <div class="attendance_table">
        <ec-table :height="height" :tableData="tableData">
          <el-table-column prop="number" label="序号" width="50">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="课程名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="courseDate" label="上课时间">
            <template slot-scope="scope">
              <span>{{scope.row.courseDate}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="考勤状态">
            <template slot-scope="scope">
              <span :class="`status_${scope.row.status}`">{{status[scope.row.status]}}</span>
            </template>
          </el-table-column>
        </ec-table>
      </div>
    </div>
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import { searchAttendance } from "@/api/teacher.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue";
import { export_json_to_excel } from "@/utils/Export2Excel";
export default {
  data() {
    return {
      height: "100px",
      tableData: [
],
      status: {
        "1": "未开始",
        "2": "已出勤",
        "3": "缺勤",
        '4':'请假'
      }
    };
  },
  mounted() {
    this.init();
    window.addEventListener("resize", this.init);
    this.save_searchAttendance();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.getBoundingClientRect().height;
        // let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - 60 + "px";
      });
    },
    save_searchAttendance() {
      searchAttendance(`?courseTeacherId=${this.$route.query.id}`).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.tableData.forEach((element, index) => {
            element.number = index + 1;
          });
        }
      });
    },
    handleExportExcel() {
      const tHeader = ["课程名称", "上课时间", "考勤状态"];
      const filterVal = ["name", "courseDate", "status"];

      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "教师考勤"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "status") {
            return this.status[item[item2]];
          } else {
            return item[item2];
          }
        });
      });
    }
  },
  components: {
    EcButton,
    EcTable,
    EcRouterBack
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#teacher_attendance {
  height: 100%;
  background-color: $view-bgcolor;
}
.attendance_container {
  height: 100%;
  padding-top: 20px;
  margin-left: 100px;
  position: relative;
  header {
    @include display($hor: space-between);
    padding-right: 70px;
    ._title {
      font-weight: 500;
      span {
        color: $font-color-ass;
      }
    }
  }
  .attendance_table {
    width: 80%;
    padding-top: 20px;
    position: relative;
    @each $i, $color in (1: #ede1cb, 2: #c4e6f2, 3: #d0dff6) {
      .status_#{$i} {
        background: $color;
        color: $font-color;
        padding: 5px 15px;
        border-radius: 4px;
        display: inline-block;
      }
    }
  }
}
</style>
