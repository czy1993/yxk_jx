<template>
  <div id="education_teacher_table">
    <div class="teacher_table_container">
      <ec-table :height="height" :tableData="tableData">
        <el-table-column prop="id" label="序号" width="60">
          <template slot-scope="scope">
            <span>{{tableData.indexOf(scope.row)+1  }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="phone" label="手机号" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="photo" label="照片" width="80">
          <template slot-scope="scope">
            <img class="avatar" :src="imgServer+scope.row.photo.split(',')[0]" alt>
          </template>
        </el-table-column>

        <el-table-column prop="sex" label="姓别" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.sex=='1'?'男':"女"}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="certificateNo" label="教师证编号">
          <template slot-scope="scope">
            <span>{{scope.row.certificateNo}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="honor" label="荣誉">
          <template slot-scope="scope">
            <span>{{scope.row.honor}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="subjectDict" label="科目">
          <template slot-scope="scope">
            <span>{{transformLib(scope.row.subjectDict,subjectList)}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="teachAreasDict" label="教学范围">
          <template slot-scope="scope">
            <span class="teachAreas">{{transformLib(scope.row.teachAreasDict,teachAreas)}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="levelDict" label="层级" >
          <template slot-scope="scope">
            <span>{{nameFromLevel(scope.row.levelDict)}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="avgLevel" label="相关评价" width="170">
          <template slot-scope="scope">
            <div class="rate">
              <el-rate
                :max="5"
                v-model="scope.row.avgLevel"
                disabled
                text-color="#ff9900"
                :show-score="false"
              ></el-rate>
              <span @click="toEvaluation(scope.row)" class="look_over">查看</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="介绍" width="60">
          <template slot-scope="scope">
            <span @click="toIntroduction(scope.row)" class="look_over">查看</span>
          </template>
        </el-table-column>

        <el-table-column label="考勤" width="60">
          <template slot-scope="scope">
            <span @click="toAddendance(scope.row)" class="look_over">查看</span>
          </template>
        </el-table-column>

        <el-table-column label="编辑" width="80">
          <template slot-scope="scope">
            <ul class="edit">
              <li @click="toAddteacher(scope.row)"></li>
              <li @click="toFather(scope.row.id)"></li>
            </ul>
          </template>
        </el-table-column>
      </ec-table>
    </div>
  </div>
</template>

<script>
import EcTable from "@/components/EducationTable";
import { deleteTeacher } from "@/api/teacher.js";
import { mapState, mapActions } from "vuex";
import { transformLib } from "@/utils";
import { getAccountInfo } from "@/utils/auth";
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
    },
    imgServer:String
  },
  created() {
    this.initLevel();
  },
  mounted() {
    // console.log(this.teachAreas, this.subjectList);
  },
  computed: {
    ...mapState("course", ["subjectList", "teachAreas"]),
    ...mapState('teacher',['agencyLevel'])
  },
  methods: {
    ...mapActions("teacher", ["searchLevel"]),
    initLevel() {
      this.searchLevel("/" + getAccountInfo().agencyId);
    },
    nameFromLevel(level) {
      // console.log(level)
      return this.agencyLevel.find(item => {
        return item.levelDict === level;
      }).levelName
      // console.log(this.agencyLevel.find(item => {
      //   return item.levelDict === level;
      // }))
    },
    toAddendance(obj) {
      this.$router.push({
        name: "attendance",
        query: { name: obj.name, id: obj.id }
      });
    },
    toIntroduction(obj) {
      this.$router.push({
        name: "teacherIntroduction",
        query: { name: obj.name, id: obj.id }
      });
    },
    toEvaluation(obj) {
      this.$router.push({
        name: "teacherEvaluation",
        query: { name: obj.name, rate: obj.evaluation, id: obj.id }
      });
    },
    toAddteacher(obj) {
      this.$router.push({
        name: "addTeacher",
        query: { name: obj.name, id: obj.id }
      });
    },
    toFather(id) {
      this.$emit("event1", id);
    },
    transformLib(ids, arr) {
      return transformLib(ids, arr);
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
.teacher_table_container {
  .look_over {
    @include colorFont;
  }
  .avatar {
    width: 40px;
  }
  .edit {
    @include display($hor: center);
    li {
      width: 30px;
      height: 30px;
      cursor: pointer;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 0 5px;
      transition: all 0.2s;
      &:nth-child(1) {
        background-image: url(../../../../static/img/system/button_bianji1.png);
        &:hover {
          background-image: url(../../../../static/img/system/button_bianji2.png);
        }
      }
      &:nth-child(2) {
        background-image: url(../../../../static/img/system/button_shanchu1.png);
        &:hover {
          background-image: url(../../../../static/img/system/button_shanchu2.png);
        }
      }
    }
  }
  .rate {
    @include display();
  }
  .teachAreas {
    word-break: break-all;
  }
}
</style>
