<template>
  <div id="coupon" class="education_views">
    <div class="education_header">
      <ec-button class="header-buts" @click.native="changes()">优惠券设定</ec-button>
      <ec-button @click.native="handleExportExcel">导出Excel</ec-button>
    </div>
    <div class="education_centont">
      <div v-if="show1=='1'" class="coupon_contont">
        <EcTable :tableData="couponData">
          <el-table-column prop="id" label="序号" width="60">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userCouponNum" label="券号">
            <template slot-scope="scope">
              <span>{{scope.row.userCouponNum}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.status==2" class="common_base">已使用</span>
              <span v-else class="common_base base_1">未使用</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="种类" width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.type==2">满减</span>
              <span v-else>折扣</span>
            </template>
          </el-table-column>
          <el-table-column prop="getTime" label="获取时间">
            <template slot-scope="scope">
              <span>{{scope.row.getTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="useTime" label="使用时间">
            <template slot-scope="scope">
              <span>{{scope.row.useTime?scope.row.useTime:'/'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="expirationTime" label="过期时间">
            <template slot-scope="scope">
              <span>{{scope.row.expirationTime?scope.row.expirationTime:'/'}}</span>
            </template>
          </el-table-column>
        </EcTable>
      </div>
      <ec-dialog  v-model="showSet">
        <Setcoupon :isReset="showSet" @event1="onChild($event)"></Setcoupon>
      </ec-dialog>
    </div>
    <EcPagination
      v-if="show1=='1'"
      :total="total"
      :currentPage="current"
      @size-change="handleSizeChange($event)"
      @current-change="handleCurrentChange($event)"
    ></EcPagination>
  </div>
</template>
<script>
import EcButton from "@/components/EducationButton";
import EcTable from "@/components/EducationTable";
import EcPagination from "@/components/EducationPagination";
import { queryUserCoupon } from "@/api/marketing.js";
import { export_json_to_excel } from "@/utils/Export2Excel";
import Setcoupon from "./coupon-set";
import EcDialog from "@/components/EducationDialog";
export default {
  data() {
    return {
      couponData: [
        {
          id: 2,
          userCouponNum: "220177591190",
          phone: "18673452291",
          status: "2",
          type: "2",
          getTime: "2020-03-16 00:32:15",
          useTime: "2020-03-16 17:15:18",
          expirationTime: null
        }
      ],
      size: 10,
      current: 1,
      show1: "1",
      total: 0,
      status: {
        "1": "未使用",
        "2": "已使用"
      },
      types: {
        "1": "满减",
        "2": "折扣"
      },
      showSet:false
    };
  },
  components: {
    EcButton,
    EcTable,
    EcPagination,
    Setcoupon,
    EcDialog
  },
  created() {
    this.save_queryUserCoupon(this.size, this.current);
  },
  methods: {
    save_queryUserCoupon(size, current) {
      queryUserCoupon(`?size=${size}&current=${current}`).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.couponData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    changes() {
      this.showSet = true;
    },
    onChild(e) {
      this.showSet = e;
      this.save_queryUserCoupon(this.size, this.current);
    },
    handleSizeChange(e) {
      this.size = e;
      this.save_queryUserCoupon(this.size, this.current);
    },
    handleCurrentChange(e) {
      this.current = e;
      this.save_queryUserCoupon(this.size, this.current);
    },
    handleExportExcel() {
      const tHeader = [
        "券号",
        "手机号",
        "状态",
        "种类",
        "获取时间",
        "使用时间",
        "过期时间"
      ];
      const filterVal = [
        "userCouponNum",
        "phone",
        "status",
        "type",
        "getTime",
        "useTime",
        "expirationTime"
      ];

      const data = this.formatJson(filterVal, this.couponData);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: "优惠券管理"
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(item => {
        return filterVal.map(item2 => {
          if (item2 === "status") {
            return this.status[item[item2]];
          } else if (item2 === "type") {
            return this.types[item[item2]];
          } else {
            return item[item2] || "/";
          }
        });
      });
    }
  }
};
</script>
<style lang="scss">
#coupon {
  position: relative;
  .el-tag.el-tag--info {
    display: inline-block;
    word-break: break-all;
    max-width: 200px;
    white-space: pre-wrap;
    height: auto;
    // display: inline-block;
    // width: 200px;
    // overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
#coupon {
  .coupon_contont {
    width: 90% !important;
    min-width: 880px;
    // height: 100%;
    overflow: auto;
    margin: 0 auto;
    border: 1px solid #e8eae9;
  }
  .common_base {
    display: inline-block;
    font-weight: 700;
    height: 26px;
    width: 60px;
    text-align: center;
    line-height: 26px;
    background: #ede1cb;
    border-radius: 2px;
    color: #606060;
  }
  .base_1 {
    background: #c4e6f2;
  }
}
</style>