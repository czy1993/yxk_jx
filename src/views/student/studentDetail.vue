<template>
  <div id="education_course_detail">
    <div ref="container" class="course_detail_container">
      <header ref="header">
        <div>
          学员：
          <span class="_name">{{$route.query.name}}</span>
        </div>
        <div class="export">
          <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
        </div>
      </header>
      <div class="_table">
        <ec-table :height="height" :tableData="courseStatusList">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <span>{{courseStatusList.indexOf(scope.row)+1}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="courseName" label="课程名称">
            <template slot-scope="scope">
              <span>{{scope.row.courseName}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="courseStatus" label="课程状态">
            <template slot-scope="scope">
              <span
                class="common_class"
                :class="`status_${scope.row.courseStatus}`"
              >{{courseStatus[scope.row.courseStatus]}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="teacherName" label="授课教师">
            <template slot-scope="scope">
              <span>{{scope.row.teacherName}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="courseNum" label="课时状态">
            <template slot-scope="scope">
              <span :style="colorStyle(scope.row.courseStatus)">{{`${scope.row.currentNum}/${scope.row.courseNum}`}}</span>
            </template>
          </el-table-column>

          <el-table-column label="考勤">
            <template slot-scope="scope">
              <el-popover
                v-model="scope.row.show"
                popper-class="detail_pop"
                placement="bottom"
                width="600"
                trigger="click"
              >
                <detail
                  :courseId="scope.row.courseId"
                  :studentId="scope.row.studentId"
                  v-if="scope.row.show"
                ></detail>
                <span slot="reference" class="detail">详情</span>
              </el-popover>
            </template>
          </el-table-column>
        </ec-table>
      </div>
      <footer v-show="false" ref="footer">
        <ec-pagination :total="40" :currentPage="currentPage"></ec-pagination>
      </footer>
    </div>
  </div>
</template>

<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import Detail from "./components/Detail";
import EcPagination from "@/components/EducationPagination";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      visible: false,
      height: "100px",
      courseStatus: {
        "1": "未上架",
        "2": "报名中",
        "3": "已开课",
        "4": "已学完"
      },
      currentPage: 1,
      courseStatusList: []
    };
  },
  computed: {
    ...mapState("student", ["courseDetailList"]),
    colorStyle(type) {
      return type => {
        if (type === "3") {
          return {
            color: "red"
          };
        } else if (type === "4") {
          return {
            color: "green"
          };
        }
      };
    }
  },
  mounted() {
    this.init();
    this.query();

    window.addEventListener("resize", this.init);
  },
  methods: {
    ...mapActions("student", ["queryStudentCourse"]),
    init() {
      this.$nextTick(() => {
        let sumHeight = this.$refs.container.getBoundingClientRect().height;
        let topHeight = this.$refs.header.getBoundingClientRect().height;
        let footerHeight = this.$refs.footer.getBoundingClientRect().height;
        this.height = sumHeight - topHeight - footerHeight + "px";
      });
    },
    initCourseStatus() {
      this.courseStatusList = this.courseDetailList.reduce((acc, cur) => {
        acc.push({ ...cur, show: false });
        return acc;
      }, []);
    },
    query() {
      this.queryStudentCourse(`studentId=${this.$route.query.studentId}`).then(
        () => {
          this.initCourseStatus();
        }
      );
    },
    handleExportExcel() {
      const tHeader = ["课程名称", "课程状态", "授课教师", "课时状态"];
      const filterVal = [
        "courseName",
        "courseStatus",
        "teacherName",
        "courseNum"
      ];

      const data = this.formatJson(filterVal, this.courseStatusList);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "学员详情"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "courseStatus") {
            return this.courseStatus[item[item2]];
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
    Detail,
    EcPagination
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.init);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#education_course_detail {
  @include layout;
}
.course_detail_container {
  //   padding: 0 44px 0;
  //   transition: all 1s;
  //   padding-bottom: 10px;
  height: 100%;
  header {
    padding: 0 44px 10px;
    @include display(space-between);
    ._name {
      color: rgb(117, 117, 117);
    }
    .export {
      margin-right: 20px;
    }
  }
  ._table {
    .detail {
      @include themify() {
        color: themed("detail-color");
      }
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    @each $status, $bgcolor in (1: #dddddd, 2: #c2e6f4, 3: #efe0c9, 4: #d0dff6)
    {
      .status_#{$status} {
        background-color: $bgcolor;
      }
    }
    .common_class {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 4px;
      color: $font-color;
    }
  }
  footer {
    padding-top: 10px;
  }
}
</style>
