<template>
  <div id="order_table">
    <div class="table_container">
      <ec-table :height="height" :tableData="tableData">
        <el-table-column prop="number" label="序号" width="50">
          <template slot-scope="scope">
            <span>{{ tableData.indexOf(scope.row)+1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="orderNo" label="订单编号">
          <template slot-scope="scope">
            <span>{{scope.row.orderNo}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="生成时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="origin" label="订单来源" width="80">
          <template slot-scope="scope">
            <span>{{origin[scope.row.origin]}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="courseName" label="课程名称">
          <template slot-scope="scope">
            <span>{{scope.row.courseName}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="courseTeahcer" label="授课教师">
          <template slot-scope="scope">
            <span>{{scope.row.courseTeahcer}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="teacherPhone" label="教师手机号">
          <template slot-scope="scope">
            <span>{{scope.row.teacherPhone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="studentName" label="学生姓名">
          <template slot-scope="scope">
            <span>{{scope.row.studentName}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="memberPhone" label="用户手机号">
          <template slot-scope="scope">
            <span>{{scope.row.memberPhone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="orderStatus" label="状态">
          <template slot-scope="scope">
            <span
              class="common_class"
              :class="`status_${scope.row.status}`"
            >{{status[scope.row.status]}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="payPrice" label="支付金额">
          <template slot-scope="scope">
            <span class="_money">{{scope.row.payPrice.toFixed(2)}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="status" label="课程状态">
          <template slot-scope="scope">
            <span
              class="common_class"
              :class="`status_${scope.row.status}`"
            >{{status[scope.row.status]}}</span>
          </template>
        </el-table-column> -->

        <el-table-column prop="payTime" label="支付时间">
          <template slot-scope="scope">
            <span>{{scope.row.payTime}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="courseSchedule" label="课时状态">
          <template slot-scope="scope">
            <span :style="colorStyle(scope.row.status)">{{scope.row.courseSchedule}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作记录">
          <template slot-scope="scope">
            <div v-if="!isEdit_order">
              <el-popover
                v-model="scope.row.show"
                popper-class="detail_pop"
                placement="left"
                width="700"
                trigger="click"
              >
                <record-pop
                  v-if="scope.row.show"
                  :orderNo="scope.row.orderNo"
                  :status="scope.row.courseSchedule"
                ></record-pop>
                <span slot="reference" class="look_over">查看</span>
              </el-popover>
            </div>

            <div v-else>
              <el-popover v-if="scope.row.status==='1'||scope.row.status==='2'"  popper-class="detail_pop" placement="left" width="400" trigger="click">
                <transfer-pop :oldOrderNo="scope.row.orderNo"></transfer-pop>
                <span slot="reference" class="transfer">转移</span>
              </el-popover>

               <el-popover v-else   title="提示" placement="left" trigger="click"  width="200" :content="`您的订单${status[scope.row.status]},无法再转移`">
                <span style="cursor:pointer" slot="reference" >转移</span>
              </el-popover>

              <el-popover v-if="scope.row.status==='1'||scope.row.status==='2'" popper-class="detail_pop" placement="left" width="400" trigger="click">
                <refund-pop :orderNo="scope.row.orderNo" :residueMoney="scope.row.residueMoney" :remainCourse="remainCourse(scope.row.courseNO,scope.row.courseCurrentNO)"></refund-pop>
                <span slot="reference" class="refund">退款</span>
              </el-popover>

              <el-popover v-else   title="提示" placement="left" trigger="click"  width="200" :content="`您的订单${status[scope.row.status]},无法再退款`">
                <span style="cursor:pointer" slot="reference" >退款</span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </ec-table>
    </div>
  </div>
</template>

<script>
import EcTable from "@/components/EducationTable";
import TransferPop from "./TransferPop";
import RefundPop from "./RefundPop";
import RecordPop from "./RecordPop";
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    height: {
      type: String
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      status: {
        "1": "报名中",
        "2": "已开课",
        "3": "已转移",
        '4':'已学完',
        '5':'已退款'
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
      }
    };
  },
  computed: {
    ...mapState("order", ["isEdit_order"]),
    colorStyle(type) {
      return type => {
        if (type === "2") {
          return {
            color: "red"
          };
        } else if (type === "4") {
          return {
            color: "green"
          };
        }
      };
    },
    //计算剩余课时
    remainCourse(sum, cur) {
      return (sum, cur) => {
        return `${sum - cur}/${sum}`;
      };
    }
  },
  components: {
    EcTable,
    TransferPop,
    RefundPop,
    RecordPop
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.table_container {
  .look_over {
    @include themify() {
      color: themed("title-active");
      cursor: pointer;
    }
  }

  .transfer {
    cursor: pointer;
    margin: 0 5px;
    @include themify() {
      color: themed("nav-active");
    }
  }

  .refund {
    cursor: pointer;
    @include themify() {
      color: themed("refund-color");
    }
  }

  ._money {
    @include themify() {
      color: themed("money-color");
    }
  }

  .common_class {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 4px;
    color: $font-color;
  }

  @each $status, $bgcolor in (1: #ede1cb, 2: #d0dff6, 3: #c4e6f2,4:#dbfdfd,5:#d3d3d3f1) {
    .status_#{$status} {
      background-color: $bgcolor;
    }
  }
}
</style>
