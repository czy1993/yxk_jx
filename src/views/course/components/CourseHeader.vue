<template>
  <div id="course_header">
    <div class="_top">
      <div class="_top_left">
        <div class="_top_input">
          <ec-input @search="search(courseType)" v-model="courseName" :placeholder="placeholder"/>
        </div>

        <div class="_top_select" v-show="isEdite">
          <span>筛选课程</span>
          <el-select v-model="courseType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="btns_group">
        <div>
          <ec-button @click.native="$router.push('/addCourse?status=1');SET_AGAIN_EDIT(false)">新增课程+</ec-button>
        </div>
        <div>
          <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EcInput from "@/components/EducationInput";
import EcButton from "@/components/EducationButton";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      courseName: "",
      courseType: "",
      placeholder: "课程名搜索",
      options: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "1",
          label: "未上架"
        },
        {
          value: "2",
          label: "报名中"
        },
        { value: "3", label: "已开课" },
        {
          value: "4",
          label: "已学完"
        }
      ],
      courseStatus: {
        "1": "未上架",
        "2": "报名中",
        "3": "已开课",
        "4": "已学完"
      }
    };
  },
  computed: {
    ...mapState("course", ["isEdite", "courseList"])
  },
  methods: {
    ...mapMutations("course", ["SET_AGAIN_EDIT"]),
    search(type) {
      this.$emit("search", this.courseName, type);
    },
    handleExportExcel() {
      const tHeader = [
        "课程名称",
        "课时",
        "课程状态",
        "当前课时",
        "学习中学生数量",
        "报名总数",
        "授课教师",
        "价格",
        "活动",
        "上传时间",
        "最近更新时间"
      ];
      const filterVal = [
        "name",
        "courseNum",
        "status",
        "currentNum",
        "studyNum",
        "signUpNum",
        "teacherNames",
        "price",
        "hasActivity",
        "createTime",
        "lcd"
      ];
      const data = this.formatJson(filterVal, this.courseList);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "课程管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "status") {
            return this.courseStatus[item[item2]];
          } else {
            return item[item2];
          }
        });
      });
    }
  },
  components: {
    EcInput,
    EcButton
  },
  watch: {
    courseType(val) {
      this.search(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#course_header {
  ._top {
    padding: 0 44px 0;
    // margin-bottom: 20px;
    @include display(space-between) {
      flex-wrap: wrap;
    }
    transition: all 1s;
    .btns_group {
      @include display;
      padding-bottom: 10px;
      & > div {
        margin-right: 25px;
      }
    }
    ._top_left {
      @include display;
      padding-bottom: 10px;
      // width: 50%;
      // ._top_input{
      //   width: 50%;
      // }
      ._top_select {
        // width: 55%;
        margin-left: 70px;
        @include display;
        .el-select {
          max-width: 150px;
        }
        span {
          display: inline-block;
          // margin-right: 20px;
          font-size: $font-size - 2px;
          width: 70px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
