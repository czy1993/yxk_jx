<template>
  <div id="record_pop">
    <div class="record_container">
      <ec-table :tableData="orderRecord">
        <el-table-column prop="recordType" label="操作行为">
          <template slot-scope="scope">
            <span>{{orderType[scope.row.recordType]}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="scope.row.recordType==='2'">新订单号{{scope.row.newOrderNo}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="recordUserId" label="操作人员">
          <template slot-scope="scope">
            <span>{{scope.row.recordUserId}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="agencyName" label="所属机构">
          <template slot-scope="scope">
            <span>{{scope.row.agencyName}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="recordTime" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.recordTime}}</span>
          </template>
        </el-table-column>
      </ec-table>
    </div>
  </div>
</template>

<script>
import EcTable from "@/components/EducationTable";
import { mapState, mapActions } from "vuex";
export default {
  props: ["orderNo", "status"],
  data() {
    return {
      orderType: {
        "1": "退款",
        "2": "转移订单"
      }
    };
  },
  computed: {
    ...mapState("order", ["orderRecord"])
  },
  created() {
    this.queryOrderOperation({
      orderNo: this.orderNo,
      status: this.status
    });
  },
  methods: {
    ...mapActions("order", ["queryOrderOperation"])
  },
  components: {
    EcTable
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
#record_pop {
  // padding: 30px;
}

.record_container {
}
</style>
