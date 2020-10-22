<template>
  <div id="student_header">
    <div class="header_container">
      <div class="_top_1">
        <div class="_top_left">
          <div class="_top_input">
            <ec-input
              @search="search(studentName)"
              v-model="studentName"
              placeholder="请输入手机号 / 姓名"
            />
          </div>
        </div>
        <div class="btns_group">
          <div>
            <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EcInput from "@/components/EducationInput";
import EcButton from "@/components/EducationButton";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { mapState } from "vuex";
export default {
  data() {
    return {
      studentName: "",
      sex: {
        "1": "男",
        "2": "女"
      }
    };
  },
  computed: {
    ...mapState("student", ["studentList"])
  },
  methods: {
    search() {
      this.$emit("search", this.studentName);
    },
    handleExportExcel() {
      const tHeader = [
        "姓名",
        "性别",
        "手机号",
        "最近报名时间",
        "上次结课时间"
      ];
      const filterVal = ["name", "sex", "phone", "signUpTime", "courseDay"];

      const data = this.formatJson(filterVal, this.studentList);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "学员管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "sex") {
            return this.sex[item[item2]];
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
  }
};
</script>

<style lang="scss" >
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#student_header {
  .header_container {
    padding: 0 44px 0;
    transition: all 1s;
    padding-bottom: 10px;
    ._top_1 {
      @include display(space-between) {
        flex-wrap: wrap;
      }
      ._top_left {
        @include display;
        padding-bottom: 10px;
        .search_time {
          @include display() {
            flex-wrap: wrap;
          }
          font-size: $font-size - 2px;
        }
      }
    }
    .search_time {
      @include display() {
        flex-wrap: wrap;
      }
      font-size: $font-size - 2px;
      .el-range-separator {
        width: 30px;
        font-size: $font-size - 2px;
      }
      .data_time {
        margin-right: 20px;
      }
    }
  }
}
</style>
