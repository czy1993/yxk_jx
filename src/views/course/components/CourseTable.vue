<template>
  <div>
    <div class="course_table">
      <EcTable :height="height" :tableData="tableData">
        <el-table-column label="序号" width="70">
          <template slot-scope="scope">
            <div class="_check">
              <ec-check-box
                v-if="isEdite"
                v-model="checked"
                :label="scope.row.id"
                :key="scope.row.id"
              ></ec-check-box>
              <span>{{courseList.indexOf(scope.row)+1 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="课程名称">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="courseNum" label="课时" width="60">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.courseNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="课程状态" width="90">
          <template slot-scope="scope">
            <span
              class="common_base"
              :class="`status_${scope.row.status}`"
            >{{courseStatus[scope.row.status]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="currentNum" label="当前课时">
          <template slot-scope="scope">
            <span class="current_class">{{scope.row.currentNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="studyNum" label="学习中学生数量">
          <template slot-scope="scope">
            <div class="_content">
              <span class="current_class">{{scope.row.studyNum}}</span>
              <el-popover
                placement="top-start"
                title="提示"
                width="200"
                trigger="hover"
                content="点击此处，展示学员信息"
              >
                <i @click="toStudentMessage(scope.row.id)" slot="reference" class="el-icon-info"></i>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="signUpNum" label="报名总数">
          <template slot-scope="scope">
            <span class="current_class">{{scope.row.signUpNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacherNames" label="授课教师">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.teacherNames}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <span class="_money">{{scope.row.price.toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hasActivity" label="活动" width="60">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.hasActivity}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="上传时间">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="lcd" label="最近更新时间">
          <template slot-scope="scope">
            <span class="_ass_color">{{scope.row.lcd}}</span>
          </template>
        </el-table-column>

        <el-table-column label="详情" width="60">
          <template slot-scope="scope">
            <span @click="revise(scope.row.id)" class="look_over">查看</span>
          </template>
        </el-table-column>
      </EcTable>
    </div>
  </div>
</template>

<script>
import EcTable from "@/components/EducationTable";
import EcCheckBox from "@/components/EducationCheckBox";
import { mapState, mapMutations } from "vuex";
import bus from "@/utils/bus";
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
      courseStatus: {
        "1": "未上架",
        "2": "报名中",
        "3": "已开课",
        "4": "已学完"
      },
      checked: []
    };
  },
  mounted() {
    bus.$on("all", val => {
      if (val) {
        this.allchecked();
      } else {
        this.cancelAll();
      }
    });
  },
  computed: {
    ...mapState("course", ["isEdite", "courseList", "checkedList"])
  },
  methods: {
    ...mapMutations("course", ["SAVE_COURSE_ID"]),
    toStudentMessage(id) {
      this.$router.push({ path: "/student-message", query: { id } });
    },
    //全选
    allchecked() {
      let length = this.courseList.length;
      let arr = new Set();
      for (let item of this.courseList) {
        arr.add(item.id);
      }
      this.checked = [...arr];
    },
    //取消全选
    cancelAll() {
      this.checked = [];
    },
    //修改
    revise(id) {
      this.$router.push({
        path: "/course-detail",
        query: { courseId: id }
      });
    }
  },
  components: {
    EcTable,
    EcCheckBox
  },
  watch: {
    checked(val) {
      this.SAVE_COURSE_ID(val);
    }
  },
  beforeDestroy() {
    bus.$off("all");
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.scss";
.course_table {
  ._check {
    @include display(center);
  }
  .current_class {
    display: block;
    @include themify() {
      color: themed("title-active");
    }
  }
  ._content {
    margin: auto;
    @include display();
    .current_class {
      width: 57%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .el-icon-info {
      display: block;
      font-size: 20px;
      color: #969696;
      cursor: pointer;
    }
  }

  .common_base {
    display: inline-block;
    padding: 5px 12px;
    border-radius: 4px;
    color: $font-color;
  }

  ._ass_color {
    color: $font-color-ass;
  }

  @each $status, $bgcolor in (1: #dddddd, 2: #c2e6f4, 3: #efe0c9, 4: #d0dff6) {
    .status_#{$status} {
      background-color: $bgcolor;
    }
  }

  ._money {
    @include themify() {
      color: themed("money-color");
    }
  }
  .look_over {
    @include colorFont;
  }
}
</style>
