<template>
  <div id="teacher_header">
    <div class="header_container">
      <div class="_top_left">
        <div class="_top_input">
          <ec-input v-model="teacherName" @change="change()" placeholder="教师名搜索"/>
        </div>
      </div>
      <div class="btns_group">
        <div>
          <ec-button @click.native="$router.push('/add-teacher')">新增教师+</ec-button>
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
import { transformLib } from "@/utils";
import { export_json_to_excel } from "@/utils/Export2Excel";
import { mapState, mapActions } from "vuex";
export default {
  props:['tableData'],
  data() {
    return {
      teacherName: "",
      sex: {
        "1": "男",
        "2": "女"
      }
    };
  },
  components: {
    EcInput,
    EcButton
  },
  computed: {
    ...mapState("course", ["subjectList", "teachAreas"])
  },
  methods: {
    change() {
      // console.log(this.teacherName,'是');
      this.$emit("event1", this.teacherName);
    },
    stragy() {
      let types = {
        sex(val) {       
          return this.sex[val];
        },
        subjectDict(ids) {
          return transformLib(ids, this.subjectList);
        },
        teachAreasDict(ids) {
          return transformLib(ids, this.teachAreas);
        },
        avgLevel(val) {
          return val + "星";
        }
      };

      return (type, ...args)=> {
       return types[type] && types[type].apply(this, args);
      };
    },
    handleExportExcel() {
      const tHeader = [
        "姓名",
        "手机号",
        "性别",
        "教师证编号",
        "荣誉",
        "科目",
        "教学范围",
        "层级",
        "相关评价"
      ];
      const filterVal = [
        "name",
        "phone",
        "sex",
        "certificateNo",
        "honor",
        "subjectDict",
        "teachAreasDict",
        "levelDict",
        "avgLevel"
      ];

      const data = this.formatJson(filterVal, this.tableData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "教师管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
         return this.stragy()(item2, item[item2]) || item[item2];
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#teacher_header {
  .header_container {
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
