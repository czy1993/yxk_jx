<template>
  <div id="education_student_table">
    <div class="student_table_container">
      <ec-table :height="height" :tableData="tableData" :defaultSort="{prop: 'signUpTime', order: 'descending'}">
        <el-table-column  label="序号">
          <template slot-scope="scope">
            <span>{{tableData.indexOf(scope.row)+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{sexType[scope.row.sex]}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="手机号" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column sortable prop="signUpTime" label="最近报名时间" >
          <template slot-scope="scope">
            <span>{{scope.row.signUpTime}}</span>
          </template>
        </el-table-column>

        <el-table-column sortable prop="courseDay" label="上次结课时间" >
          <template slot-scope="scope">
            <span>{{scope.row.courseDay}}</span>
          </template>
        </el-table-column>

        <el-table-column label="课程详情" width="130">
          <template slot-scope="scope">
            <span @click="toCourseDetail(scope.row)" class="look_over">查看</span>
          </template>
        </el-table-column>
      </ec-table>
    </div>
  </div>
</template>

<script>
import EcTable from "@/components/EducationTable";
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
      sexType:{
        '1':'男',
        '2':'女'
      }
    };
  },
  methods: {
    toCourseDetail(obj) {
      this.$router.push({ name: "studentDetail", query: { studentId: obj.studentId,name:obj.name } });
    }
  },
  components: {
    EcTable
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";

#education_student_table {
}

.student_table_container {
  .look_over {
    @include colorFont;
  }
}
</style>
