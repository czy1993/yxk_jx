<template>
  <div id="order_header">
    <div class="order_header_container">
      <div class="_top_left">
        <div class="_top_input">
          <ec-input @search="search" v-model="orderName" placeholder="教师 / 用户手机号 / 课程名"/>
        </div>
      </div>
      <div class="btns_group">
        <div>
          <ec-button v-if="!isEdit_order" @click.native="edit">编辑</ec-button>
          <ec-button v-else @click.native="cancel">取消</ec-button>
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
import { mapState, mapMutations, mapGetters } from "vuex";
import { export_json_to_excel } from "@/utils/Export2Excel";

export default {
  data() {
    return {
      orderName: "",
      status: {
        "1": "已开课",
        "2": "已学完",
        "3": "已转移",
        "4": "已结束",
        "5": "已退费"
      },
      orderStatus: {
        "1": "待支付",
        "2": "已支付",
        "3": "取消",
        "4": "支付失败"
      },
      origin: {
        "1": "H5",
        "2": "IOS",
        "3": "安卓"
      },
      keys: ["origin", "orderStatus", "status"]
    };
  },
  computed: {
    ...mapState("order", ["isEdit_order"]),
    ...mapGetters("order", ["orderDatas"])
  },
  components: {
    EcInput,
    EcButton
  },
  methods: {
    ...mapMutations("order", ["SET_EDIT_STATUS"]),
    search() {
      this.$emit("search", this.orderName);
    },
    edit() {
      this.SET_EDIT_STATUS(true);
    },
    cancel() {
      this.SET_EDIT_STATUS(false);
    },
    handleExportExcel() {
      const tHeader = [
        "订单编号",
        "生成时间",
        "订单来源",
        "课程名称",
        "授课教师",
        "教师手机号",
        "学生姓名",
        "用户手机号",
        "订单状态",
        "支付金额",
        "课程状态",
        "支付时间",
        "课时状态"
      ];
      const filterVal = [
        "orderNo",
        "createTime",
        "origin",
        "courseName",
        "courseTeahcer",
        "teacherPhone",
        "studentName",
        "memberPhone",
        "orderStatus",
        "payPrice",
        "status",
        "payTime",
        "courseSchedule"
      ];
      const data = this.formatJson(filterVal, this.orderDatas);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "订单管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (this.keys.includes(item2)) {
           return this.$data[item2][item[item2]];
          } else {
            return item[item2];
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#order_header {
  .order_header_container {
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
